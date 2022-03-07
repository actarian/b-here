import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import PathService from '../path/path.service';

export default class PathEditModalComponent extends Component {

	onInit() {
		this.item = null;
		this.views = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			const data = parentInstance.modal.data;
			if (data) {
				this.item = data.item ? data.item : null;
				this.views = this.parseViews(data.views, this.item);
			}
		}
		this.error = null;
		const form = this.form = new FormGroup({
			name: new FormControl(this.item ? this.item.name : null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PathEditModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	parseViews(views, item) {
		if (views && item) {
			return views.map(view => {
				return {
					id: view.id,
					name: view.name,
					type: view.type,
					active: item.items.indexOf(view.id) === -1,
				};
			});
		} else {
			return [];
		}
	}

	onToggleView(view) {
		view.active = !view.active;
		this.pushChanges();
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const payload = {
				id: this.item.id,
				name: values.name,
				items: this.views.filter(x => !x.active).map(x => x.id),
			};
			// console.log('PathEditModalComponent.onSubmit', payload);
			return PathService.pathUpdate$(payload).pipe(
				first(),
			).subscribe(response => {
				// console.log('PathEditModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PathEditModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onSelectAll() {
		this.views.forEach(view => view.active = true);
		this.pushChanges();
	}

	onSelectNone() {
		this.views.forEach(view => view.active = false);
		this.pushChanges();
	}

	onClose() {
		ModalService.reject();
	}
}

PathEditModalComponent.meta = {
	selector: '[path-edit-modal]'
};
