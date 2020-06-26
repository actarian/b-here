import * as THREE from 'three';
import InteractiveMesh from '../interactive/interactive.mesh';
import MediaLoader from '../media/media-loader';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelPlaneComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelPlaneComponent.onInit');
	}

	create(callback) {
		const item = this.item;
		this.mediaLoader = new MediaLoader(item).load((texture, mediaLoader) => {
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				// side: THREE.DoubleSide,
			});
			const geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
			const mesh = new InteractiveMesh(geometry, material);
			if (!mediaLoader.isVideo) {
				mesh.freeze();
			}
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
			if (mediaLoader.isPlayableVideo) {
				mesh.on('down', mediaLoader.toggle);
			}
			if (typeof callback === 'function') {
				callback(mesh);
			}
		});
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	onDestroy() {
		super.onDestroy();
		const mediaLoader = this.mediaLoader;
		if (mediaLoader.isPlayableVideo) {
			this.mesh.off('down', mediaLoader.toggle);
		}
		mediaLoader.dispose();
	}

}

ModelPlaneComponent.textures = {};

ModelPlaneComponent.meta = {
	selector: '[model-plane]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
