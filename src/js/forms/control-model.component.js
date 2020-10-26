import { getContext } from 'rxcomp';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
		this.change$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(assets => {
			console.log('ControlModelComponent.change$', assets);
			this.control.value = assets[0];
		});
	}

	onRemove(event) {
		this.control.value = null;
		this.input.value = null;
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
				<span class="required__badge">required</span>
			</div>
			<div class="group--model">
				<div class="file-name" *if="!control.value">Seleziona un file</div>
				<div class="file-name" *if="control.value" [innerHTML]="control.value.file"></div>
				<div class="btn--upload"><input type="file"><span>browse</span></div>
				<div class="btn--remove" *if="control.value" (click)="onRemove($event)"><span>remove</span></div>
			</div>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
