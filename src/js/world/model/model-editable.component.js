// import * as THREE from 'three';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelEditableComponent extends ModelComponent {

	get editing() {
		return this.editing_;
	}
	set editing(editing) {
		if (this.editing_ !== editing) {
			this.editing_ = editing;
			this.setHelper(editing);
		}
	}

	onInit() {
		super.onInit();
		this.RADIUS = 100;
	}

	onDestroy() {
		// console.log('ModelEditableComponent', this);
		this.editing = false;
		super.onDestroy();
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

	updateHelper() {
		if (this.helper) {
			this.helper.setFromObject(this.mesh);
			// this.helper.update();
		}
	}
}

ModelEditableComponent.meta = {
	selector: '[model-editable]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
