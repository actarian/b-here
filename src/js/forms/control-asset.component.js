import { getContext } from 'rxcomp';
import { combineLatest } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AssetService } from '../asset/asset.service';
import { DropService } from '../drop/drop.service';
import ControlComponent from './control.component';

export default class ControlAssetComponent extends ControlComponent {

	get image() {
		let image = null;
		if (this.control.value) {
			image = `${this.control.value.folder}${this.control.value.file}`;
		} else if (this.previews && this.previews.length) {
			image = this.previews[0];
		}
		return image;
	}

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
		this.accept = this.accept || 'image/png, image/jpeg';
		this.previews = [];
		const { node } = getContext(this);
		const input = node.querySelector('input');
		input.setAttribute('accept', this.accept);
		DropService.drop$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		DropService.change$(input).pipe(
			switchMap((files) => {
				// this.previews.length = files.length;
				// this.previews.fill(null);
				this.previews = files.map(() => null);
				const uploads$ = files.map((file, i) => DropService.read$(file, i).pipe(
					tap((resized) => {
						this.previews[i] = resized;
						this.pushChanges();
					}),
					switchMap(() => AssetService.upload$([file])),
					switchMap((uploads) => AssetService.createOrUpdateAsset$(uploads, this.control)),
				));
				return combineLatest(uploads$);
			}),
			takeUntil(this.unsubscribe$)
		).subscribe(assets => {
			// console.log('ControlAssetComponent.change$', assets);
			this.control.value = assets[0];
		});
	}
}

ControlAssetComponent.meta = {
	selector: '[control-asset]',
	inputs: ['control', 'label', 'disabled', 'accept'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="group--picture">
				<div class="group--picture__info">
					<!-- <svg class="icon--image"><use xlink:href="#image"></use></svg> -->
					<span [innerHTML]="'browse' | label"></span>
				</div>
				<img [lazy]="control.value | asset" [size]="{ width: 320, height: 240 }" *if="control.value && control.value.type.name === 'image'" />
				<video [src]="control.value | asset" *if="control.value && control.value.type.name === 'video'"></video>
				<input type="file">
			</div>
			<div class="file-name" *if="control.value" [innerHTML]="control.value.file"></div>
			<!--
			<input type="text" class="control--text" [formControl]="control" [placeholder]="label" [disabled]="disabled" />
			-->
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
