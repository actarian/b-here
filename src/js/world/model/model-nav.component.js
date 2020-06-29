import * as THREE from 'three';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import { environment } from '../../environment';
import Interactive from '../interactive/interactive';
import InteractiveSprite from '../interactive/interactive.sprite';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const NAV_RADIUS = 100;
const ORIGIN = new THREE.Vector3();

export default class ModelNavComponent extends ModelComponent {

	static getLoader() {
		return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
	}

	static getTexture() {
		return ModelNavComponent.texture || (ModelNavComponent.texture = ModelNavComponent.getLoader().load(environment.getTexturePath('ui/wall-nav.png')));
	}

	onInit() {
		super.onInit();
		// console.log('ModelNavComponent.onInit');
	}

	onDestroy() {
		Interactive.dispose(this.mesh);
		super.onDestroy();
	}

	create(callback) {
		// const geometry = new THREE.PlaneBufferGeometry(2, 2, 2, 2);
		const map = ModelNavComponent.getTexture();
		map.disposable = false;
		map.encoding = THREE.sRGBEncoding;
		/*
		const material = new THREE.MeshBasicMaterial({
			// depthTest: false,
			map: map,
			transparent: true,
			opacity: 0,
		});
		*/
		const material = new THREE.SpriteMaterial({ map: map, sizeAttenuation: false, opacity: 0 });
		const sprite = new InteractiveSprite(material);
		sprite.scale.set(0.02, 0.02, 0.02);
		const mesh = this.mesh = sprite;
		// const mesh = this.mesh = new InteractiveMesh(geometry, material);

		mesh.depthTest = false;
		this.item.mesh = mesh;
		mesh.on('over', () => {
			const from = { scale: mesh.scale.x };
			gsap.to(from, 0.4, {
				scale: 0.03,
				delay: 0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					mesh.scale.set(from.scale, from.scale, from.scale);
				}
			});
			this.over.next(this.item);
		});
		mesh.on('out', () => {
			const from = { scale: mesh.scale.x };
			gsap.to(from, 0.4, {
				scale: 0.02,
				delay: 0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					mesh.scale.set(from.scale, from.scale, from.scale);
				}
			});
			this.out.next(this.item);
		});
		mesh.on('down', () => {
			this.down.next(this.item);
		});
		const position = new THREE.Vector3().set(...this.item.position).normalize().multiplyScalar(NAV_RADIUS);
		mesh.position.set(position.x, position.y, position.z);
		// mesh.lookAt(ORIGIN);
		const from = { opacity: 0 };
		gsap.to(from, 0.7, {
			opacity: 1,
			delay: 0.5 + 0.1 * this.item.index,
			ease: Power2.easeInOut,
			onUpdate: () => {
				// console.log(index, from.opacity);
				material.opacity = from.opacity;
				material.needsUpdate = true;
			}
		});
		if (typeof callback === 'function') {
			callback(mesh);
		}
	}

}

ModelNavComponent.meta = {
	selector: '[model-nav]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down'],
	inputs: ['item'],
};
