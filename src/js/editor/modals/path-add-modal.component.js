import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import { ModalService } from '../../modal/modal.service';
import PathService from '../path/path.service';

export default class PathAddModalComponent extends Component {

	onInit() {
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			this.data = parentInstance.modal.data;
		}
		this.error = null;
		const form = this.form = new FormGroup({
			name: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PathAddModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const path = {
				name: values.name,
				items: this.data ? this.data.item.items : [],
			};
			// console.log('PathAddModalComponent.onSubmit.path', path);
			return PathService.pathCreate$(path).pipe(
				first(),
			).subscribe(response => {
				// console.log('PathAddModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PathAddModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

PathAddModalComponent.meta = {
	selector: '[path-add-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Add Path.</div>
				<div class="description">Aggiungi un percorso</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.name" label="Name"></div>
					</div>
					<div class="group--cta">
						<button type="submit" class="btn--accept">
							<span>Create</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	`,
};

PathAddModalComponent.chunk = () => /* html */`<div class="panorama-modal" path-add-modal></div>`;
