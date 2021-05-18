import { environment } from '../../environment';
import { Geometry } from '../geometry/geometry';
import InteractiveMesh from '../interactive/interactive.mesh';

export default class MediaPlayMesh extends InteractiveMesh {

	static getLoader() {
		return MediaPlayMesh.loader || (MediaPlayMesh.loader = new THREE.TextureLoader());
	}

	static getTextureOff() {
		return MediaPlayMesh.textureOff || (MediaPlayMesh.textureOff = MediaPlayMesh.getLoader().load(environment.getPath('textures/ui/play-off.png')));
	}

	static getTextureOn() {
		return MediaPlayMesh.textureOn || (MediaPlayMesh.textureOn = MediaPlayMesh.getLoader().load(environment.getPath('textures/ui/play-on.png')));
	}

	static getMaterial() {
		const material = new THREE.MeshBasicMaterial({
			map: MediaPlayMesh.getTextureOff(),
			color: 0xffffff,
			opacity: 1,
			transparent: true,
		});
		return material;
	}

	playing_ = false;
	get playing() {
		return this.playing_;
	}
	set playing(playing) {
		if (this.playing_ !== playing) {
			this.playing_ = playing;
			const material = this.material;
			material.map = playing ? MediaPlayMesh.getTextureOn() : MediaPlayMesh.getTextureOff();
			this.onOut();
			// material.needsUpdate = true;
			// this.emit('playing', playing);
			// console.log('MediaPlayMesh.playing', playing);
		}
	}

	constructor(host) {
		const geometry = Geometry.planeGeometry;
		const material = MediaPlayMesh.getMaterial();
		super(geometry, material);
		this.material = material;
		this.host = host;
		// this.color = new THREE.Color(material.color.getHex());
		this.colorOff = new THREE.Color(material.color.getHex());
		this.colorOn = new THREE.Color('#888888'); // new THREE.Color('#0099ff');
		this.addEventListener();
	}

	update(parent) {
		const scale = this.scale;
		const parentRatio = parent.scale.x / parent.scale.y;
		const size = 0.3;
		scale.set(size / parentRatio, size, 1);
		// console.log('MediaPlayMesh.setParentScale', parent.scale, scale, position);
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
		// console.log('MediaPlayMesh.onOver');
		gsap.to(color, {
			r: target.r,
			g: target.g,
			b: target.b,
			duration: 0.2,
			ease: Power2.easeInOut,
		});
		gsap.to(material, {
			opacity: 1,
			duration: 0.2,
			ease: Power2.easeInOut,
		});
	}

	onOut() {
		const color = this.material.color;
		const target = this.colorOff;
		const material = this.material;
		// console.log('MediaPlayMesh.onOut');
		gsap.to(color, {
			r: target.r,
			g: target.g,
			b: target.b,
			duration: 0.2,
			ease: Power2.easeInOut,
		});
		gsap.to(material, {
			opacity: this.playing ? 0 : 1,
			duration: 0.2,
			ease: Power2.easeInOut,
		});
	}

	addEventListener() {
		this.onOver = this.onOver.bind(this);
		this.onOut = this.onOut.bind(this);
		this.on('over', this.onOver);
		this.on('out', this.onOut);
	}

	removeEventListener() {
		this.off('over', this.onOver);
		this.off('out', this.onOut);
	}
}
