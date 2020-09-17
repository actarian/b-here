import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import ModalService from '../../modal/modal.service';
import { ViewType } from '../../view/view';

/*
{
	"id": 1,
	"type": "panorama",
	"name": "Welcome Room",
	"likes": 134,
	"liked": false,
	"asset": {
		"type": "image",
		"folder": "waiting-room/",
		"file": "mod2.jpg"
	},
	"items": [{
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
	}],
	"orientation": {
		"latitude": -10,
		"longitude": 360
	},
	"zoom": 75
}
*/

export default class PanoramaModalComponent extends Component {

	onInit() {
		const form = this.form = new FormGroup({
			type: ViewType.Panorama,
			name: new FormControl(null, RequiredValidator()),
			upload: new FormControl(null, RequiredValidator()),
			// items: new FormArray([null, null, null], RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			console.log('PanoramaModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			console.log('PanoramaModalComponent.onSubmit', this.form.value);
			// ModalService.resolve(this.form.value);
			// this.form.submitted = true;
			// this.form.reset();
			/*

		EditorService.viewCreate$({
			"id": 1,
			"type": "panorama",
			"name": "Welcome Room",
			"likes": 134,
			"liked": false,
			"asset": {
				"type": "image",
				"folder": "waiting-room/",
				"file": "mod2.jpg"
			},
			"items": [
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
					"position": [
						0.9491595148619703,
						-0.3147945860255039,
						0
					],
					"viewId": 23
				}
			],
			"orientation": {
				"latitude": -10,
				"longitude": 360
			},
			"zoom": 75
		}).pipe(
			first(),
		).subscribe(data => {
			console.log('EditorService.viewCreate$', data);
		});
			*/
		} else {
			this.form.touched = true;
		}
	}

	close() {
		ModalService.reject();
	}

}

PanoramaModalComponent.meta = {
	selector: '[panorama-modal]'
};
