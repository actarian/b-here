import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { fromEvent } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { ModalResolveEvent, ModalService } from '../../modal/modal.service';
import NavmapItemModalComponent from '../modals/navmap-item-modal.component';
import RemoveModalComponent from '../modals/remove-modal.component';
import NavmapService from './navmap.service';

export const NavmapModes = {
	Idle: 'idle',
	Insert: 'insert',
	Remove: 'remove',
	Move: 'move',
};

export class ControlEvent {

	constructor(element, event) {
		const rect = element.getBoundingClientRect();
		this.x = (event.clientX - rect.x) / rect.width;
		this.y = (event.clientY - rect.y) / rect.height;
		// console.log(this);
	}

}

export class ControlDownEvent extends ControlEvent { }
export class ControlMoveEvent extends ControlEvent { }
export class ControlUpEvent extends ControlEvent { }

export default class NavmapEditComponent extends Component {

	onInit() {
		this.mode = NavmapModes.Idle;
		this.error = null;
		const navmap = this.navmap;
		const form = this.form = new FormGroup({
			name: new FormControl(navmap.name, RequiredValidator()),
			asset: new FormControl(navmap.asset, RequiredValidator()),
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('NavmapEditComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		this.insert$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('NavmapEditComponent.insert', event);
			const hit = event;
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
		});
	}

	insert$() {
		const { node } = getContext(this);
		const image = node.querySelector('.navmap-control__image');
		return fromEvent(image, 'pointerdown').pipe(
			filter(x => this.mode === NavmapModes.Insert),
			map(event => new ControlDownEvent(image, event)),
		);
	}

	onToggleMode(mode) {
		this.mode = (this.mode === mode) ? NavmapModes.Idle : mode;
		this.pushChanges();
	}

	onMoveItem(event, item) {
		const navmap = this.navmap;
		switch (this.mode) {
			case NavmapModes.Move:
				const { node } = getContext(this);
				const image = node.querySelector('.navmap-control__image');
				const position = item.position.slice();
				const down = new ControlDownEvent(image, event);
				const move$ = fromEvent(image, 'mousemove').pipe(
					map(event => new ControlMoveEvent(image, event)),
					tap(event => {
						const diff = {
							x: event.x - down.x,
							y: event.y - down.y,
						};
						item.position = [
							Math.max(0, Math.min(1, position[0] + diff.x)),
							Math.max(0, Math.min(1, position[1] + diff.y)),
							0
						];
						this.pushChanges();
					}),
				);
				const up$ = fromEvent(image, 'mouseup').pipe(
					map(event => new ControlUpEvent(image, event)),
					tap(event => {
						const diff = {
							x: event.x - down.x,
							y: event.y - down.y,
						};
						item.position = [
							Math.max(0, Math.min(1, position[0] + diff.x)),
							Math.max(0, Math.min(1, position[1] + diff.y)),
							0
						];
						// console.log('NavmapEditComponent.onNavmapItem.Update', navmap, item);
						NavmapService.itemUpdate$(navmap, item).pipe(
							first(),
						).subscribe(item_ => {
							Object.assign(item, item_);
							// console.log('NavmapEditComponent.onNavmapItem.Update');
							this.pushChanges();
						});
					}),
				);
				move$.pipe(
					takeUntil(up$),
				).subscribe();
				break;
		}
	}

	onRemoveItem(item) {
		const navmap = this.navmap;
		switch (this.mode) {
			case NavmapModes.Remove:
				NavmapService.itemDelete$(navmap, item).pipe(
					first(),
				).subscribe(_ => {
					// console.log('NavmapEditComponent.onNavmapItem.Remove');
					const items = navmap.items || [];
					const index = items.indexOf(item);
					if (index !== -1) {
						items.splice(index, 1);
					}
					Object.assign(navmap, { items });
					this.pushChanges();
				});
				break;
		}
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const values = this.form.value;
			const payload = Object.assign({ items: [] }, this.navmap, { name: values.name });
			// console.log('NavmapEditComponent.onSubmit.navmap', payload);
			NavmapService.navmapUpdate$(payload).pipe(
				first(),
			).subscribe(response => {
				// console.log('NavmapEditComponent.onSubmit.success', response);
				Object.assign(this.navmap, response);
				this.pushChanges();
			}, error => {
				// console.log('NavmapEditComponent.onSubmit.error', error);
				this.error = error;
				this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onRemove() {
		const navmap = this.navmap;
		ModalService.open$({ template: RemoveModalComponent.chunk(), data: { item: navmap } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				NavmapService.navmapDelete$(navmap).pipe(
					first(),
				).subscribe(response => {
					this.delete.next(navmap);
				})
			}
		});
	}
}

NavmapEditComponent.meta = {
	selector: '[navmap-edit]',
	outputs: ['delete'],
	inputs: ['navmap']
};
