import { environment } from '../../environment';
import { Geometry } from '../geometry/geometry';
import InteractiveMesh from '../interactive/interactive.mesh';

export default class MediaZoomMesh extends InteractiveMesh {

	static getLoader() {
		return MediaZoomMesh.loader || (MediaZoomMesh.loader = new THREE.TextureLoader());
	}

	static getTextureOff() {
		return MediaZoomMesh.textureOff || (MediaZoomMesh.textureOff = MediaZoomMesh.getLoader().load(environment.getPath('textures/ui/zoom-off.png')));
	}

	static getTextureOn() {
		return MediaZoomMesh.textureOn || (MediaZoomMesh.textureOn = MediaZoomMesh.getLoader().load(environment.getPath('textures/ui/zoom-on.png')));
	}

	static getMaterial() {
		const material = new THREE.MeshBasicMaterial({
			map: MediaZoomMesh.getTextureOff(),
			color: 0xffffff,
			opacity: 1,
			transparent: true,
		});
		return material;
	}

	/*
	visible_ = false;
	get visible() {
		return this.visible_;
	}
	set visible(visible) {
		if (this.visible_ !== visible) {
			this.visible_ = visible;
			const material = this.material;
			// console.log('MediaZoomMesh.onOver');
			gsap.to(material, {
				opacity: visible ? 1 : 0,
				duration: 0.2,
				ease: Power2.easeInOut,
			});
			// console.log('MediaZoomMesh.visible', visible);
		}
	}
	*/

	zoomed_ = false;
	get zoomed() {
		return this.zoomed_;
	}
	set zoomed(zoomed) {
		if (this.zoomed_ !== zoomed) {
			this.zoomed_ = zoomed;
			const material = this.material;
			material.map = zoomed ? MediaZoomMesh.getTextureOn() : MediaZoomMesh.getTextureOff();
			// material.needsUpdate = true;
			if (zoomed) {
				// this.originalPosition = this.parent.position.clone();
				// this.originalQuaternion = this.parent.rotation.clone();
				// this.originalScale = this.parent.scale.clone();
			} else {
				this.endObject.position.copy(this.originalPosition);
				this.endObject.scale.copy(this.originalScale);
				this.endObject.quaternion.copy(this.originalQuaternion);
			}
			this.updateObjectMatrix();
			this.emit('zoomed', zoomed);
			// console.log('MediaZoomMesh.zoomed', zoomed);
		}
	}

	constructor(host) {
		const geometry = Geometry.planeGeometry;
		const material = MediaZoomMesh.getMaterial();
		super(geometry, material);
		this.material = material;
		this.host = host;
		// this.color = new THREE.Color(material.color.getHex());
		this.colorOff = new THREE.Color(material.color.getHex());
		this.colorOn = new THREE.Color('#888888'); // new THREE.Color('#0099ff');
		this.endObject = new THREE.Object3D();
		this.addEventListener();
	}

	update(parent) {
		this.originalPosition = parent.position.clone();
		this.originalScale = parent.scale.clone();
		this.originalQuaternion = parent.quaternion.clone();
		this.endObject.position.copy(this.originalPosition);
		this.endObject.scale.copy(this.originalScale);
		this.endObject.quaternion.copy(this.originalQuaternion);
		const scale = this.scale;
		const position = this.position;
		const parentRatio = parent.scale.x / parent.scale.y;
		const size = 0.1;
		scale.set(size / parentRatio, size, 1);
		position.x = 0.5 - size / parentRatio / 2;
		position.y = 0.5 - size / 2;
		// console.log('MediaZoomMesh.setParentScale', parent.scale, scale, position);
	}

	render(time, tick) {
		const parent = this.parent;
		if (!parent) {
			return;
		}
		// const object = this.updateObjectMatrix();
		const object = this.endObject;
		/*
		parent.position.lerp(object.position, 0.2);
		parent.scale.lerp(object.scale, 0.2);
		parent.quaternion.slerp(object.quaternion, 0.2);
		*/
		parent.position.copy(object.position);
		parent.scale.copy(object.scale);
		parent.quaternion.copy(object.quaternion);
	}

	updateObjectMatrix() {
		const object = this.endObject;
		const host = this.host;
		if (this.zoomed) {
			const cameraGroup = host.cameraGroup;
			const originalScale = this.originalScale;
			let camera = host.camera, scale;
			const position = object.position;
			const aspect = originalScale.x / originalScale.y;
			const xr = host.renderer.xr;
			if (xr.isPresenting) {
				camera = xr.getCamera(camera);
				camera.getWorldDirection(position);
				scale = 0.3;
				object.scale.set(scale * originalScale.x, scale * originalScale.y, scale * originalScale.z);
				const distance = this.getDistanceToCamera(camera, object.scale);
				position.multiplyScalar(distance * 1);
				position.add(cameraGroup.position);
				position.y -= 0.2;
				object.position.copy(position);
				/*
				position.multiplyScalar(distance * 0.75);
				position.y -= 0.2;
				cameraGroup.worldToLocal(position);
				position.y += cameraGroup.position.y;
				object.position.copy(position);
				*/
				object.lookAt(cameraGroup.position);
			} else {
				camera.getWorldDirection(position);
				scale = 0.1;
				object.scale.set(scale * originalScale.x, scale * originalScale.y, scale * originalScale.z);
				const distance = this.getDistanceToCamera(camera, object.scale);
				position.multiplyScalar(distance);
				cameraGroup.localToWorld(position);
				object.position.copy(position);
				object.lookAt(cameraGroup.position);
			}
		}
		return object;
	}

	getDistanceToCamera(camera, size, fitOffset = 1) {
		const factor = (2 * Math.atan(Math.PI * camera.fov / 360));
		const heightDistance = size.y * camera.zoom / factor;
		const widthDistance = size.x * camera.zoom / factor / camera.aspect; // heightDistance / camera.aspect;
		const distance = fitOffset * Math.max(heightDistance, widthDistance);
		return distance;
	}

	disposeMaterial() {
		if (this.material) {
			if (this.material.map && this.material.map.disposable !== false) {
				this.material.map.dispose();
			}
			this.material.dispose();
			this.material = null;
		}
	}

	dispose() {
		this.removeEventListener();
		this.disposeMaterial();
	}

	onOver() {
		const color = this.material.color;
		const target = this.colorOn;
		const material = this.material;
		// console.log('MediaZoomMesh.onOver');
		gsap.to(color, {
			r: target.r,
			g: target.g,
			b: target.b,
			duration: 0.2,
			ease: Power2.easeInOut,
			/*
			onUpdate: () => {
				material.needsUpdate = true;
			},
			*/
		});
		// this.innerVisible = true;
	}

	onOut() {
		const color = this.material.color;
		const target = this.colorOff;
		const material = this.material;
		// console.log('MediaZoomMesh.onOut');
		gsap.to(color, {
			r: target.r,
			g: target.g,
			b: target.b,
			duration: 0.2,
			ease: Power2.easeInOut,
			/*
			onUpdate: () => {
				material.needsUpdate = true;
			},
			*/
		});
		// this.innerVisible = false;
	}

	onToggle() {
		this.zoomed = !this.zoomed;
	}

	addEventListener() {
		this.onOver = this.onOver.bind(this);
		this.onOut = this.onOut.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.on('over', this.onOver);
		this.on('out', this.onOut);
		this.on('down', this.onToggle);
	}

	removeEventListener() {
		this.off('over', this.onOver);
		this.off('out', this.onOut);
		this.off('down', this.onToggle);
	}
}
