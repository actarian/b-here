import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first, map, switchMap } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { ViewItemType, ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class MediaModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Media,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('MediaModalComponent.form.changes$', changes, form.valid, form);
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
			// console.log('MediaModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				switchMap(view => {
					const item = {
						type: ViewItemType.Plane,
						position: [20, 0, 0],
						rotation: [0, -Math.PI / 2, 0],
						scale: [12, 6.75, 1],
						asset: values.asset,
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
				// console.log('MediaModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('MediaModalComponent.onSubmit.error', error);
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

MediaModalComponent.meta = {
	selector: '[media-modal]'
};
