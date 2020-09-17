import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelDraggableComponent extends ModelComponent {

	get dragging() {
		return this.dragging_;
	}
	set dragging(dragging) {
		if (this.dragging_ !== dragging) {
			this.dragging_ = dragging;
			this.setHelper(dragging);
		}
	}

	onInit() {
		super.onInit();
		this.RADIUS = 100;
	}

	setHelper(showHelper) {
		if (showHelper) {
			if (!this.helper) {
				this.helper = new THREE.BoxHelper(this.mesh, 0x00ff00);
			}
			this.host.scene.add(this.helper);
		} else if (this.helper) {
			this.host.scene.remove(this.helper);
		}
	}
}

ModelDraggableComponent.meta = {
	selector: '[model-draggable]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
