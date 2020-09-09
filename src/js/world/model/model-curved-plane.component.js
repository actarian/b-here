import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelCurvedPlaneComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelCurvedPlaneComponent.onInit');
	}

	onCreate(mount, dismount) {
		const item = this.item;
		const items = this.items;
		const arc = Math.PI / 180 * item.arc;
		const geometry = new THREE.CylinderBufferGeometry(item.radius, item.radius, item.height, 36, 2, true, 0, arc);
		geometry.rotateY(-Math.PI / 2 - arc / 2);
		geometry.scale(-1, 1, 1);
		let mesh;
		let subscription;
		MediaMesh.getStreamId$(item).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((streamId) => {
			if (this.streamId !== streamId) {
				this.streamId = streamId;
				if (mesh) {
					dismount(mesh);
				}
				if (subscription) {
					subscription.unsubscribe();
					subscription = null;
				}
				if (streamId) {
					item.streamId = streamId;
					mesh = new MediaMesh(item, items, geometry, (item.asset && item.asset.chromaKeyColor ? MediaMesh.getChromaKeyMaterial(item.asset.chromaKeyColor) : null));
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
						if (typeof mount === 'function') {
							mount(mesh);
						}
						subscription = mesh.events$().pipe(
							takeUntil(this.unsubscribe$)
						).subscribe(() => { });
					});
				}
				// console.log('streamId', streamId, mesh);
			}
		});
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	onDestroy() {
		super.onDestroy();
		if (this.mesh) {
			this.mesh.dispose();
		}
	}

}

ModelCurvedPlaneComponent.textures = {};

ModelCurvedPlaneComponent.meta = {
	selector: '[model-curved-plane]',
	hosts: { host: WorldComponent },
	inputs: ['item', 'items'],
};
