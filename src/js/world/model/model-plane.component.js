import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import MediaLoader, { MediaLoaderPlayEvent } from '../media/media-loader';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelPlaneComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelPlaneComponent.onInit');
	}

	create(callback) {
		const item = this.item;
		const geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
		const mesh = new MediaMesh(item, geometry, item.chromaKeyColor ? MediaMesh.getChromaKeyMaterial(item.chromaKeyColor) : null);
		if (item.position) {
			mesh.position.set(item.position.x, item.position.y, item.position.z);
		}
		if (item.rotation) {
			mesh.rotation.set(item.rotation.x, item.rotation.y, item.rotation.z);
		}
		if (item.scale) {
			mesh.scale.set(item.scale.x, item.scale.y, item.scale.z);
		}
		mesh.load(() => {
			/*
			var box = new THREE.BoxHelper(mesh, 0xffff00);
			this.host.scene.add(box);
			*/
			if (typeof callback === 'function') {
				callback(mesh);
			}
		});
		if (item.linkedPlayId) {
			mesh.freeze();
			MediaLoader.events$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(event => {
				const eventItem = this.items.find(x => event.src.indexOf(x.file) !== -1);
				if (eventItem && eventItem.id === item.linkedPlayId) {
					// console.log('MediaLoader.events$.eventItem', eventItem);
					if (event instanceof MediaLoaderPlayEvent) {
						mesh.play();
					} else {
						mesh.pause();
					}
				}
			});
		}
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	onDestroy() {
		super.onDestroy();
		this.mesh.dispose();
	}

}

ModelPlaneComponent.textures = {};

ModelPlaneComponent.meta = {
	selector: '[model-plane]',
	hosts: { host: WorldComponent },
	inputs: ['item', 'items'],
};
