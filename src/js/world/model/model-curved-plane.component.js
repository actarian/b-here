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
		const geometry = this.getCurvedPanelGeometry(item);
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
				console.log('ModelCurvedPanel', streamId, item.asset)
				if (streamId || !item.asset) {
					item.streamId = streamId;
					mesh = new MediaMesh(item, items, geometry);
					mesh.name = 'curved-plane';
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
						console.log('ModelCurvedPanel.down');
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
		// console.log('ModelCurvedPlaneComponent.onUpdate', item);
		if (item.position) {
			mesh.position.fromArray(item.position);
		}
		if (item.rotation) {
			mesh.rotation.fromArray(item.rotation);
		}
		if (item.scale) {
			mesh.scale.fromArray(item.scale);
		}
		// !!! deactivated
		if (false && (item.radius !== this.radius_ || item.height !== this.height_ || item.arc !== this.arc_)) {
			this.mesh.geometry.dispose();
			const geometry = this.getCurvedPanelGeometry(item);
			this.mesh.geometry = geometry;
		}
		this.updateHelper();
	}

	// called by UpdateViewItemComponent
	onUpdateAsset(item, mesh) {
		// console.log('ModelCurvedPlaneComponent.onUpdateAsset', item);
		this.mesh.updateByItem(item);
		this.mesh.load(() => {
			console.log('ModelCurvedPlaneComponent.mesh.load.complete');
		});
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

	getCurvedPanelGeometry(item) {
		this.radius_ = item.radius;
		this.height_ = item.height;
		this.arc_ = item.arc;
		const arc = Math.PI / 180 * item.arc;
		const geometry = new THREE.CylinderBufferGeometry(item.radius, item.radius, item.height, 36, 2, true, 0, arc);
		geometry.rotateY(-Math.PI - arc / 2);
		geometry.scale(-1, 1, 1);
		return geometry;
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
