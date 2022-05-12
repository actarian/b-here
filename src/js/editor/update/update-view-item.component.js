import { Component } from 'rxcomp';
import { FormArray, FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AssetGroupType, assetGroupTypeFromItem, assetPayloadFromGroupTypeId, AssetType } from '../../asset/asset';
import { AssetService } from '../../asset/asset.service';
import { environment } from '../../environment';
import { LabelPipe } from '../../label/label.pipe';
import { ModalResolveEvent, ModalService } from '../../modal/modal.service';
import { ViewItem, ViewItemType, ViewType } from '../../view/view';
import { WebhookService } from '../../webhook/webhook.service';
import { EditorService } from '../editor.service';
import RemoveModalComponent from '../modals/remove-modal.component';

export default class UpdateViewItemComponent extends Component {

	onInit() {
		this.busy = false;
		this.active = false;
		this.useHooks = WebhookService.enabled;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		const item = this.item;
		this.originalItem = Object.assign({}, item);
		item.hasChromaKeyColor = (item.asset && item.asset.chromaKeyColor) ? true : false;
		item.autoplay = (item.asset && item.asset.type.name === AssetType.Video.name) ? item.asset.autoplay : undefined;
		item.loop = (item.asset && item.asset.type.name === AssetType.Video.name) ? item.asset.loop : undefined;
		item.assetType = assetGroupTypeFromItem(item).id;
		this.doUpdateForm();
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewItemComponent.form.changes$', changes);
			this.doUpdateItem(changes);
			this.pushChanges();
		});
	}

	getFlagsDidChange(item, changes) {
		const flags = ['hasChromaKeyColor', 'autoplay', 'loop'];
		return flags.reduce((p, c) => {
			const a = changes[c] || false;
			const b = item[c] || false;
			// console.log(c, a, b);
			return p || (a !== b);
		}, false);
	}

	getAssetDidChange(item, changes) {
		// console.log('UpdateViewItemComponent.getAssetDidChange', item.asset, changes.asset);
		return AssetService.assetDidChange(item.asset, changes.asset);
	}

	doUpdateItem(changes) {
		const item = this.item;
		const assetDidChange = this.getAssetDidChange(item, changes);
		const flagsDidChange = this.getFlagsDidChange(item, changes);
		// console.log('UpdateViewItemCompoent.doUpdateItem', 'assetDidChange', assetDidChange, 'flagsDidChange', flagsDidChange);
		Object.assign(item, changes);
		if (item.asset) {
			item.asset.chromaKeyColor = item.hasChromaKeyColor ? [0.0, 1.0, 0.0] : null;
			item.asset.autoplay = item.autoplay;
			item.asset.loop = item.loop;
		}
		if (assetDidChange || flagsDidChange) {
			const asset$ = item.asset ? AssetService.assetUpdate$(item.asset) : of(null);
			asset$.pipe(
				switchMap(() => EditorService.inferItemUpdate$(this.view, item)),
				first()
			).subscribe();
			// !!! create indices for nextAttendeeStream
			this.view.updateIndices(this.view.items);
			if (typeof item.onUpdateAsset === 'function') {
				item.onUpdateAsset();
			}
		}
		if (typeof item.onUpdate === 'function') {
			item.onUpdate();
		}
	}

	doUpdateForm() {
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
					if (this.useHooks) {
						keys = ['id', 'type', 'title?', 'abstract?', 'viewId?', 'hook?', 'hookExtra?', 'keepOrientation?', 'important?', 'transparent?', 'position', 'rotation', 'scale', 'asset?', 'link?', 'links?'];
					} else {
						keys = ['id', 'type', 'title?', 'abstract?', 'viewId?', 'keepOrientation?', 'important?', 'transparent?', 'position', 'rotation', 'scale', 'asset?', 'link?', 'links?'];
					}
					break;
				case ViewItemType.Plane.name:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?'];
					break;
				case ViewItemType.CurvedPlane.name:
					keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'height', 'arc', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?'];
					break;
				case ViewItemType.Texture.name:
					keys = ['id', 'type', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?']; // asset, key no id!!
					break;
				case ViewItemType.Model.name:
					if (this.view.type.name === ViewType.Model) {
						keys = ['id', 'type', 'asset?'];
					} else {
						keys = ['id', 'type', 'position', 'rotation', 'asset?'];
					}
					break;
				default:
					keys = ['id', 'type'];
			}
			keys.forEach(key => {
				const optional = key.indexOf('?') !== -1;
				key = key.replace('?', '');
				const value = (item[key] != null ? item[key] : null);
				let control;
				switch (key) {
					case 'viewId':
						control = new FormControl(value, optional ? undefined : RequiredValidator());
						EditorService.viewIdOptions$().pipe(
							first(),
						).subscribe(options => {
							control.options = options;
							control.value = control.value || null;
							this.pushChanges();
						});
						break;
					case 'hook':
						control = new FormControl(value, optional ? undefined : RequiredValidator());
						if (WebhookService.enabled) {
							const options = environment.webhook.methods.nav.map(x => ({ id: x, name: x }));
							options.unshift({ id: null, name: 'select' });
							control.options = options;
						}
						control.value = control.value || null;
						this.pushChanges();
						break;
					case 'assetType':
						control = new FormControl(value, optional ? undefined : RequiredValidator());
						control.options = Object.keys(AssetGroupType).map(x => AssetGroupType[x]);
						// console.log(control.options);
						break;
					case 'link':
						/*
						const title = item.link ? item.link.title : null;
						const href = item.link ? item.link.href : null;
						const target = '_blank';
						control = new FormGroup({
							title: new FormControl(title),
							href: new FormControl(href),
							target
						});
						*/
						break;
					case 'links':
						const links = item.links;
						control = new FormArray(links.map(link => new FormGroup({
							title: new FormControl(link.title),
							href: new FormControl(link.href),
							target: '_blank',
						})));
						break;
					default:
						control = new FormControl(value, optional ? undefined : RequiredValidator());
				}
				form.add(control, key);
			});
			this.controls = form.controls;
		} else {
			Object.keys(this.controls).forEach(key => {
				switch (key) {
					case 'link':
						/*
						const title = item.link ? item.link.title : null;
						const href = item.link ? item.link.href : null;
						const target = '_blank';
						this.controls[key].value = { title, href, target };
						*/
						break;
					case 'links':
						const links = item.links.map(link => ({
							title: link.title || null,
							href: link.href || null,
							target: '_blank',
						}));
						const formArray = this.controls[key];
						while (formArray.controls.length > links.length) {
							formArray.remove(formArray.controls[formArray.controls.length - 1]);
						}
						while (formArray.controls.length < links.length) {
							formArray.push(new FormGroup({
								title: new FormControl(null),
								href: new FormControl(null),
								target: '_blank',
							}));
						}
						// console.log(formArray, links);
						formArray.patch(links);
						break;
					case 'hasChromaKeyColor':
						this.controls[key].value = (item.asset && item.asset.chromaKeyColor) ? true : false;
						break;
					case 'autoplay':
						this.controls[key].value = (item.asset && item.asset.autoplay) ? true : false;
						break;
					case 'loop':
						this.controls[key].value = (item.asset && item.asset.loop) ? true : false;
						break;
					case 'assetType':
						this.controls[key].value = assetGroupTypeFromItem(item).id;
						break;
					default:
						this.controls[key].value = (item[key] != null ? item[key] : null);
				}
			});
		}
	}

	onAssetTypeDidChange(assetType) {
		const item = this.item;
		const currentType = assetGroupTypeFromItem(item).id;
		// console.log('UpdateViewItemComponent.onAssetTypeDidChange', assetType, currentType);
		if (assetType !== currentType) {
			item.assetType = assetType;
			let asset$ = of(null); // AssetService.assetDelete$(item.asset);
			if (assetType !== AssetGroupType.ImageOrVideo.id) {
				asset$ = asset$.pipe(
					switchMap(() => {
						const asset = assetPayloadFromGroupTypeId(assetType);
						return AssetService.assetCreate$(asset);
					}),
				)
			}
			asset$.pipe(
				first()
			).subscribe(asset => {
				// console.log('UpdateViewItemComponent.asset$', asset);
				this.controls.asset.value = asset;
			});
			/*
			asset$.pipe(
				tap(asset => {
					item.asset = asset;
					if (typeof item.onUpdateAsset === 'function') {
						item.onUpdateAsset();
					}
				}),
				switchMap(() => EditorService.inferItemUpdate$(this.view, item)),
				first()
			).subscribe();
			*/
		}
	}

	onChanges(changes) {
		// console.log('UpdateViewItemComponent.onChanges', changes);
		this.doUpdateForm();
	}

	onSubmit() {
		if (!this.busy && this.form.valid) {
			this.busy = true;
			this.pushChanges();
			const changes = this.form.value;
			const payload = Object.assign({}, changes);
			if (this.item.type.name === ViewItemType.Nav.name) {
				payload.viewId = payload.viewId || this.view.id;
			}
			const view = this.view;
			const item = new ViewItem(payload);
			EditorService.inferItemUpdate$(view, item).pipe(
				first(),
			).subscribe(response => {
				// console.log('UpdateViewItemComponent.onSubmit.inferItemUpdate$.success', response);
				EditorService.inferItemUpdateResult$(view, item);
				this.update.next({ view, item });
				this.setTimeout(() => {
					this.busy = false;
					this.pushChanges();
				});
			}, error => console.log('UpdateViewItemComponent.onSubmit.inferItemUpdate$.error', error));
			// this.update.next({ view: this.view, item: new ViewItem(payload) });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ template: RemoveModalComponent.chunk(), data: { item: this.item } }).pipe(
			first(),
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
		return LabelPipe.getKeys('editor', item.type.name);
	}

	onAddLink(event) {
		this.controls.links.push(new FormGroup({
			title: new FormControl(null),
			href: new FormControl(null),
			target: '_blank',
		}));
	}

	onRemoveLink(item) {
		this.controls.links.remove(item);
	}

	clearTimeout() {
		if (this.to) {
			clearTimeout(this.to);
		}
	}

	setTimeout(callback, msec = 300) {
		this.clearTimeout();
		if (typeof callback === 'function') {
			this.to = setTimeout(callback, msec);
		}
	}

	onDestroy() {
		this.clearTimeout();
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
				<div control-text [control]="controls.id" label="Id" [disabled]="true"></div>
				<!-- <div control-text [control]="controls.type" label="Type" [disabled]="true"></div> -->
			</div>
			<div class="form-controls" *if="item.type.name == 'nav'">
				<div control-text [control]="controls.title" label="Title"></div>
				<div control-textarea [control]="controls.abstract" label="Abstract"></div>
				<div control-custom-select [control]="controls.viewId" label="NavToView"></div>
				<div control-checkbox [control]="controls.keepOrientation" label="Keep Orientation"></div>
				<div control-checkbox [control]="controls.important" label="Important"></div>
				<div control-checkbox [control]="controls.transparent" label="Transparent"></div>
				<div control-vector [control]="controls.position" label="Position" [precision]="3"></div>
				<div *if="controls.transparent.value == true">
					<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360"></div>
					<div control-vector [control]="controls.scale" label="Scale" [precision]="2"></div>
				</div>
				<div control-localized-asset [control]="controls.asset" label="Image" accept="image/jpeg, image/png"></div>

				<div class="group--link" *for="let link of controls.links.controls">
					<div class="group--controls">
						<div control-text [control]="link.controls.title" label="Link Title"></div>
						<div control-text [control]="link.controls.href" label="Link Url"></div>
					</div>
					<button type="button" class="btn--remove" (click)="onRemoveLink(link)"><svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#remove"></use></svg></button>
				</div>

				<div class="group--cta">
					<button type="button" class="btn--update" (click)="onAddLink($event)">
						<span>Add Link</span>
					</button>
				</div>

				<div *if="useHooks">
					<div control-custom-select [control]="controls.hook" label="Hook"></div>
					<div control-text [control]="controls.hookExtra" label="Hook Extra"></div>
				</div>
			</div>
			<div class="form-controls" *if="item.type.name == 'plane' && view.type.name != 'media'">
				<div control-vector [control]="controls.position" label="Position" [precision]="2"></div>
				<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<div control-vector [control]="controls.scale" label="Scale" [precision]="2"></div>
				<div control-custom-select [control]="controls.assetType" label="Asset" (change)="onAssetTypeDidChange($event)"></div>
				<div control-localized-asset [control]="controls.asset" label="Localized Image or Video" accept="image/jpeg, video/mp4" *if="controls.assetType.value == 1"></div>
				<div control-checkbox [control]="controls.hasChromaKeyColor" label="Use Green Screen" *if="item.asset"></div>
				<div control-checkbox [control]="controls.autoplay" label="Autoplay" *if="item.asset && item.asset.type.name === 'video'"></div>
				<div control-checkbox [control]="controls.loop" label="Loop" *if="item.asset && item.asset.type.name === 'video'"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'plane' && view.type.name == 'media'">
				<div control-vector [control]="controls.scale" label="Scale" [precision]="2"></div>
				<div control-localized-asset [control]="controls.asset" label="Localized Image or Video" accept="image/jpeg, video/mp4"></div>
				<div control-checkbox [control]="controls.autoplay" label="Autoplay" *if="item.asset && item.asset.type.name === 'video'"></div>
				<div control-checkbox [control]="controls.loop" label="Loop" *if="item.asset && item.asset.type.name === 'video'"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'curved-plane'">
				<div control-vector [control]="controls.position" label="Position" [precision]="2"></div>
				<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360"></div>
				<!-- <div control-vector [control]="controls.scale" label="Scale" [precision]="2" [disabled]="true"></div> -->
				<div control-number [control]="controls.radius" label="Radius" [precision]="2"></div>
				<div control-number [control]="controls.height" label="Height" [precision]="2"></div>
				<div control-number [control]="controls.arc" label="Arc" [precision]="0"></div>
				<div control-custom-select [control]="controls.assetType" label="Asset" (change)="onAssetTypeDidChange($event)"></div>
				<div control-localized-asset [control]="controls.asset" label="Image or Video" accept="image/jpeg, video/mp4" *if="controls.assetType.value == 1"></div>
				<div control-checkbox [control]="controls.hasChromaKeyColor" label="Use Green Screen" *if="item.asset"></div>
				<div control-checkbox [control]="controls.autoplay" label="Autoplay" *if="item.asset && item.asset.type.name === 'video'"></div>
				<div control-checkbox [control]="controls.loop" label="Loop" *if="item.asset && item.asset.type.name === 'video'"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'texture'">
				<div control-custom-select [control]="controls.assetType" label="Asset" (change)="onAssetTypeDidChange($event)"></div>
				<div control-localized-asset [control]="controls.asset" label="Image or Video" accept="image/jpeg, video/mp4" *if="controls.assetType.value == 1"></div>
				<div control-checkbox [control]="controls.hasChromaKeyColor" label="Use Green Screen" *if="item.asset"></div>
				<div control-checkbox [control]="controls.autoplay" label="Autoplay" *if="item.asset && item.asset.type.name === 'video'"></div>
				<div control-checkbox [control]="controls.loop" label="Loop" *if="item.asset && item.asset.type.name === 'video'"></div>
			</div>
			<div class="form-controls" *if="item.type.name == 'model'">
				<div control-vector [control]="controls.position" label="Position" [precision]="2" *if="view.type.name !== 'model'"></div>
				<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360" *if="view.type.name !== 'model'"></div>
				<div control-model [control]="controls.asset" label="Model (.glb)" accept=".glb"></div>
			</div>
			<div class="group--cta">
				<button type="submit" class="btn--update" [class]="{ busy: busy }">
					<span [innerHTML]="'update' | label"></span>
				</button>
				<button type="button" class="btn--remove" (click)="onRemove($event)">
					<span [innerHTML]="'remove' | label"></span>
				</button>
			</div>
		</form>
	`,
};
