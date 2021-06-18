import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first, map, switchMap } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { ViewItemType, ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class ModelModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Model,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
			model: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('ModelModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const view = {
				type: values.type,
				name: values.name,
				asset: values.asset,
				orientation: {
					latitude: 0,
					longitude: 0
				},
				zoom: 75
			};
			// console.log('ModelModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				switchMap(view => {
					const item = {
						type: ViewItemType.Model,
						asset: values.model,
					};
					return EditorService.itemCreate$(view, item).pipe(
						map(item => {
							view.items = [item];
							return view;
						})
					);
				}),
				first(),
			).subscribe(response => {
				// console.log('ModelModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('ModelModalComponent.onSubmit.error', error);
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

ModelModalComponent.meta = {
	selector: '[model-modal]'
};
