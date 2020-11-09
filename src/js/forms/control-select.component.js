import ControlComponent from './control.component';

export default class ControlSelectComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
	}

}

ControlSelectComponent.meta = {
	selector: '[control-select]',
	inputs: ['control', 'label'],
	template: /* html */ `
		<div class="group--form--select" [class]="{ required: control.validators.length }">
			<label [innerHTML]="label"></label>
			<select class="control--select" [formControl]="control" required>
				<option [value]="null" [innerHTML]="'select' | label"></option>
				<option [value]="item.id" *for="let item of control.options" [innerHTML]="item.name"></option>
			</select>
			<span class="required__badge" [innerHTML]="'required' | label"></span>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
