import { filter, take, takeUntil } from 'rxjs/operators';
import { Geometry } from '../geometry/geometry';
import { Host } from '../host/host';
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
		const selected = this.item.selected;
		this.editing = selected;
		if (this.mesh) {
			this.mesh.editing = selected;
		}
	}

	onCreate(mount, dismount) {
		const item = this.item;
		const view = this.view;
		const items = view.items;
		const geometry = Geometry.planeGeometry;
		this.onMeshDown = this.onMeshDown.bind(this);
		this.onMeshPlaying = this.onMeshPlaying.bind(this);
		this.onMeshZoomed = this.onMeshZoomed.bind(this);
		this.onMeshCurrentTime = this.onMeshCurrentTime.bind(this);
		let mesh;
		let subscription;
		MediaMesh.getStreamId$(item).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((streamId) => {
			// console.log('ModelPlaneComponent.onCreate.streamId', streamId);
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
					mesh = this.disposableMesh = new MediaMesh(item, view, geometry, this.host);
					mesh.updateFromItem(item);
					mesh.name = 'plane';
					mesh.load(() => {
						this.disposableMesh = null;
						if (typeof mount === 'function') {
							mount(mesh, item);
						}
						subscription = mesh.events$().pipe(
							takeUntil(this.unsubscribe$)
						).subscribe(() => { });
					});
					this.addMeshListeners(mesh);
				} else if (this.mesh) {
					dismount(this.mesh, item);
				}
				// console.log('streamId', streamId, mesh);
			}
		});
	}

	addMeshListeners(mesh) {
		mesh.on('down', this.onMeshDown);
		mesh.on('playing', this.onMeshPlaying);
		mesh.on('zoomed', this.onMeshZoomed);
		mesh.on('currentTime', this.onMeshCurrentTime);
	}

	removeMeshListeners(mesh) {
		mesh.off('down', this.onMeshDown);
		mesh.off('playing', this.onMeshPlaying);
		mesh.off('zoomed', this.onMeshZoomed);
		mesh.off('currentTime', this.onMeshCurrentTime);
	}

	onMeshDown() {
		// console.log('ModelPanelComponent.onMeshDown');
		this.down.next(this);
	}

	onMeshPlaying(playing) {
		// console.log('ModelPanelComponent.playing', playing);
		this.play.next({ itemId: this.item.id, playing });
	}

	onMeshZoomed(zoomed) {
		// console.log('ModelPanelComponent.zoomed', zoomed);
		this.zoom.next({ itemId: this.item.id, zoomed });
	}

	onMeshCurrentTime(currentTime) {
		// console.log('ModelPanelComponent.playing', playing);
		this.currentTime.next({ itemId: this.item.id, currentTime });
	}

	onDestroy() {
		// console.log('ModelPlaneComponent.onDestroy');
		super.onDestroy();
		if (this.disposableMesh) {
			this.removeMeshListeners(this.disposableMesh);
			this.disposableMesh.dispose();
		}
		if (this.mesh) {
			this.removeMeshListeners(this.mesh);
			this.mesh.dispose();
		}
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		// console.log('ModelPlaneComponent.onUpdate', item);
		mesh.updateFromItem(item);
		this.updateHelper();
	}

	// called by UpdateViewItemComponent
	onUpdateAsset(item, mesh) {
		// console.log('ModelPlaneComponent.onUpdateAsset', item);
		mesh.updateByItem(item);
		MediaMesh.getStreamId$(item).pipe(
			filter(streamId => streamId !== null),
			take(1),
		).subscribe((streamId) => {
			item.streamId = streamId;
			mesh.load(() => {
				// console.log('ModelPlaneComponent.mesh.load.complete');
			});
		});
	}

	// called by WorldComponent
	onDragMove(position, normal, spherical) {
		// console.log('ModelPlaneComponent.onDragMove', position, normal, spherical);
		const item = this.item;
		const mesh = this.mesh;
		item.showPanel = false;
		this.editing = true;
		if (spherical) {
			position.normalize().multiplyScalar(20);
			mesh.position.set(position.x, position.y, position.z);
			mesh.lookAt(Host.origin);
		} else {
			mesh.position.set(0, 0, 0);
			mesh.lookAt(normal);
			mesh.position.set(position.x, position.y, position.z);
			mesh.position.add(normal.multiplyScalar(0.01));
		}
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		// console.log('ModelPlaneComponent.onDragEnd');
		const item = this.item;
		const mesh = this.mesh;
		item.position = mesh.position.toArray();
		item.rotation = mesh.rotation.toArray();
		item.scale = mesh.scale.toArray();
		mesh.updateFromItem(item);
		this.editing = false;
	}
}

ModelPlaneComponent.textures = {};

ModelPlaneComponent.meta = {
	selector: '[model-plane]',
	hosts: { host: WorldComponent },
	outputs: ['down', 'play', 'zoom', 'currentTime'],
	inputs: ['item', 'view'],
};
