import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ModalService } from '../../modal/modal.service';
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
	selector: '[navmap-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Map.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.name" label="Name"></div>
						<div control-asset [control]="controls.asset" label="Image" accept="image/png"></div>
					</div>
					<div class="description">Formato immagine .png con trasparenza (2048x1024 o 1024x512)</div>
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

NavmapModalComponent.chunk = () => /* html */`<div class="panorama-modal" navmap-modal></div>`;
