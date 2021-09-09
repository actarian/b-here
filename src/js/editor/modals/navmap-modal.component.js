import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import NavmapService from '../navmap/navmap.service';

export default class NavmapModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			name: new FormControl(null, RequiredValidator()),
			asset: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('NavmapModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const navmap = {
				name: values.name,
				asset: values.asset,
			};
			// console.log('NavmapModalComponent.onSubmit.navmap', navmap);
			return NavmapService.navmapCreate$(navmap).pipe(
				first(),
			).subscribe(response => {
				// console.log('NavmapModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('NavmapModalComponent.onSubmit.error', error);
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

NavmapModalComponent.meta = {
	selector: '[navmap-modal]'
};

/*
{
	"id": 1,
	"name": "Mappa",
	"asset": {
		"type": "image",
		"folder": "folder/",
		"file": "map.png"
	},
	"items": [{
		"id": 110,
		"type": "nav",
		"title": "Barilla Experience",
		"abstract": "Abstract",
		"position": [0.9491595148619703,-0.3147945860255039,0],
		"viewId": 23
	}],
}
*/
