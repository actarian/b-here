import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelEditableComponent from './model-editable.component';

export default class ModelPlaneComponent extends ModelEditableComponent {

	onInit() {
		super.onInit();
		// console.log('ModelPlaneComponent.onInit');
	}

	onChanges() {
		this.editing = this.item.selected;
	}

	onCreate(mount, dismount) {
		const item = this.item;
		const items = this.items;
		const geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
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
	}

	onDestroy() {
		super.onDestroy();
		if (this.mesh) {
			this.mesh.dispose();
		}
	}

	// called by WorldComponent
	onDragMove(position) {
		this.item.showPanel = false;
		this.editing = true;
		this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(20);
		this.mesh.lookAt(ModelPlaneComponent.ORIGIN);
		this.helper.update();
	}

	// called by WorldComponent
	onDragEnd() {
		this.item.position = this.mesh.position.toArray();
		this.item.rotation = this.mesh.rotation.toArray();
		this.item.scale = this.mesh.scale.toArray();
		this.editing = false;
	}

}

ModelPlaneComponent.ORIGIN = new THREE.Vector3();
ModelPlaneComponent.textures = {};

ModelPlaneComponent.meta = {
	selector: '[model-plane]',
	hosts: { host: WorldComponent },
	outputs: ['down'],
	inputs: ['item', 'items'],
};
