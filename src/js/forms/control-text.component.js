import ControlComponent from './control.component';

export default class ControlTextComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
	}

}

ControlTextComponent.meta = {
	selector: '[control-text]',
	inputs: ['control', 'label', 'disabled'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<label [innerHTML]="label"></label>
			<span class="required__badge" [innerHTML]="'required' | label"></span>
			<input type="text" class="control--text" [formControl]="control" [placeholder]="label" [disabled]="disabled" />
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
