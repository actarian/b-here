import { Component } from 'rxcomp';
import { FormArray, FormGroup } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import ControlMenuComponent from '../../forms/control-menu.component';
import MenuService from './menu.service';

export default class MenuBuilderComponent extends Component {

	onInit() {
		this.changes = 0;
		this.form = null;
		MenuService.getMenu$().pipe(
			first(),
		).subscribe(menu => this.initForm(menu));
	}

	initForm(menu = []) {
		const items = this.menuToControls(menu);
		// console.log('MenuBuilderComponent', items);
		const form = this.form = new FormGroup({
			items: items,
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('MenuBuilderComponent', changes);
			this.changes++;
			this.pushChanges();
		});
	}

	onLinkControl(control) {

	}

	onUpControl(control) {
		const items = this.controls.items;
		const length = items.controls.length;
		let index = items.controls.indexOf(control);
		items.controls.splice(index, 1);
		if (index > 0) {
			index--;
		} else {
			index = length - 1;
		}
		items.insert(control, index);
	}

	onDownControl(control) {
		const items = this.controls.items;
		const length = items.controls.length;
		let index = items.controls.indexOf(control);
		items.controls.splice(index, 1);
		if (index < length - 1) {
			index++;
		} else {
			index = 0;
		}
		items.insert(control, index);
	}

	onAddItem() {
		MenuService.createMenuItem$(null, this.controls.items.length).pipe(
			first(),
		).subscribe(item => {
			this.controls.items.push(ControlMenuComponent.itemToFormGroup(item));
		});
		// this.controls.items.push(ControlMenuComponent.newFormGroup());
	}

	onRemoveControl(control) {
		MenuService.deleteMenuItem$(control.value).pipe(
			first(),
		).subscribe(() => {
			this.controls.items.remove(control);
		});
		// this.controls.items.remove(control);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onSubmit(event) {
		if (this.form.valid) {
			const changes = this.form.value;
			const menu = this.controlsToMenu(changes);
			MenuService.updateMenu$(menu);
		} else {
			this.form.touched = true;
		}
	}

	menuToControls(menu, parentId = null) {
		const items = new FormArray(menu.filter(x => {
			return (x.parentId || null) === parentId;
		}).map(x => {
			const subitems = this.menuToControls(menu, x.id);
			return new FormGroup({
				id: x.id,
				parentId: x.parentId,
				viewId: x.viewId,
				name: x.name,
				items: subitems,
			});
		}))
		return items;
	}

	controlsToMenu(changes) {
		const menu = [];
		const pushItem = (items) => {
			if (items) {
				items.forEach((item, i) => {
					const menuItem = Object.assign({}, item);
					menuItem.order = i * 10;
					delete menuItem.items;
					menu.push(menuItem);
					pushItem(item.items);
				});
			}
		}
		pushItem(changes.items);
		return menu;
	}

}

MenuBuilderComponent.meta = {
	selector: '[menu-builder]',
	inputs: ['views'],
	template: /* html */`
	<div class="group--head">
		<div class="title" [innerHTML]="'editor_menu' | label"></div>
	</div>
	<div class="group--main">
		<div class="nav--tree" *if="form">
			<form class="form" [formGroup]="form" (submit)="isValid() && onSubmit()" name="form" role="form" novalidate autocomplete="off">
				<div class="abstract" *if="controls.items.controls.length == 0" [innerHTML]="'editor_add_item' | label"></div>
				<div *for="let control of controls.items.controls">
					<div control-menu [control]="control" (remove)="onRemoveControl($event)" (link)="onLinkControl($event)" (up)="onUpControl($event)" (down)="onDownControl($event)"></div>
				</div>
			</form>
		</div>
	</div>
	<div class="group--foot">
		<button type="button" class="btn--mode" (click)="onAddItem($event)" [innerHTML]="'editor_add' | label"></button>
		<button type="button" class="btn--mode" (click)="isValid() && onSubmit()" *if="changes > 1" [innerHTML]="'editor_save' | label"></button>
	</div>
	`,
};
