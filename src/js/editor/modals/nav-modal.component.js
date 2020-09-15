import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import EditorService from '../editor.service';

/*
{
	"id": 110,
	"type": "nav",
	"title": "Barilla Experience",
	"abstract": "Abstract",
	"asset": {
		"type": "image",
		"folder": "barilla/",
		"file": "logo-barilla.jpg"
	},
	"link": {
		"title": "Scopri di più...",
		"href": "https://www.barilla.com/it-it/",
		"target": "_blank"
	},
	"position": [0.9491595148619703,-0.3147945860255039,0],
	"viewId": 23
}
*/

export default class NavModalComponent extends Component {

	onInit() {
		const form = this.form = new FormGroup({
			type: ViewItemType.Nav,
			title: new FormControl(null, RequiredValidator()),
			abstract: new FormControl(null, RequiredValidator()),
			viewId: new FormControl(null, RequiredValidator()),
			// upload: new FormControl(null, RequiredValidator()),
			// items: new FormArray([null, null, null], RequiredValidator()),
		});
		this.controls = form.controls;
		/*
		this.controls.viewId.options = [{
			name: "Name",
			id: 2,
		}];
		*/
		form.changes$.subscribe((changes) => {
			console.log('NavModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		EditorService.data$().pipe(
			first(),
		).subscribe(data => {
			this.controls.viewId.options = data.views.map(view => {
				return {
					id: view.id,
					name: view.name,
				}
			});
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			console.log('NavModalComponent.onSubmit', this.form.value);
			// ModalService.resolve(this.form.value);
			// this.form.submitted = true;
			// this.form.reset();
		}
	}

	close() {
		ModalService.reject();
	}

}

NavModalComponent.meta = {
	selector: '[nav-modal]'
};
