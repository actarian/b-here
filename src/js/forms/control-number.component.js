import ControlComponent from './control.component';

export default class ControlNumberComponent extends ControlComponent {
	onInit() {
		this.label = this.label || 'label';
		this.precision = this.precision || 3;
		this.increment = this.increment || 1 / Math.pow(10, this.precision);
		this.disabled = this.disabled || false;
	}
	updateValue(value) {
		this.control.value = value;
	}
}

ControlNumberComponent.meta = {
	selector: '[control-number]',
	inputs: ['control', 'label', 'precision', 'increment', 'disabled'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="control--content control--number">
				<input-value label="" [precision]="precision" [increment]="increment" [disabled]="disabled" [value]="control.value" (update)="updateValue($event)"></input-value>
			</div>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
