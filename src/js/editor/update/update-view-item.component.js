import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../environment';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import { ViewItem, ViewItemType } from '../../view/view';
import { EditorLocale } from '../editor.locale';
import EditorService from '../editor.service';

export default class UpdateViewItemComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		const item = this.item;
		item.hasChromaKeyColor = (item.asset && item.asset.chromaKeyColor) ? true : false;
		this.onUpdate();
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewItemComponent.form.changes$', changes);
			this.onUpdateItem(changes);
			this.pushChanges();
		});
	}

	getAssetDidChange(changes) {
		const item = this.item;
		const itemAssetId = item.asset ? item.asset.id : null;
		const changesAssetId = changes.asset ? changes.asset.id : null;
		if (itemAssetId !== changesAssetId || item.hasChromaKeyColor !== changes.hasChromaKeyColor) {
			return true;
		} else {
			return false;
		}
	}

	onUpdateItem(changes) {
		const item = this.item;
		const assetDidChange = this.getAssetDidChange(changes);
		Object.assign(item, changes);
		if (item.asset) {
			item.asset.chromaKeyColor = item.hasChromaKeyColor ? [0.0,1.0,0.0] : null;
			if (assetDidChange) {
				EditorService.assetUpdate$(item.asset).pipe(
					switchMap(() => EditorService.inferItemUpdate$(this.view, item)),
					first()
				).subscribe();
				if (typeof item.onUpdateAsset === 'function') {
					item.onUpdateAsset();
				}
			}
		}
		if (typeof item.onUpdate === 'function') {
			item.onUpdate();
		}
	}

	onUpdate() {
		const item = this.item;
		const form = this.form;
		if (!this.type || this.type.name !== item.type.name) {
			this.type = item.type;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (item.type.name) {
				case ViewItemType.Nav.name:
					keys = ['id', 'type', 'title?', 'abstract?', 'viewId', 'keepOrientation?', 'position', 'asset?', 'link?'];
					break;
				case ViewItemType.Plane.name:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'asset?', 'hasChromaKeyColor?'];
					break;
				case ViewItemType.CurvedPlane.name:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'height', 'arc', 'asset?', 'hasChromaKeyColor?'];
					break;
				case ViewItemType.Texture.name:
					keys = ['id', 'type', 'asset?']; // asset, key no id!!
					break;
				case ViewItemType.Model.name:
					keys = ['id', 'type', 'asset?']; // title, abstract, asset,
					break;
				default:
					keys = ['id', 'type'];
			}
			keys.forEach(key => {
				const optional = key.indexOf('?') !== -1;
				key = key.replace('?', '');
				switch (key) {
					case 'link':
						const title = item.link ? item.link.title : null;
						const href = item.link ? item.link.href : null;
						const target = '_blank';
						form.add(new FormGroup({
							title: new FormControl(title),
							href: new FormControl(href),
							target
						}), 'link');
						break;
					default:
						const value = (item[key] != null ? item[key] : null);
						form.add(new FormControl(value, optional ? undefined : RequiredValidator()), key);
				}
			});
			this.controls = form.controls;
			if (keys.indexOf('viewId') !== -1) {
				EditorService.viewIdOptions$().pipe(
					first(),
				).subscribe(options => {
					this.controls.viewId.options = options;
					this.controls.viewId.value = this.controls.viewId.value || null;
					// console.log(this.controls.viewId.options, this.controls.viewId.value);
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
					case 'hasChromaKeyColor':
						this.controls[key].value = (item.asset && item.asset.chromaKeyColor) ? true : false;
						break;
					default:
						this.controls[key].value = (item[key] != null ? item[key] : null);
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
			this.update.next({ view: this.view, item: new ViewItem(payload) });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ src: environment.template.modal.remove, data: { item: this.item } }).pipe(
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
		return EditorLocale[item.type.name];
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
				<svg-icon [name]="item.type.name"></svg-icon>
			</div>
			<div class="title" [innerHTML]="getTitle(item)"></div>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="item.selected">
			<div class="form-controls">
				<div control-text label="Id" [control]="controls.id" [disabled]="true"></div>
				<!-- <div control-text label="Type" [control]="controls.type" [disabled]="true"></div> -->
			</div>
			<div class="form-controls" *if="item.type.name == 'nav'">
				<div control-text label="Title" [control]="controls.title"></div>
				<div control-text label="Abstract" [control]="controls.abstract"></div>
				<div control-custom-select label="NavToView" [control]="controls.viewId"></div>
				<!-- <div control-checkbox label="Keep Orientation" [control]="controls.keepOrientation"></div> -->
				<div control-vector label="Position" [control]="controls.position" [precision]="3"></div>
				<div control-asset label="Image" [control]="controls.asset" accept="image/jpeg, image/png"></div>
				<div control-text label="Link Title" [control]="controls.link.controls.title"></div>
				<div control-text label="Link Url" [control]="controls.link.controls.href"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector label="Scale" [control]="controls.scale" [precision]="2"></div>
				<div control-asset label="Image or Video" [control]="controls.asset" accept="image/jpeg, video/mp4"></div>
				<div control-checkbox label="Use Green Screen" [control]="controls.hasChromaKeyColor" *if="item.asset"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'curved-plane'">
				<div control-vector label="Position" [control]="controls.position" [precision]="1"></div>
				<div control-vector label="Rotation" [control]="controls.rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<!-- <div control-vector label="Scale" [control]="controls.scale" [precision]="2" [disabled]="true"></div> -->
				<div control-number label="Radius" [control]="controls.radius" [precision]="2"></div>
				<div control-number label="Height" [control]="controls.height" [precision]="2"></div>
				<div control-number label="Arc" [control]="controls.arc" [precision]="0"></div>
				<div control-asset label="Image or Video" [control]="controls.asset" accept="image/jpeg, video/mp4"></div>
				<div control-checkbox label="Use Green Screen" [control]="controls.hasChromaKeyColor" *if="item.asset"></div>
			</div>
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
