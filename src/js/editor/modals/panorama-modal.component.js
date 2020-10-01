import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class PanoramaModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.Panorama,
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
			// upload: new FormControl(null, RequiredValidator()),
			// items: new FormArray([null, null, null], RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PanoramaModalComponent.form.changes$', changes, form.valid, form);
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
			console.log('PanoramaModalComponent.onSubmit.view', view);
			return EditorService.viewCreate$(view).pipe(
				first(),
			).subscribe(response => {
				console.log('PanoramaModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PanoramaModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
			/*
			const asset = Asset.fromUrl(this.form.value.upload);
			console.log('PanoramaModalComponent.onSubmit.asset', asset);
			EditorService.assetCreate$(asset).pipe(
				first(),
				switchMap(response => {
					const view = {
						type: this.form.value.type,
						name: this.form.value.name,
						asset: response,
						orientation: {
							latitude: 0,
							longitude: 0
						},
						zoom: 75
					};
					console.log('PanoramaModalComponent.onSubmit.view', view);
					return EditorService.viewCreate$(view).pipe(
						first(),
					);
				})
			).subscribe(response => {
				console.log('PanoramaModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PanoramaModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
			*/
		} else {
			this.form.touched = true;
		}

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
	}

	close() {
		ModalService.reject();
	}

}

PanoramaModalComponent.meta = {
	selector: '[panorama-modal]'
};

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
