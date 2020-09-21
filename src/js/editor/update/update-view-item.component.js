import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ViewItemType } from '../../view/view';
import EditorService from '../editor.service';

export default class UpdateViewItemComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewItemComponent.form.changes$', changes, form.valid, form);
			if (typeof this.item.onUpdate === 'function') {
				this.item.onUpdate();
			}
			this.pushChanges();
		});
		this.update();
	}

	update() {
		const item = this.item;
		if (this.type !== item.type) {
			this.type = item.type;
			const form = this.form;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (item.type) {
				case ViewItemType.Nav:
					keys = ['id', 'type', 'title', 'abstract', 'viewId', 'position']; // link { title, href, target }
					break;
				case ViewItemType.Plane:
					keys = ['id', 'type', 'position', 'rotation', 'scale'];
					break;
				case ViewItemType.CurvedPlane:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'arc', 'height'];
					break;
				case ViewItemType.Texture:
					keys = ['id', 'type']; // asset, key no id!!
					break;
				case ViewItemType.Model:
					keys = ['id', 'type']; // title, abstract, asset,
					break;
				default:
					keys = ['id', 'type'];
			}
			keys.forEach(key => {
				form.add(new FormControl(item[key], RequiredValidator()), key);
			});
			this.controls = form.controls;
			if (keys.indexOf('viewId') !== -1) {
				EditorService.data$().pipe(
					first(),
				).subscribe(data => {
					this.controls.viewId.options = data.views.map(view => ({ id: view.id, name: view.name }));
					this.pushChanges();
				});
			}
		}
	}

	onChanges(changes) {
		this.update();
	}

	onSubmit() {
		if (this.form.valid) {
			console.log('UpdateViewItemComponent.onSubmit', this.form.value);
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		console.log('UpdateViewItemComponent.onRemove');
	}

	onToggle(event) {
		this.active = !this.active;
		this.pushChanges();
	}
}

UpdateViewItemComponent.meta = {
	selector: 'update-view-item',
	inputs: ['item'],
	template: /* html */`
		<div class="group--headline" [class]="{ active: active }" (click)="onToggle($event)">
			<!-- <div class="id" [innerHTML]="item.id"></div> -->
			<div class="icon">
				<svg-icon [name]="item.type"></svg-icon>
			</div>
			<div class="title" [innerHTML]="item.name || item.title || item.id"></div>
			<svg class="icon icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="active">
			<fieldset>
				<div control-text label="Id" [control]="controls.id" [disabled]="true"></div>
				<div control-text label="Type" [control]="controls.type" [disabled]="true"></div>
			</fieldset>
			<fieldset *if="item.type == 'nav'">
				<div control-text label="Title" [control]="controls.title"></div>
				<div control-text label="Abstract" [control]="controls.abstract"></div>
				<div control-select label="NavToView" [control]="controls.viewId"></div>
				<div control-vector label="Position" [control]="controls.position" [precision]="4"></div>
			</fieldset>
			<fieldset *if="item.type == 'plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector label="Scale" [control]="controls.scale" [precision]="2"></div>
			</fieldset>
			<fieldset *if="item.type == 'curved-plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector label="Scale" [control]="controls.scale" [precision]="2"></div>
			</fieldset>
			<div class="group--cta">
				<button type="submit" class="btn--update">
					<span *if="!form.submitted">Update</span>
					<span *if="form.submitted">Update!</span>
				</button>
				<button type="button" class="btn--remove" (click)="onRemove($event)">
					<span>Remove</span>
				</button>
			</div>
		</form>
	`,
};
