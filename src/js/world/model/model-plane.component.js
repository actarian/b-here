import { filter, take, takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
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
		const view = this.view;
		const items = view.items;
		const geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
		let mesh;
		let subscription;
		MediaMesh.getStreamId$(item).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((streamId) => {
			if (this.streamId !== streamId) {
				this.streamId = streamId;
				// !!! called by ModelComponent
				/*
				if (mesh) {
					dismount(mesh, item);
				}
				*/
				if (subscription) {
					subscription.unsubscribe();
					subscription = null;
				}
				if (streamId || !item.asset) {
					item.streamId = streamId;
					mesh = new MediaMesh(item, items, geometry);
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
						// console.log('ModelPanelComponent.down');
						this.down.next(this);
					});
					mesh.on('playing', (playing) => {
						// console.log('ModelPanelComponent.playing', playing);
						this.play.next({ itemId: this.item.id, playing });
					});
					mesh.on('currentTime', (currentTime) => {
						// console.log('ModelPanelComponent.playing', playing);
						this.currentTime.next({ itemId: this.item.id, currentTime });
					});
				} else if (this.mesh) {
					dismount(this.mesh, item);
				}
				// console.log('streamId', streamId, mesh);
			}
		});
	}

	onDestroy() {
		// console.log('ModelPlaneComponent', this);
		super.onDestroy();
		if (this.mesh) {
			this.mesh.dispose();
		}
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		// console.log('ModelPlaneComponent.onUpdate', item);
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

	// called by UpdateViewItemComponent
	onUpdateAsset(item, mesh) {
		// console.log('ModelPlaneComponent.onUpdateAsset', item);
		this.mesh.updateByItem(item);
		MediaMesh.getStreamId$(item).pipe(
			filter(streamId => streamId !== null),
			take(1),
		).subscribe((streamId) => {
			item.streamId = streamId;
			this.mesh.load(() => {
				// console.log('ModelPlaneComponent.mesh.load.complete');
			});
		});
	}

	// called by WorldComponent
	onDragMove(position, normal, spherical) {
		// console.log('ModelPlaneComponent.onDragMove', position, normal, spherical);
		this.item.showPanel = false;
		this.editing = true;
		if (spherical) {
			position.normalize().multiplyScalar(20);
			this.mesh.position.set(position.x, position.y, position.z);
			this.mesh.lookAt(ModelPlaneComponent.ORIGIN); // cameraGroup?
		} else {
			this.mesh.position.set(0, 0, 0);
			this.mesh.lookAt(normal);
			this.mesh.position.set(position.x, position.y, position.z);
			this.mesh.position.add(normal.multiplyScalar(0.01));
		}
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		// console.log('ModelPlaneComponent.onDragEnd');
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
	outputs: ['down', 'play', 'currentTime'],
	inputs: ['item', 'view'],
};
