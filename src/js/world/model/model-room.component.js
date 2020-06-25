import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';
import { environment } from '../../environment';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const USE_SHADOW = false;

export default class ModelRoomComponent extends ModelComponent {

	static getPath(folder, file) {
		return environment.getTexturePath(folder + file);
	}

	static getLoader() {
		// return new THREE.TextureLoader();
		return ModelRoomComponent.loader || (ModelRoomComponent.loader = new THREE.TextureLoader());
	}

	static getTexture() {
		return ModelRoomComponent.loadTexture('matcaps/', 'matcap-01.png');
	}

	static loadTexture(folder, file) {
		const path = ModelRoomComponent.getPath(folder, file);
		return ModelRoomComponent.textures[path] || (ModelRoomComponent.textures[path] = ModelRoomComponent.getLoader().load(path));
	}

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

	loadTexture(item, callback) {
		let texture;
		if (item.file.indexOf('.mp4') !== -1 || item.file.indexOf('.webm') !== -1) {
			// create the video element
			const video = item.video = document.createElement('video');
			video.src = ModelRoomComponent.getPath(item.folder, item.file);
			video.muted = true;
			video.playsinline = true;
			video.loop = true;
			video.crossOrigin = 'anonymous';
			const onCanPlay = () => {
				video.oncanplay = null;
				const texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.format = THREE.RGBFormat;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture);
				}
			};
			video.oncanplay = onCanPlay;
			video.load(); // must call after setting/changing source
			video.play().then(() => {
				console.log('ModelRoomComponent.play');
			}, error => {
				console.log('ModelRoomComponent.play.error', error);
			});
		} else {
			texture = ModelRoomComponent.loadTexture(item.folder, item.file);
			if (typeof callback === 'function') {
				callback(texture);
			}
		}
	}

	loadModel(path, file, callback) {
		const renderer = this.host.renderer;
		// const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
		const loader = this.getLoader(path, file);
		loader.load(file, (model) => {
			console.log(model);
			let mesh;
			const scene = model.scene;
			if (scene) {
				mesh = scene;
			} else {
				mesh = model;
			}
			const texture = ModelRoomComponent.getTexture();
			const items = this.item.items;
			mesh.scale.set(0.1, 0.1, 0.1);
			// mesh.scale.set(10, 10, 10);
			mesh.traverse((child) => {
				if (child.isMesh) {
					// roughnessMipmapper.generateMipmaps(child.material);
					const item = items.find(x => x.id === child.name);
					if (item) {
						child.material.dispose();
						const material = new THREE.MeshBasicMaterial({
							color: 0x000000,
							side: THREE.DoubleSide,
						});
						this.loadTexture(item, (texture) => {
							material.map = texture;
							material.color.setHex(0xffffff);
							material.needsUpdate = true;
						});
						child.material = material;
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
					if (item.video) {
						item.video.pause();
						delete item.video;
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
