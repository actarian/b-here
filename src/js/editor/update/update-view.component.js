import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';

export default class UpdateViewComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		this.update();
	}

	update() {
		const view = this.view;
		if (this.type !== view.type) {
			this.type = view.type;
			const form = this.form;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (view.type) {
				default:
					keys = ['id', 'type', 'name'];
			}
			keys.forEach(key => {
				form.add(new FormControl(view[key], RequiredValidator()), key);
			});
			this.controls = form.controls;
		}
	}

	onChanges(changes) {
		this.update();
	}

	onSubmit() {
		if (this.form.valid) {
			console.log('UpdateViewComponent.onSubmit', this.form.value);
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		console.log('UpdateViewComponent.onRemove');
	}

	onToggle(event) {
		this.active = !this.active;
		this.pushChanges();
	}
}

UpdateViewComponent.meta = {
	selector: 'update-view',
	inputs: ['view'],
	template: /* html */`
		<div class="group--headline" [class]="{ active: active }" (click)="onToggle($event)">
			<!-- <div class="id" [innerHTML]="view.id"></div> -->
			<div class="icon">
				<svg-icon [name]="view.type"></svg-icon>
			</div>
			<div class="title" [innerHTML]="view.name || view.id"></div>
			<svg class="icon icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="active">
			<fieldset>
				<div control-text [control]="controls.id" label="Id" [disabled]="true"></div>
				<div control-text [control]="controls.type" label="Type" [disabled]="true"></div>
				<div control-text [control]="controls.name" label="Name"></div>
			</fieldset>
			<fieldset *if="view.type == 'waiting-room'">
				<!-- <div control-upload [control]="controls.upload" label="Upload"></div> -->
			</fieldset>
			<fieldset *if="view.type == 'panorama'">
				<!-- <div control-upload [control]="controls.upload" label="Upload"></div> -->
			</fieldset>
			<div class="group--cta">
				<button type="submit" class="btn--update">
					<span *if="!form.submitted">Update</span>
					<span *if="form.submitted">Update!</span>
				</button>
				<button type="button" class="btn--remove" *if="view.type != 'waiting-room'" (click)="onRemove($event)">
					<span>Remove</span>
				</button>
			</div>
		</form>
	`,
};
