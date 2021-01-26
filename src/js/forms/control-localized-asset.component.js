import { getContext } from 'rxcomp';
import { combineLatest } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AssetService } from '../asset/asset.service';
import { DropService } from '../drop/drop.service';
import { environment } from '../environment';
import ControlComponent from './control.component';

export default class ControlLocalizedAssetComponent extends ControlComponent {

	get localizedValue() {
		let asset = this.control.value;
		if (asset && asset.locale) {
			const localizedAsset = asset.locale[this.currentLanguage];
			if (localizedAsset) {
				asset = localizedAsset;
			}
		}
		return asset;
	}

	get image() {
		let image = null;
		if (this.localizedValue) {
			image = `${this.localizedValue.folder}${this.localizedValue.file}`;
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
		this.languages = environment.languages;
		this.currentLanguage = environment.defaultLanguage;
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
					switchMap((uploads) => (this.languages.length > 1 ? AssetService.createOrUpdateLocalizedAsset$ : AssetService.createOrUpdateAsset$)(uploads, this.control, this.currentLanguage)),
				));
				return combineLatest(uploads$);
			}),
			takeUntil(this.unsubscribe$)
		).subscribe(assets => {
			// console.log('ControlLocalizedAssetComponent.change$', assets);
			this.control.value = assets[0];
		});
	}

	setLanguage(language) {
		this.currentLanguage = language;
		this.pushChanges();
	}
}

ControlLocalizedAssetComponent.meta = {
	selector: '[control-localized-asset]',
	inputs: ['control', 'label', 'disabled', 'accept'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="group--picture">
				<div class="group--picture__info">
					<span [innerHTML]="'browse' | label"></span>
				</div>
				<img [lazy]="localizedValue | asset" [size]="{ width: 320, height: 240 }" *if="localizedValue && localizedValue.type.name === 'image'" />
				<video [src]="localizedValue | asset" *if="localizedValue && localizedValue.type.name === 'video'"></video>
				<input type="file">
			</div>
			<div class="file-name" *if="localizedValue" [innerHTML]="localizedValue.file"></div>
			<ul class="nav--languages" *if="languages.length > 1">
				<li class="nav__item" [class]="{ active: lang == currentLanguage }" (click)="setLanguage(lang)" [innerHTML]="lang" *for="let lang of languages"></li>
			</ul>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
