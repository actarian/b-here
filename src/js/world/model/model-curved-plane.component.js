import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelEditableComponent from './model-editable.component';

export default class ModelCurvedPlaneComponent extends ModelEditableComponent {

	onInit() {
		super.onInit();
		// console.log('ModelCurvedPlaneComponent.onInit');
	}

	onChanges() {
		this.editing = this.item.selected;
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
					dismount(mesh, item);
				}
				if (subscription) {
					subscription.unsubscribe();
					subscription = null;
				}
				if (streamId || !item.asset) {
					item.streamId = streamId;
					mesh = new MediaMesh(item, items, geometry, (item.asset && item.asset.chromaKeyColor ? MediaMesh.getChromaKeyMaterial(item.asset.chromaKeyColor) : null));
					if (item.position) {
						mesh.position.fromArray(item.position);
					}
					if (item.rotation) {
						mesh.rotation.fromArray(item.rotation);
					}
					if (item.scale) {
						mesh.scale.fromArray(item.scale);
					}
					mesh.load(() => {
						if (typeof mount === 'function') {
							mount(mesh, item);
						}
						subscription = mesh.events$().pipe(
							takeUntil(this.unsubscribe$)
						).subscribe(() => { });
					});
					mesh.on('down', () => {
						this.down.next(this);
					});
				}
				// console.log('streamId', streamId, mesh);
			}
		});
	}

	onDestroy() {
		super.onDestroy();
		if (this.mesh) {
			this.mesh.dispose();
		}
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		if (item.position) {
			mesh.position.fromArray(item.position);
		}
		if (item.rotation) {
			mesh.rotation.fromArray(item.rotation);
		}
		if (item.scale) {
			mesh.scale.fromArray(item.scale);
		}
		this.updateHelper();
	}

	// called by WorldComponent
	onDragMove(position) {
		this.item.showPanel = false;
		this.editing = true;
		this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(20);
		this.mesh.lookAt(ModelCurvedPlaneComponent.ORIGIN);
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		this.item.position = this.mesh.position.toArray();
		this.item.rotation = this.mesh.rotation.toArray();
		this.item.scale = this.mesh.scale.toArray();
		this.editing = false;
	}

}

ModelCurvedPlaneComponent.ORIGIN = new THREE.Vector3();
ModelCurvedPlaneComponent.textures = {};

ModelCurvedPlaneComponent.meta = {
	selector: '[model-curved-plane]',
	hosts: { host: WorldComponent },
	outputs: ['down'],
	inputs: ['item', 'items'],
};
