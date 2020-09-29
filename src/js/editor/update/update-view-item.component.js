import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import ModalSrcService from '../../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import { ViewItem, ViewItemType } from '../../view/view';
import { EditorLocale } from '../editor.locale';
import EditorService from '../editor.service';

export default class UpdateViewItemComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewItemComponent.form.changes$', changes);
			const item = this.item;
			Object.assign(item, changes);
			if (typeof item.onUpdate === 'function') {
				item.onUpdate();
			}
			this.pushChanges();
		});
		this.onUpdate();
	}

	onUpdate() {
		const item = this.item;
		const form = this.form;
		if (this.type !== item.type) {
			this.type = item.type;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (item.type) {
				case ViewItemType.Nav:
					keys = ['id', 'type', 'title', 'abstract', 'viewId', 'position', 'asset?', 'link?']; // , 'addAsset', 'addLink' link { title, href, target }
					break;
				case ViewItemType.Plane:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'asset?'];
					break;
				case ViewItemType.CurvedPlane:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'arc', 'height', 'asset?'];
					break;
				case ViewItemType.Texture:
					keys = ['id', 'type', 'asset?']; // asset, key no id!!
					break;
				case ViewItemType.Model:
					keys = ['id', 'type', 'asset?']; // title, abstract, asset,
					break;
				default:
					keys = ['id', 'type'];
			}
			keys.forEach(key => {
				switch (key) {
					case 'link?':
						const title = item.link ? item.link.title : null;
						const href = item.link ? item.link.href : null;
						const target = '_blank';
						form.add(new FormGroup({
							title: new FormControl(title),
							href: new FormControl(href),
							target
						}), 'link');
						break;
					case 'addAsset':
					case 'addLink':
						const addKey = key.substring(3, key.length).toLowerCase();
						console.log(addKey);
						const check = item[addKey] != null;
						form.add(new FormControl(check), key);
						break;
					default:
						const optional = key.indexOf('?') !== -1;
						key = key.replace('?', '');
						form.add(new FormControl(item[key], optional ? undefined : RequiredValidator()), key);
				}
			});
			this.controls = form.controls;
			// console.log(form.controls);
			if (keys.indexOf('viewId') !== -1) {
				EditorService.data$().pipe(
					first(),
				).subscribe(data => {
					this.controls.viewId.options = data.views.map(view => ({ id: view.id, name: view.name }));
					this.pushChanges();
				});
			}
		} else {
			Object.keys(this.controls).forEach(key => {
				switch (key) {
					case 'link':
						const title = item.link ? item.link.title : null;
						const href = item.link ? item.link.href : null;
						const target = '_blank';
						this.controls[key].value = { title, href, target };
						break;
					default:
						this.controls[key].value = item[key];
				}
			});
		}
	}

	onChanges(changes) {
		this.onUpdate();
	}

	onSubmit() {
		if (this.form.valid) {
			const payload = Object.assign({}, this.form.value);
			if (payload.link && (!payload.link.title || !payload.link.href)) {
				payload.link = null;
			}
			this.update.next({ view: this.view, item: new ViewItem(payload) });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ src: ModalSrcService.get('remove'), data: { item: this.item } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.delete.next({ view: this.view, item: this.item });
			}
		});
	}

	onSelect(event) {
		this.select.next({ view: this.view, item: this.item.selected ? null : this.item });
		/*
		this.item.active = !this.item.active;
		this.pushChanges();
		*/
	}

	getTitle(item) {
		return EditorLocale[item.type];
	}
}

UpdateViewItemComponent.meta = {
	selector: 'update-view-item',
	outputs: ['select', 'update', 'delete'],
	inputs: ['view', 'item'],
	template: /* html */`
		<div class="group--headline" [class]="{ active: item.selected }" (click)="onSelect($event)">
			<!-- <div class="id" [innerHTML]="item.id"></div> -->
			<div class="icon">
				<svg-icon [name]="item.type"></svg-icon>
			</div>
			<div class="title" [innerHTML]="getTitle(item)"></div>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="item.selected">
			<fieldset>
				<div control-text label="Id" [control]="controls.id" [disabled]="true"></div>
				<div control-text label="Type" [control]="controls.type" [disabled]="true"></div>
			</fieldset>
			<fieldset *if="item.type == 'nav'">
				<div control-text label="Title" [control]="controls.title"></div>
				<div control-text label="Abstract" [control]="controls.abstract"></div>
				<div control-select label="NavToView" [control]="controls.viewId"></div>
				<div control-vector label="Position" [control]="controls.position" [precision]="3"></div>
				<div control-asset label="Image" [control]="controls.asset" accept="image/jpeg, image/png"></div>
				<div control-text label="Link Title" [control]="controls.link.controls.title"></div>
				<div control-text label="Link Url" [control]="controls.link.controls.href"></div>
			</fieldset>
			<fieldset *if="item.type == 'plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector label="Scale" [control]="controls.scale" [precision]="2"></div>
				<div control-asset label="Image or Video" [control]="controls.asset" accept="image/jpeg, video/mp4"></div>
			</fieldset>
			<fieldset *if="item.type == 'curved-plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector label="Scale" [control]="controls.scale" [precision]="2"></div>
				<div control-asset label="Image or Video" [control]="controls.asset" accept="image/jpeg, video/mp4"></div>
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
