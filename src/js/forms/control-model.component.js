import { getContext } from 'rxcomp';
import { combineLatest, of } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { AssetService } from '../asset/asset.service';
import { DropService } from '../drop/drop.service';
import ControlAssetComponent from './control-asset.component';

export default class ControlModelComponent extends ControlAssetComponent {

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
		this.accept = this.accept || '.glb';
		const { node } = getContext(this);
		const input = this.input = node.querySelector('input');
		input.setAttribute('accept', this.accept);
		/*
		this.click$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		*/
		DropService.change$(input).pipe(
			switchMap((files) => {
				const uploads$ = files.map((file, i) => AssetService.upload$([file]).pipe(
					switchMap((uploads) => AssetService.createOrUpdateAsset$(uploads, this.control)),
				));
				return combineLatest(uploads$);
			}),
			takeUntil(this.unsubscribe$),
		).subscribe(assets => {
			// console.log('ControlModelComponent.change$', assets);
			this.control.value = assets[0];
		});
	}

	onRemove(event) {
		AssetService.assetDelete$(this.control.value).pipe(
			first(),
		).subscribe(() => {
			this.control.value = null;
			this.input.value = null;
			this.control.touched = true; // !!!
		});
		// !!! delete upload
		// !!! delete asset
	}

	/*
	click$(input) {
		if (isPlatformBrowser && input) {
			return fromEvent(input, 'click').pipe(
				tap(() => input.value = null),
			);
		} else {
			return EMPTY;
		}
	}
	*/

	read$(file, i) {
		return of(file);
	}
}

ControlModelComponent.meta = {
	selector: '[control-model]',
	inputs: ['control', 'label', 'disabled', 'accept'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="group--model">
				<div class="file-name" *if="!control.value" [innerHTML]="'select_file' | label"></div>
				<div class="file-name" *if="control.value" [innerHTML]="control.value.file"></div>
				<div class="btn--upload"><input type="file"><span [innerHTML]="'browse' | label"></span></div>
				<div class="btn--remove" *if="control.value" (click)="onRemove($event)"><span [innerHTML]="'remove' | label"></span></div>
			</div>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
