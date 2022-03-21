// import * as THREE from 'three';
// import { GLTFLoader } from '../loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { environment } from '../../environment';
import InteractiveMesh from '../interactive/interactive.mesh';
import MediaLoader from '../media/media-loader';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const USE_SHADOW = false;

export default class ModelRoomComponent extends ModelComponent {

	onInit() {
		super.onInit();
		this.progress = 0;
		// console.log('ModelRoomComponent.onInit');
	}

	onCreate(mount, dismount) {
		this.loadModel(environment.getPath(this.item.modelFolder), this.item.modelFile, (mesh) => {
			if (typeof mount === 'function') {
				mount(mesh);
			}
			this.progress = 0;
			this.pushChanges();
		});
		// dismount
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	getLoader(path, file) {
		let loader;
		loader = new GLTFLoader();
		loader.setPath(path);
		return loader;
	}

	loadModel(path, file, callback) {
		// const renderer = this.host.renderer;
		// const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
		const loader = this.getLoader(path, file);
		loader.load(file, (model) => {
			let mesh;
			const scene = model.scene;
			if (scene) {
				mesh = scene;
			} else {
				mesh = model;
			}
			const items = this.item.items;
			mesh.scale.set(0.1, 0.1, 0.1);
			// mesh.scale.set(10, 10, 10);
			mesh.traverse((child) => {
				if (child.isMesh) {
					// roughnessMipmapper.generateMipmaps(child.material);
					const item = items.find(x => x.id === child.name);
					if (item) {
						item.mesh = child;
					} else {
						/*
						if (USE_SHADOW) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
						*/
						child.material.dispose();
						const material = new THREE.MeshStandardMaterial({
							color: 0x111111,
							roughness: 0.6,
						});
						child.material = material;
					}
				}
			});
			mesh.position.y = -1.66 * 3;
			items.forEach(item => {
				const child = item.mesh;
				if (child) {
					child.material.color.setHex(0x000000);
					item.mediaLoader = new MediaLoader(item).load((texture, mediaLoader) => {
						const material = new THREE.MeshBasicMaterial({
							map: texture,
							side: THREE.DoubleSide,
						});
						const mesh = new InteractiveMesh(child.geometry, material);
						if (!mediaLoader.isVideo) {
							mesh.freeze();
						}
						mesh.name = child.name;
						mesh.position.copy(child.position);
						mesh.rotation.copy(child.rotation);
						mesh.scale.copy(child.scale);
						const parent = child.parent;
						parent.remove(child);
						child.material.dispose();
						parent.add(mesh);
						if (mediaLoader.isPlayableVideo) {
							mesh.on('down', mediaLoader.toggle);
						}
					});
				}
			});
			const lights = new Array(3).fill(0).map((x, i) => {
				const light = new THREE.PointLight(0xffffff, 0.1, 1000, 2);
				if (USE_SHADOW) {
					light.castShadow = true;
					light.shadow.mapSize.width = 1024;
					light.shadow.mapSize.height = 1024;
					light.shadow.camera.near = 0.1;
					light.shadow.camera.far = 500;
				}
				const radians = Math.PI / 180 * 45 + Math.PI / 180 * 120 * i;
				light.position.set(Math.cos(radians) * 5, 1, Math.sin(radians) * 5);
				/*
				const helper = new THREE.PointLightHelper(light, 0.1);
				this.group.add(helper);
				*/
				this.group.add(light);
				return light;
			});
			if (typeof callback === 'function') {
				callback(mesh);
			}
			this.progress = 0;
			this.pushChanges();
			// roughnessMipmapper.dispose();
		}, (progressEvent) => {
			if (progressEvent.lengthComputable) {
				this.progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
			} else {
				this.progress = this.progress || 0;
				this.progress = Math.min(100, this.progress + 1);
			}
			// console.log('progressEvent', progressEvent.loaded, progressEvent.total);
			this.pushChanges();
		});
	}

	onDestroy() {
		super.onDestroy();
		const item = this.item;
		if (item) {
			const items = item.items;
			if (items) {
				items.forEach(item => {
					if (item.mediaLoader) {
						item.mediaLoader.dispose();
						delete item.mediaLoader;
					}
				});
			}
		}
	}

}

ModelRoomComponent.textures = {};

ModelRoomComponent.meta = {
	selector: '[model-room]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
