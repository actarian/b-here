import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import ModalService from '../../modal/modal.service';
import { PanoramaGridView, ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class PanoramaGridModalComponent extends Component {

	onInit() {
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewType.PanoramaGrid,
			name: new FormControl(null, RequiredValidator()),
			assets: new FormControl(null, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('PanoramaGridModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			console.log('PanoramaGridModalComponent.onSubmit', this.form.value);
			const assets = this.form.value.assets;
			const tiles = PanoramaGridView.mapTiles(assets.map(asset => ({
				asset,
				navs: [],
			})), false, true);
			tiles.sort((a, b) => {
				const ai = a.indices.x * 10000 + a.indices.y;
				const bi = b.indices.x * 10000 + b.indices.y;
				return ai - bi;
			});
			console.log('PanoramaGridModalComponent.onSubmit', tiles);
			const asset = tiles[0].asset;
			const view = {
				type: this.form.value.type,
				name: this.form.value.name,
				asset,
				tiles: tiles,
				invertAxes: true,
				flipAxes: false,
				orientation: {
					latitude: 0,
					longitude: 0
				},
				zoom: 75
			};
			EditorService.viewCreate$(view).pipe(
				first(),
			).subscribe(response => {
				console.log('PanoramaGridModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('PanoramaGridModalComponent.onSubmit.error', error);
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

PanoramaGridModalComponent.meta = {
	selector: '[panorama-grid-modal]'
};
