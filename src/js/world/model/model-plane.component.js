import * as THREE from 'three';
import { environment } from '../../../environment/environment';
import { BASE_HREF } from '../../const';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelPlaneComponent extends ModelComponent {

	static getPath(folder, file) {
		return BASE_HREF + environment.paths.textures + folder + file;
	}

	static getLoader() {
		// return new THREE.TextureLoader();
		return ModelPlaneComponent.loader || (ModelPlaneComponent.loader = new THREE.TextureLoader());
	}

	static loadTexture(folder, file) {
		const path = ModelPlaneComponent.getPath(folder, file);
		return ModelPlaneComponent.textures[path] || (ModelPlaneComponent.textures[path] = ModelPlaneComponent.getLoader().load(path));
	}

	onInit() {
		super.onInit();
		// console.log('ModelPlaneComponent.onInit');
	}

	loadTexture(item, callback) {
		let texture;
		if (item.file.indexOf('.mp4') !== -1 || item.file.indexOf('.webm') !== -1) {
			// create the video element
			const video = item.video = document.createElement('video');
			video.src = ModelPlaneComponent.getPath(item.folder, item.file);
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
				console.log('ModelPlaneComponent.play');
			}, error => {
				console.log('ModelPlaneComponent.play.error', error);
			});
		} else {
			texture = ModelPlaneComponent.loadTexture(item.folder, item.file);
			if (typeof callback === 'function') {
				callback(texture);
			}
		}
	}

	create(callback) {
		const item = this.item;
		this.loadTexture(item, (texture) => {
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide,
			});
			const geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
			const mesh = new THREE.Mesh(geometry, material);
			if (item.position) {
				mesh.position.set(item.position.x, item.position.y, item.position.z);
			}
			if (item.rotation) {
				mesh.rotation.set(item.rotation.x, item.rotation.y, item.rotation.z);
			}
			if (item.scale) {
				mesh.scale.set(item.scale.x, item.scale.y, item.scale.z);
			}
			/*
			var box = new THREE.BoxHelper(mesh, 0xffff00);
			this.host.scene.add(box);
			*/
			if (typeof callback === 'function') {
				callback(mesh);
			}
		});
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	onDestroy() {
		super.onDestroy();
		const item = this.item;
		if (item && item.video) {
			item.video.pause();
			delete item.video;
		}
	}

}

ModelPlaneComponent.textures = {};

ModelPlaneComponent.meta = {
	selector: '[model-plane]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
