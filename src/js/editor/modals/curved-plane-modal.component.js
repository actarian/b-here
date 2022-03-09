import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
// import * as THREE from 'three';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import { Host } from '../../world/host/host';
import EditorService from '../editor.service';
export default class CurvedPlaneModalComponent extends Component {

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
			type: ViewItemType.CurvedPlane,
			position: new FormControl(object.position.toArray(), RequiredValidator()),
			rotation: new FormControl(object.rotation.toArray(), RequiredValidator()),
			scale: new FormControl([1, 1, 1], RequiredValidator()),
			radius: new FormControl(35, RequiredValidator()),
			height: new FormControl(20, RequiredValidator()),
			arc: new FormControl(90, RequiredValidator()),
			asset: null,
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('CurvedPlaneModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const item = Object.assign({}, this.form.value);
			// item.viewId = parseInt(item.viewId);
			// console.log('CurvedPlaneModalComponent.onSubmit', this.view, item);
			EditorService.inferItemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				// console.log('CurvedPlaneModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => console.log('CurvedPlaneModalComponent.onSubmit.error', error));
		} else {
			this.form.touched = true;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

CurvedPlaneModalComponent.meta = {
	selector: '[curved-plane-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Curved Plane.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<!-- <div control-text [control]="controls.title" label="Title"></div> -->
						<div control-vector [control]="controls.position" label="Position" [precision]="2" [disabled]="true"></div>
						<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360" [disabled]="true"></div>
						<!--
						<div control-vector [control]="controls.scale" label="Scale" [precision]="2" [disabled]="true"></div>
						<div control-number [control]="controls.radius" label="Radius" [precision]="2" [disabled]="true"></div>
						<div control-number [control]="controls.height" label="Height" [precision]="2" [disabled]="true"></div>
						<div control-number [control]="controls.arc" label="Arc" [precision]="0" [disabled]="true"></div>
						-->
						<div control-localized-asset [control]="controls.asset" label="Image or Video" accept="image/jpeg, video/mp4"></div>
					</div>
					<div class="group--cta">
						<button type="submit" class="btn--accept">
							<span>Create</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	`,
};

CurvedPlaneModalComponent.chunk = () => /* html */`<div class="curved-plane-modal" curved-plane-modal></div>`;
