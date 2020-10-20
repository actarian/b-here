import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalOutletComponent from '../../modal/modal-outlet.component';
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

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	get view() {
		let view = null;
		const data = this.data;
		if (data) {
			view = data.view;
		}
		return view;
	}

	get position() {
		let position = null;
		const data = this.data;
		if (data) {
			position = data.position;
		}
		return position;
	}

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewItemType.Nav,
			title: new FormControl(null, RequiredValidator()),
			abstract: null,
			viewId: new FormControl(null, RequiredValidator()),
			// keepOrientation: false,
			position: this.position.toArray(),
			asset: null,
			link: new FormGroup({
				title: new FormControl(null),
				href: new FormControl(null),
				target: '_blank',
			}),
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
			// console.log('NavModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		EditorService.viewIdOptions$().pipe(
			first(),
		).subscribe(options => {
			this.controls.viewId.options = options;
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const item = Object.assign({}, this.form.value);
			item.viewId = parseInt(item.viewId);
			if (item.link && (!item.link.title || !item.link.href)) {
				item.link = null;
			}
			// console.log('NavModalComponent.onSubmit', this.view, item);
			EditorService.inferItemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				console.log('NavModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('NavModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.submitted = false;
				// this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	close() {
		ModalService.reject();
	}

}

NavModalComponent.meta = {
	selector: '[nav-modal]'
};
