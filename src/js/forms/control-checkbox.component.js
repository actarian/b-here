import { getContext } from 'rxcomp';
import { EMPTY, fromEvent, ReplaySubject } from 'rxjs';
import { first, switchAll, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { GenericModalComponent } from '../generic/generic-modal.component';
import { ModalService } from '../modal/modal.service';
import ControlComponent from './control.component';

export default class ControlCheckboxComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
		this.linksSubject = new ReplaySubject();
		this.links$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe();
	}

	onChanges() {
		const { node } = getContext(this);
		const links = Array.prototype.slice.call(node.querySelectorAll('a'));
		// console.log('ControlCheckboxComponent.onChanges', links);
		this.linksSubject.next(links.length ? fromEvent(links, 'click') : EMPTY);
	}

	links$() {
		const linksSubject = this.linksSubject.pipe(
			switchAll(),
			tap(event => {
				// console.log(event);
				if (environment.flags.gdprRoutes) {
					const template = GenericModalComponent.chunk();
					ModalService.open$({ template, data: { mode: 'privacy_policy' } }).pipe(
						first(),
					).subscribe();
					event.preventDefault();
				}
			}),
		);
		return linksSubject;
	}

}

ControlCheckboxComponent.meta = {
	selector: '[control-checkbox]',
	inputs: ['control', 'label'],
	template: /* html */ `
		<div class="group--form--checkbox" [class]="{ required: control.validators.length }">
			<label>
				<input type="checkbox" class="control--checkbox" [formControl]="control" [value]="true" />
				<span [innerHTML]="label | html"></span>
			</label>
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
