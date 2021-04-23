import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class Room3DModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Room3d,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
			// model: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('Room3DModalComponent.form.changes$', changes, form.valid, form);
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
			// console.log('Room3DModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				/*
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
				*/
				first(),
			).subscribe(response => {
				// console.log('Room3DModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('Room3DModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	close() {
		ModalService.reject();
	}

}

Room3DModalComponent.meta = {
	selector: '[room-3d-modal]'
};
