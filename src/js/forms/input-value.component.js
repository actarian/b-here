import { Component, getContext } from 'rxcomp';
import { fromEvent, interval, race } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

export default class InputValueComponent extends Component {
	onInit() {
		this.label = this.label || 'label';
		this.precision = this.precision || 3;
		this.increment = this.increment || 1 / Math.pow(10, this.precision);
		this.disabled = this.disabled || false;
		this.increment$('.btn--more', 1)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((event) => {
				// console.log('InputValueComponent.increment$', event);
				this.value += event;
				this.change.next(this.value);
				this.pushChanges();
			});
		this.increment$('.btn--less', -1)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((event) => {
				// console.log('InputValueComponent.increment$', event);
				this.value += event;
				this.change.next(this.value);
				this.pushChanges();
			});
	}
	increment$(selector, sign) {
		const { node } = getContext(this);
		const element = node.querySelector(selector);
		let m, increment;
		return race(fromEvent(element, 'mousedown'), fromEvent(element, 'touchstart')).pipe(
			tap(() => {
				increment = this.increment;
				m = 32;
			}),
			switchMap((e) => {
				return interval(30).pipe(
					filter((i) => {
						return i % m === 0;
					}),
					map(() => {
						const i = increment * sign;
						// increment = Math.min(this.increment * 100, increment * 2);
						m = Math.max(1, Math.floor(m * 0.85));
						return i;
					}),
					// startWith(increment * sign),
					takeUntil(race(fromEvent(element, 'mouseup'), fromEvent(element, 'touchend')))
				);
			})
		);
	}
	getValue() {
		return this.value.toFixed(this.precision);
	}
	setValue(sign) {
		this.value += this.increment * sign;
		this.change.next(this.value);
		this.pushChanges();
	}
}

InputValueComponent.meta = {
	selector: 'input-value',
	outputs: ['change'],
	inputs: ['value', 'label', 'precision', 'increment', 'disabled'],
	template: /* html */ `
		<div class="group--control" [class]="{ disabled: disabled }">
			<input type="text" class="control--text" [value]="getValue()" [placeholder]="label" [disabled]="disabled" />
			<div class="control--trigger">
				<div class="btn--more" (click)="setValue(1)">+</div>
				<div class="btn--less" (click)="setValue(-1)">-</div>
			</div>
		</div>
	`
};
