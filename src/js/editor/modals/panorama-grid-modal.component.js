import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ModalService } from '../../modal/modal.service';
import { PanoramaGridView, ViewType } from '../../view/view';
import { EditorService } from '../editor.service';

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
			// console.log('PanoramaGridModalComponent.onSubmit', this.form.value);
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
			// console.log('PanoramaGridModalComponent.onSubmit', tiles);
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
				// console.log('PanoramaGridModalComponent.onSubmit.success', response);
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

	onClose() {
		ModalService.reject();
	}
}

PanoramaGridModalComponent.meta = {
	selector: '[panorama-grid-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Panorama Grid.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.name" label="Name"></div>
						<div control-assets [control]="controls.assets" label="Image" accept="image/jpeg"></div>
					</div>
					<div class="group--cta">
						<button type="submit" class="btn--accept">
							<span>Create</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	`,
};

PanoramaGridModalComponent.chunk = () => /* html */`<div class="panorama-grid-modal" panorama-grid-modal></div>`;
