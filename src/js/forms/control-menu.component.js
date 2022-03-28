import { FormArray, FormGroup } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import DropdownDirective from '../dropdown/dropdown.directive';
import { EditorService } from '../editor/editor.service';
import MenuService from '../editor/menu/menu.service';
import ControlAssetComponent from './control-asset.component';

let MENU_UID = 0;

export default class ControlMenuComponent extends ControlAssetComponent {

	static itemToFormGroup(item) {
		return new FormGroup({
			id: item.id,
			parentId: item.parentId,
			viewId: item.viewId,
			name: item.name,
			items: new FormArray(),
		});
	}

	/*
	static newFormGroup(parentId = null) {
		return new FormGroup({
			id: null,
			parentId: parentId,
			viewId: null,
			name: 'Folder ' + (++MENU_UID),
			items: new FormArray(),
		});
	}
	*/

	onInit() {
		this.dropdownId = DropdownDirective.nextId();
		this.controls = this.control.controls;
		EditorService.viewIdOptions$().pipe(
			first(),
		).subscribe(options => {
			this.controls.viewId.options = options;
		});
	}

	onAddItem() {
		MenuService.createMenuItem$(this.controls.id.value, this.controls.items.length).pipe(
			first(),
		).subscribe(item => {
			this.controls.items.push(ControlMenuComponent.itemToFormGroup(item));
		});
		// this.controls.items.push(ControlMenuComponent.newFormGroup(this.controls.id.value));
	}

	onRemoveItem() {
		this.remove.next(this.control);
	}

	onRemoveControl(control) {
		MenuService.deleteMenuItem$(control.value).pipe(
			first(),
		).subscribe(() => {
			this.controls.items.remove(control);
		});
		// this.controls.items.remove(control);
	}

	onLinkItem() {
		this.link.next(this.control);
	}

	onLinkControl(control) {
		this.link.next(control);
	}

	onItemUp() {
		this.up.next(this.control);
	}

	onItemDown() {
		this.down.next(this.control);
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

	setView(view) {
		// console.log('ControlMenuComponent.setView', view.id);
		const payload = Object.assign({}, this.control.value);
		payload.viewId = view.id;
		if (view.id) {
			payload.name = view.name;
		}
		MenuService.updateMenuItem$(payload).pipe(
			first()
		).subscribe(() => {
			this.controls.viewId.value = view.id;
			if (view.id) {
				this.controls.name.value = view.name;
				// clear sub items
				this.controls.items.controls = [];
				this.controls.items.switchSubjects_();
			}
			// this.change.next(value);
		});
	}

	onTextDidChange(event) {
		// console.log('ControlMenuComponent.onTextDidChange', this.controls.name.value);
		MenuService.updateMenuItem$(this.control.value).pipe(
			first()
		).subscribe();
	}

	hasOption(item) {
		return this.controls.viewId.value === item.id;
	}

	onDropped(id) {
		// console.log('ControlMenuComponent.onDropped', id);
	}

}

ControlMenuComponent.meta = {
	selector: '[control-menu]',
	outputs: ['remove', 'link', 'up', 'down'],
	inputs: ['control'],
	template: /* html */ `
		<div class="group--form">
			<button type="button" class="control-menu__link" [class]="{ active: control.controls.viewId.value }" (click)="onLinkItem($event)" [dropdown]="dropdownId" (dropped)="onDropped($event)">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#link"></use></svg>
				<div class="dropdown" [dropdown-item]="dropdownId">
					<div class="category">View</div>
					<ul class="nav--dropdown">
						<li (click)="setView(item)" [class]="{ empty: item.id == null }" *for="let item of control.controls.viewId.options">
							<span [class]="{ active: hasOption(item) }" [innerHTML]="item.name"></span>
						</li>
					</ul>
				</div>
			</button>
			<input type="text" class="control--text" [formControl]="control.controls.name" placeholder="Name" (change)="onTextDidChange($event)" />
			<!--
			<button type="button" class="control-menu__add" (click)="onAddItem($event)">
				<span [innerHTML]="control.controls.viewId.value"></span>
			</button>
			-->
			<!--
			<select class="control--select" [formControl]="control.controls.viewId">
				<option [value]="item.id" *for="let item of control.controls.viewId.options" [innerHTML]="item.name"></option>
			</select>
			-->
			<button type="button" class="control-menu__up" (click)="onItemUp($event)">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#up"></use></svg>
			</button>
			<button type="button" class="control-menu__down" (click)="onItemDown($event)">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#down"></use></svg>
			</button>
			<button type="button" class="control-menu__add" (click)="onAddItem($event)" *if="!control.controls.viewId.value">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#add"></use></svg>
			</button>
			<button type="button" class="control-menu__remove" (click)="onRemoveItem($event)">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#remove"></use></svg>
			</button>
		</div>
		<div class="group--items">
			<div control-menu *for="let sub of control.controls.items.controls" [control]="sub" (remove)="onRemoveControl($event)" (link)="onLinkControl($event)" (up)="onUpControl($event)" (down)="onDownControl($event)"></div>
		</div>
	`
};
