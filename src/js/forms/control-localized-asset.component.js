import { getContext } from 'rxcomp';
import { combineLatest } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { AssetService } from '../asset/asset.service';
import { DropService } from '../drop/drop.service';
import { environment } from '../environment';
import { LanguageService } from '../language/language.service';
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

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
		this.accept = this.accept || 'image/png, image/jpeg';
		this.languages = environment.languages;
		this.currentLanguage = LanguageService.lang;
		const { node } = getContext(this);
		const input = node.querySelector('input');
		input.setAttribute('accept', this.accept);
		DropService.drop$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		DropService.change$(input).pipe(
			switchMap((files) => {
				const uploads$ = files.map((file, i) => AssetService.upload$([file]).pipe(
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
		LanguageService.setLanguage$(language).pipe(
			first(),
		).subscribe(_ => {
			this.currentLanguage = language;
			this.pushChanges();
		});
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
