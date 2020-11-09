import { getContext } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { UploadAssetEvent, UploadService } from '../upload/upload.service';
import ControlComponent from './control.component';

export default class ControlAssetsComponent extends ControlComponent {

	get items() {
		return this.items_;
	}
	set items(items) {
		this.items_ = items;
		this.uploadCount = items.reduce((p, c) => {
			return p + (c.uploading || c.completed ? 0 : 1);
		}, 0);
	}

	onInit() {
		this.label = this.label || 'label';
		this.accept = this.accept || 'image/png, image/jpeg';
		this.multiple = (this.multiple !== false);
		this.items = [];
		this.assets = this.control.value || [];
		this.hasFiles = false;
		const { node } = getContext(this);
		const input = node.querySelector('input');
		input.setAttribute('accept', this.accept);
		const dropArea = node.querySelector('.upload-drop');
		const service = this.service = new UploadService();
		service.drop$(input, dropArea).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(items => {
			// console.log('ControlAssetComponent.drop$', items);
			this.items = items;
			this.pushChanges();
		});
		service.change$(input).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(items => {
			// console.log('ControlAssetComponent.change$', items);
			this.items = items;
			this.pushChanges();
		});
		service.events$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('ControlAssetComponent.events$', event);
			if (event instanceof UploadAssetEvent) {
				this.assets.push(event.asset);
				this.control.value = this.assets;
			}
			this.items = this.items;
			this.pushChanges();
			// this.control.value = assets;
		});
	}

	onUpload() {
		// console.log('ControlAssetsComponent.onUpload');
		this.service.upload$().pipe(
			first(),
		).subscribe();
	}

	onCancel() {
		// console.log('ControlAssetsComponent.onCancel');
		this.service.removeAll();
	}

	onItemPause(item) {
		// console.log('ControlAssetsComponent.onPause', item);
	}

	onItemResume(item) {
		// console.log('ControlAssetsComponent.onResume', item);
	}

	onItemCancel(item) {
		// console.log('ControlAssetsComponent.onCancel', item);
	}

	onItemRemove(item) {
		// console.log('ControlAssetsComponent.onRemove', item);
		this.service.remove(item);
	}
}

ControlAssetsComponent.meta = {
	selector: '[control-assets]',
	inputs: ['control', 'label', 'multiple'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="listing--assets">
				<div class="listing__item" *for="let item of assets">
					<div class="upload-item">
						<div class="picture">
							<img [lazy]="item | asset" [size]="{ width: 320, height: 240 }" *if="item.type.name === 'image'" />
							<video [src]="item | asset" *if="item.type.name === 'video'"></video>
						</div>
						<div class="name" [innerHTML]="item.file"></div>
					</div>
				</div>
				<div class="listing__item" *for="let item of items">
					<div upload-item [item]="item" (pause)="onItemPause($event)" (resume)="onItemResume($event)" (cancel)="onItemCancel($event)" (remove)="onItemRemove($event)"></div>
				</div>
			</div>
			<div class="group--cta">
				<div class="btn--browse">
					<span [innerHTML]="'browse' | label"></span>
					<input type="file" accept="image/jpeg" multiple />
				</div>
				<div class="btn--upload" (click)="onUpload()" *if="uploadCount > 0" [innerHTML]="'upload' | label"></div>
				<div class="btn--cancel" (click)="onCancel()" *if="uploadCount > 0" [innerHTML]="'cancel' | label"></div>
			</div>
			<div class="upload-drop">
    			<span [innerHTML]="'drag_and_drop_images' | label"></span>
			</div>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
