import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ModalService } from '../../modal/modal.service';
import { ViewType } from '../../view/view';
import { EditorService } from '../editor.service';

export default class PanoramaModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Panorama,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
			// upload: new FormControl(null, RequiredValidator()),
			// items: new FormArray([null, null, null], RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PanoramaModalComponent.form.changes$', changes, form.valid, form);
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
			// console.log('PanoramaModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				first(),
			).subscribe(response => {
				// console.log('PanoramaModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PanoramaModalComponent.onSubmit.error', error);
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

PanoramaModalComponent.meta = {
	selector: '[panorama-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Panorama.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.name" label="Name"></div>
						<div control-asset [control]="controls.asset" label="Image or Video" accept="image/jpeg, video/mp4"></div>
					</div>
					<div class="group--cta">
						<button type="submit" class="btn--accept">
							<span>Create</span>
						</button>
					</div>
					<!--
					<div class="group--form group--form--fixed">
						<code [innerHTML]="form.value | json"></code>
						<button type="button" class="btn--test" (click)="test()"><span>test</span></button>
					</div>
					-->
				</form>
			</div>
		</div>
	`,
};

PanoramaModalComponent.chunk = () => /* html */`<div class="panorama-modal" panorama-modal></div>`;
