import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import ModalSrcService from '../../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';

export default class UpdateViewTileComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup({
			id: new FormControl(this.tile.id, RequiredValidator()),
			asset: new FormControl(this.tile.asset, RequiredValidator()),
			navs: new FormControl(this.tile.navs, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewTileComponent.form.changes$', changes);
			const tile = this.tile;
			Object.assign(tile, changes);
			if (typeof tile.onUpdate === 'function') {
				tile.onUpdate();
			}
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const payload = Object.assign({}, this.form.value);
			this.update.next({ view: this.view, tile: payload });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ src: ModalSrcService.get('remove'), data: { tile: this.tile } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.delete.next({ view: this.view, tile: this.tile });
			}
		});
	}

	onSelect(event) {
		this.select.next({ view: this.view, tile: this.tile.selected ? null : this.tile });
		/*
		this.tile.active = !this.tile.active;
		this.pushChanges();
		*/
	}
}

UpdateViewTileComponent.meta = {
	selector: 'update-view-tile',
	outputs: ['select', 'update', 'delete'],
	inputs: ['view', 'tile'],
	template: /* html */`
		<div class="group--headline" [class]="{ active: tile.selected }" (click)="onSelect($event)">
			<div class="icon">
				<svg-icon name="tile"></svg-icon>
			</div>
			<div class="title">Tile</div>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="tile.selected">
			<fieldset>
				<div control-text label="Id" [control]="controls.id" [disabled]="true"></div>
				<div control-asset label="Image" [control]="controls.asset" accept="image/jpeg, image/png"></div>
			</fieldset>
			<div class="group--cta">
				<button type="submit" class="btn--update">
					<span *if="!form.submitted">Update</span>
					<span *if="form.submitted">Update!</span>
				</button>
				<button type="button" class="btn--remove" (click)="onRemove($event)">
					<span>Remove</span>
				</button>
			</div>
		</form>
	`,
};
