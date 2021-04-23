import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import EditorService from '../editor.service';

export default class PlaneModalComponent extends Component {

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
				position.normalize().multiplyScalar(20);
				object.position.copy(position);
				object.lookAt(PlaneModalComponent.ORIGIN); // cameraGroup?
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
			type: ViewItemType.Plane,
			position: new FormControl(object.position.toArray(), RequiredValidator()),
			rotation: new FormControl(object.rotation.toArray(), RequiredValidator()), // [0, -Math.PI / 2, 0],
			scale: new FormControl([12, 6.75, 1], RequiredValidator()),
			asset: null,
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PlaneModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const item = Object.assign({}, this.form.value);
			// item.viewId = parseInt(item.viewId);
			console.log('PlaneModalComponent.onSubmit', this.view, item);
			EditorService.inferItemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				console.log('PlaneModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => console.log('PlaneModalComponent.onSubmit.error', error));
		} else {
			this.form.touched = true;
		}
	}

	close() {
		ModalService.reject();
	}

}

PlaneModalComponent.ORIGIN = new THREE.Vector3();

PlaneModalComponent.meta = {
	selector: '[plane-modal]'
};
