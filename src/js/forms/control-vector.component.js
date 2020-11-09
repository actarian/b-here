import ControlComponent from './control.component';

export default class ControlVectorComponent extends ControlComponent {
	onInit() {
		this.label = this.label || 'label';
		this.precision = this.precision || 3;
		this.increment = this.increment || 1 / Math.pow(10, this.precision);
		this.disabled = this.disabled || false;
	}
	updateValue(index, value) {
		const values = this.control.value;
		values[index] = value;
		this.control.value = values.slice();
	}
}

ControlVectorComponent.meta = {
	selector: '[control-vector]',
	inputs: ['control', 'label', 'precision', 'increment', 'disabled'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="control--content control--vector">
				<input-value label="x" [precision]="precision" [increment]="increment" [disabled]="disabled" [value]="control.value[0]" (update)="updateValue(0, $event)"></input-value>
				<input-value label="y" [precision]="precision" [increment]="increment" [disabled]="disabled" [value]="control.value[1]" (update)="updateValue(1, $event)"></input-value>
				<input-value label="z" [precision]="precision" [increment]="increment" [disabled]="disabled" [value]="control.value[2]" (update)="updateValue(2, $event)"></input-value>
			</div>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
