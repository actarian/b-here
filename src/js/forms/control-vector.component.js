import ControlComponent from './control.component';

export default class ControlVectorComponent extends ControlComponent {
	onInit() {
		this.label = 'vector';
		this.required = false;
	}
	get x() {
		return this.control.value[0];
	}
	get y() {
		return this.control.value[1];
	}
	get z() {
		return this.control.value[2];
	}
}

ControlVectorComponent.meta = {
	selector: '[control-vector]',
	inputs: ['control', 'label'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<label [innerHTML]="label"></label>
			<input type="text" class="control--text" [value]="x" [placeholder]="x" />
			<input type="text" class="control--text" [value]="y" [placeholder]="y" />
			<input type="text" class="control--text" [value]="z" [placeholder]="z" />
			<span class="required__badge">required</span>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
