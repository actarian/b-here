import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import MediaMesh from '../media/media-mesh';
import WorldComponent from '../world.component';
import ModelDraggableComponent from './model-draggable.component';

const ORIGIN = new THREE.Vector3();

export default class ModelCurvedPlaneComponent extends ModelDraggableComponent {

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
							mount(mesh);
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
		this.dragging = true;
		this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(20);
		this.mesh.lookAt(ORIGIN);
		this.helper.update();
	}

	// called by WorldComponent
	onDragEnd() {
		this.item.position = this.mesh.position.toArray();
		this.item.rotation = this.mesh.rotation.toArray();
		this.item.scale = this.mesh.scale.toArray();
		this.dragging = false;
	}

}

ModelCurvedPlaneComponent.textures = {};

ModelCurvedPlaneComponent.meta = {
	selector: '[model-curved-plane]',
	hosts: { host: WorldComponent },
	outputs: ['down'],
	inputs: ['item', 'items'],
};
