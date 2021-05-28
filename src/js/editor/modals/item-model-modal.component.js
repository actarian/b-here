import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
// import * as THREE from 'three';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import { Host } from '../../world/host/host';
import EditorService from '../editor.service';
export default class ItemModelModalComponent extends Component {

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	get view() {
		let view = null;
		const data = this.data;
		if (data) {
			view = data.view;
		}
		return view;
	}

	get object() {
		const object = new THREE.Object3D();
		const data = this.data;
		if (data) {
			const position = data.hit.position.clone();
			const normal = data.hit.normal.clone();
			const spherical = data.hit.spherical;
			if (spherical) {
				position.normalize().multiplyScalar(4);
				object.position.copy(position);
				object.lookAt(Host.origin);
			} else {
				object.lookAt(normal);
				object.position.set(position.x, position.y, position.z);
				object.position.add(normal.multiplyScalar(0.01));
			}
		}
		return object;
	}

	onInit() {
		const object = this.object;
		const form = this.form = new FormGroup({
			type: ViewItemType.Model,
			position: new FormControl(object.position.toArray(), RequiredValidator()),
			rotation: new FormControl([0, 0, 0], RequiredValidator()), // [0, -Math.PI / 2, 0],
			// rotation: new FormControl(object.rotation.toArray(), RequiredValidator()), // [0, -Math.PI / 2, 0],
			scale: new FormControl([1, 1, 1], RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('ItemModelModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const item = Object.assign({}, this.form.value);
			// item.viewId = parseInt(item.viewId);
			// console.log('ItemModelModalComponent.onSubmit', this.view, item);
			EditorService.inferItemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				// console.log('ItemModelModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => console.log('ItemModelModalComponent.onSubmit.error', error));
		} else {
			this.form.touched = true;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

ItemModelModalComponent.meta = {
	selector: '[item-model-modal]'
};
