import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import EditorService from '../editor.service';

const ORIGIN = new THREE.Vector3();

/*
{
	"id": 2310,
	"type": "plane",
	"asset": {
	"type": "video",
	"folder": "room-3d/",
	"file": "plane-01.mp4"
	},
	"position": { "x": 20, "y": 1.7, "z": 0 },
	"rotation": { "x": 0, "y": -1.57079632679, "z": 0 },
	"scale": { "x": 22, "y": 12, "z": 1 }
}
*/

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

	get position() {
		let position = null;
		const data = this.data;
		if (data) {
			position = data.position;
		}
		return position;
	}

	onInit() {

		const object = new THREE.Object3D();
		object.position.copy(this.position);
		object.lookAt(ORIGIN);
		console.log(object.rotation);



		const form = this.form = new FormGroup({
			type: ViewItemType.Plane,
			// title: new FormControl(null, RequiredValidator()),
			// upload: new FormControl(null, RequiredValidator()),
			position: new FormControl(this.position.multiplyScalar(20).toArray(), RequiredValidator()),
			rotation: new FormControl(object.rotation.toArray(), RequiredValidator()), // [0, -Math.PI / 2, 0],
			scale: new FormControl([3.2, 1.8, 1], RequiredValidator()),
		});
		this.controls = form.controls;
		/*
		this.controls.viewId.options = [{
			name: "Name",
			id: 2,
		}];
		*/
		form.changes$.subscribe((changes) => {
			// console.log('PlaneModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		/*
		EditorService.data$().pipe(
			first(),
		).subscribe(data => {
			this.controls.viewId.options = data.views.map(view => ({ id: view.id, name: view.name }));
			this.pushChanges();
		});
		*/
	}

	onSubmit() {
		if (this.form.valid) {
			const item = Object.assign({}, this.form.value);
			// item.viewId = parseInt(item.viewId);
			console.log('PlaneModalComponent.onSubmit', this.view, item);
			EditorService.itemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				console.log('PlaneModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => console.log('PlaneModalComponent.onSubmit.error', error));
			// ModalService.resolve(this.form.value);
			// this.form.submitted = true;
			// this.form.reset();
		} else {
			this.form.touched = true;
		}
	}

	close() {
		ModalService.reject();
	}

}

PlaneModalComponent.meta = {
	selector: '[plane-modal]'
};
