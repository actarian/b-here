import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import { ModalResolveEvent, ModalService } from '../../modal/modal.service';
import NavmapItemModalComponent from '../modals/navmap-item-modal.component';
import NavmapModalComponent from '../modals/navmap-modal.component';
import NavmapService from './navmap.service';

export default class NavmapBuilderComponent extends Component {

	onInit() {
		this.navmap = null;
		this.navmaps = [];
		NavmapService.navmapGet$().pipe(
			first(),
		).subscribe(navmaps => {
			this.navmaps = navmaps;
			this.pushChanges();
		});
	}

	onBack(event) {
		this.navmap = null;
		this.pushChanges();
	}

	onAdd() {
		ModalService.open$({ template: NavmapModalComponent.chunk() }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.navmaps.push(event.data);
				this.navmap = event.data;
				this.pushChanges();
			}
		});
	}

	onSet(item) {
		this.navmap = this.navmaps.find(x => x.id === item.id);
		this.pushChanges();
	}

	onAddItem(navmap, hit) {
		ModalService.open$({ template: NavmapItemModalComponent.chunk(), data: { navmap, hit } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				const items = navmap.items || [];
				items.push(event.data);
				Object.assign(navmap, { items });
				this.pushChanges();
			}
		});
	}

	onDelete(navmap) {
		const index = this.navmaps.indexOf(navmap);
		if (index !== -1) {
			this.navmaps.splice(index, 1);
		}
		this.navmap = null;
		this.pushChanges();
	}

}

NavmapBuilderComponent.meta = {
	selector: '[navmap-builder]',
	inputs: ['views'],
	template: /* html */`
	<div class="group--head">
		<div class="title" [innerHTML]="'editor_navmaps' | label"></div>
	</div>
	<div class="group--main">
		<!-- listing navmaps -->
		<div class="listing--navmaps" *if="!navmap">
			<div class="abstract" *if="navmaps.length == 0" [innerHTML]="'editor_add_item' | label"></div>
			<div class="listing__item" *for="let item of navmaps">
				<div class="card--navmap" (click)="onSet(item)">
					<div class="card__picture">
						<img [src]="item.asset | asset" *if="item.asset" />
					</div>
					<div class="card__content">
						<div class="card__name" [innerHTML]="item.name"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- navmap edit -->
		<div class="navmap" navmap-edit [navmap]="navmap" (delete)="onDelete($event)" *if="navmap">
			<form class="form" [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
				<div class="title"><span [innerHTML]="navmap.name"></span> <span [innerHTML]="navmap.id"></span></div>
				<div class="form-controls">
					<div control-text [control]="controls.name" label="Name"></div>
					<!--
					<div control-asset [control]="controls.asset" label="Image" accept="image/png"></div>
					-->
				</div>
				<div class="group--cta">
					<button type="submit" class="btn--accept">
						<span [innerHTML]="'editor_save' | label"></span>
					</button>
					<button type="button" class="btn--remove" (click)="onRemove($event)">
						<span [innerHTML]="'editor_remove' | label"></span>
					</button>
				</div>
				<div class="navmap-control" [class]="mode">
					<div class="navmap-control__image">
						<img draggable="false" [src]="navmap.asset | asset" *if="navmap.asset" />
						<div class="navmap__item" [style]="{ left: item.position[0] * 100 + '%', top: item.position[1] * 100 + '%' }" (mousedown)="onMoveItem($event, item)" (click)="onRemoveItem(item)" *for="let item of navmap.items">
							<img draggable="false" [src]="'textures/ui/nav-point.png' | asset" />
							<div class="title" [innerHTML]="item.title" *if="item.title"></div>
						</div>
					</div>
					<ul class="navmap-control__toolbar">
						<li class="nav__item"><span [class]="{ active: mode === 'insert' }" (click)="onToggleMode('insert')"><svg class="pencil" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#pencil"></use></svg></span></li>
						<li class="nav__item"><span [class]="{ active: mode === 'move' }" (click)="onToggleMode('move')"><svg class="move" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#move"></use></svg></span></li>
						<li class="nav__item"><span [class]="{ active: mode === 'remove' }" (click)="onToggleMode('remove')"><svg class="erase" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#erase"></use></svg></span></li>
					</ul>
				</div>
			</form>
		</div>
	</div>
	<div class="group--foot">
		<button type="button" class="btn--mode" (click)="onAdd($event)" [innerHTML]="'editor_add' | label" *if="!navmap"></button>
		<button type="button" class="btn--mode" (click)="onBack($event)" [innerHTML]="'editor_back' | label" *if="navmap"></button>
	</div>
	`,
};
