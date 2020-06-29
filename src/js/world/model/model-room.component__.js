import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import { environment } from '../../environment';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const USE_SHADOW = false;

export default class ModelRoomComponent extends ModelComponent {

	onInit() {
		super.onInit();
		this.progress = 0;
		// console.log('ModelRoomComponent.onInit');
	}

	create(callback) {
		this.loadModel(environment.getModelPath(this.item.modelFolder), this.item.modelFile, (mesh) => {
			if (typeof callback === 'function') {
				callback(mesh);
			}
			this.progress = 0;
			this.pushChanges();
		});
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	getLoader(path, file) {
		let loader;
		if (file.indexOf('.fbx') !== -1) {
			loader = new FBXLoader();
		} else {
			loader = new GLTFLoader();
		}
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
						const material = new THREE.MeshStandardMaterial({
							color: 0x222222, // new THREE.Color(Math.random(), Math.random(), Math.random()),
							roughness: 0.4,
						});
						child.material = material;
						*/
					}
				}
			});
			mesh.position.y = -1.66 * 3;
			items.forEach(item => {
				const child = item.mesh;
				if (child) {
					child.material.color.setHex(0x000000);
					const parent = child.parent;
					const mesh = new MediaMesh(item, child.geometry);
					mesh.name = child.name;
					mesh.position.copy(child.position);
					mesh.rotation.copy(child.rotation);
					mesh.scale.copy(child.scale);
					mesh.load(() => {
						parent.add(mesh);
						parent.remove(child);
						child.material.dispose();
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
