import ControlComponent from './control.component';

export default class ControlLinkComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
		const { node } = getContext(this);
		const input = this.input = node.querySelector('input');
		merge(fromEvent(input, 'input')).pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onInputDidChange(event));
		fromEvent(input, 'blur').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onInputDidBlur(event));
	}

	onInputDidChange(event) {
		// console.log('ControlLinkComponent.onInputDidChange', event.target.value);
	}

	onInputDidBlur(event) {
		// console.log('ControlLinkComponent.onInputDidBlur', event.target.value);
		this.control.touched = true;
		this.value = this.input.value;
	}

}

ControlLinkComponent.meta = {
	selector: '[control-link]',
	inputs: ['control', 'label', 'disabled'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<label [innerHTML]="label"></label>
			<input type="text" class="control--text" [formControl]="control" [placeholder]="label" [disabled]="disabled" />
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
