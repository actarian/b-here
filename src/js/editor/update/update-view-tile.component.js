import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { ModalResolveEvent, ModalService } from '../../modal/modal.service';
import RemoveModalComponent from '../modals/remove-modal.component';

export default class UpdateViewTileComponent extends Component {

	onInit() {
		this.busy = false;
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
		// console.log('UpdateViewTileComponent.onInit', this.view, this.tile);
	}

	onSubmit() {
		if (!this.busy && this.form.valid) {
			this.busy = true;
			this.pushChanges();
			const payload = Object.assign({}, this.form.value);
			const view = this.view;
			const tile = payload;
			/*
			EditorService.tileUpdate$...
			*/
			this.update.next({ view, tile });
			this.setTimeout(() => {
				this.busy = false;
				this.pushChanges();
			});
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ template: RemoveModalComponent.chunk(), data: { tile: this.tile } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.delete.next({ view: this.view, tile: this.tile });
			}
		});
	}

	onSelect(event) {
		this.select.next({ view: this.view, tile: this.tile.selected ? null : this.tile });
	}

	clearTimeout() {
		if (this.to) {
			clearTimeout(this.to);
		}
	}

	setTimeout(callback, msec = 300) {
		this.clearTimeout();
		if (typeof callback === 'function') {
			this.to = setTimeout(callback, msec);
		}
	}

	onDestroy() {
		this.clearTimeout();
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
			<div class="title">Tile {{tile.id}}</div>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="tile.selected">
			<div class="form-controls">
				<div control-text [control]="controls.id" label="Id" [disabled]="true"></div>
				<div control-asset [control]="controls.asset" label="Image" accept="image/jpeg, image/png"></div>
			</div>
			<div class="group--cta">
				<button type="submit" class="btn--update" [class]="{ busy: busy }">
					<span [innerHTML]="'update' | label"></span>
				</button>
				<!--
				<button type="button" class="btn--remove" (click)="onRemove($event)">
					<span [innerHTML]="'remove' | label"></span>
				</button>
				-->
			</div>
		</form>
	`,
};
