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
			/*
			if (zoomed) {
				// this.originalPosition = this.parent.position.clone();
				// this.originalQuaternion = this.parent.rotation.clone();
				// this.originalScale = this.parent.scale.clone();
			} else {
				this.object.position.copy(this.originalPosition);
				this.object.scale.copy(this.originalScale);
				this.object.quaternion.copy(this.originalQuaternion);
			}
			this.updateObjectMatrix();
			*/
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
		this.object = new THREE.Object3D();
		this.addEventListener();
	}

	disposeMaterial() {
		if (this.material) {
			if (this.material.map && this.material.map.disposable !== false) {
				this.material.map.dispose();
			}
			this.material.dispose();
			// this.material = null;
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
		// console.log('MediaZoomMesh.onToggle', !this.zoomed);
		// this.zoomed = !this.zoomed;
		this.emit('zoomed', !this.zoomed);
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
