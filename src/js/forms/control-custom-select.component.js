import { getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import DropdownDirective from '../dropdown/dropdown.directive';
import KeyboardService from '../keyboard/keyboard.service';
import ControlComponent from './control.component';

export default class ControlCustomSelectComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
		this.dropped = false;
		this.dropdownId = DropdownDirective.nextId();
		KeyboardService.typing$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(word => {
			this.scrollToWord(word);
		});
		/*
		KeyboardService.key$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(key => {
			this.scrollToKey(key);
		});
		*/
	}

	/*
	onChanges() {
		// console.log('ControlCustomSelectComponent.onChanges');
	}
	*/

	scrollToWord(word) {
		// console.log('ControlCustomSelectComponent.scrollToWord', word);
		const items = this.control.options || [];
		let index = -1;
		for (let i = 0; i < items.length; i++) {
			const x = items[i];
			if (x.name.toLowerCase().indexOf(word.toLowerCase()) === 0) {
				// console.log(word, x.name);
				index = i;
				break;
			}
		}
		if (index !== -1) {
			const { node } = getContext(this);
			const dropdown = node.querySelector('.dropdown');
			const navDropdown = node.querySelector('.nav--dropdown');
			const item = navDropdown.children[index];
			if (item) {
				dropdown.scrollTo(0, item.offsetTop);
			}
		}
	}

	setOption(item) {
		// console.log('setOption', item, this.isMultiple);
		let value;
		if (this.isMultiple) {
			const value = this.control.value || [];
			const index = value.indexOf(item.id);
			if (index !== -1) {
				// if (value.length > 1) {
				value.splice(index, 1);
				// }
			} else {
				value.push(item.id);
			}
			value = value.length ? value.slice() : null;
		} else {
			value = item.id;
			// DropdownDirective.dropdown$.next(null);
		}
		this.control.value = value;
		this.change.next(value);
	}

	hasOption(item) {
		if (this.isMultiple) {
			const values = this.control.value || [];
			return values.indexOf(item.id) !== -1;
		} else {
			return this.control.value === item.id;
		}
	}

	getLabel() {
		let value = this.control.value;
		const items = this.control.options || [];
		if (this.isMultiple) {
			value = value || [];
			if (value.length) {
				return value.map(v => {
					const item = items.find(x => x.id === v || x.name === v);
					return item ? item.name : '';
				}).join(', ');
			} else {
				return 'select'; // LabelPipe.transform('select');
			}
		} else {
			const item = items.find(x => x.id === value || x.name === value);
			if (item) {
				return item.name;
			} else {
				return 'select'; // LabelPipe.transform('select');
			}
		}
	}

	onDropped($event) {
		// console.log('ControlCustomSelectComponent.onDropped', id);
		if (this.dropped && $event === null) {
			this.control.touched = true;
		}
		this.dropped = $event === this.dropdownId;
	}

	get isMultiple() {
		return this.multiple && this.multiple !== false && this.multiple !== 'false';
	}
}

ControlCustomSelectComponent.meta = {
	selector: '[control-custom-select]',
	outputs: ['change'],
	inputs: ['control', 'label', 'multiple'],
	template: /* html */ `
		<div class="group--form--select" [class]="{ required: control.validators.length, multiple: isMultiple }" [dropdown]="dropdownId" (dropped)="onDropped($event)">
			<label [innerHTML]="label"></label>
			<span class="control--custom-select" [innerHTML]="getLabel() | label"></span>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
		<div class="dropdown" [dropdown-item]="dropdownId">
			<div class="category" [innerHTML]="label"></div>
			<ul class="nav--dropdown" [class]="{ multiple: isMultiple }">
				<li (click)="setOption(item)" [class]="{ empty: item.id == null }" *for="let item of control.options">
					<span [class]="{ active: hasOption(item) }" [innerHTML]="item.name | label"></span>
				</li>
			</ul>
		</div>
	`
};
