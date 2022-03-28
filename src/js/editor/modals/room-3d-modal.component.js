import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ModalService } from '../../modal/modal.service';
import { ViewType } from '../../view/view';
import { EditorService } from '../editor.service';

export default class Room3DModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Room3d,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
			// model: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('Room3DModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const view = {
				type: values.type,
				name: values.name,
				asset: values.asset,
				orientation: {
					latitude: 0,
					longitude: 0
				},
				zoom: 75
			};
			// console.log('Room3DModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				/*
				switchMap(view => {
					const item = {
						type: ViewItemType.Model,
						asset: values.model,
					};
					return EditorService.itemCreate$(view, item).pipe(
						map(item => {
							view.items = [item];
							return view;
						})
					);
				}),
				*/
				first(),
			).subscribe(response => {
				// console.log('Room3DModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('Room3DModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

Room3DModalComponent.meta = {
	selector: '[room-3d-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Room 3D View.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.name" label="Name"></div>
						<!--
						<div control-asset [control]="controls.asset" label="Image" accept="image/jpeg"></div>
						<div control-model [control]="controls.model" label="Model (.glb)" accept=".glb"></div>
						-->
						<div control-model [control]="controls.asset" label="Model (.glb)" accept=".glb"></div>
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

Room3DModalComponent.chunk = () => /* html */`<div class="room-3d-modal" room-3d-modal></div>`;
