import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { auditTime, distinctUntilChanged, filter, first, takeUntil } from 'rxjs/operators';
import { MessageType } from '../../agora/agora.types';
import { AssetService } from '../../asset/asset.service';
import { environment } from '../../environment';
import LabelPipe from '../../label/label.pipe';
import MessageService from '../../message/message.service';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import { View, ViewType } from '../../view/view';
import EditorService from '../editor.service';

export default class UpdateViewComponent extends Component {

	onInit() {
		this.busy = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		this.doUpdateForm();
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewComponent.form.changes$', changes);
			this.doUpdateView(changes);
			this.pushChanges();
		});
		this.orbit$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			switch (this.view.type.name) {
				case ViewType.Panorama.name:
				case ViewType.PanoramaGrid.name:
				case ViewType.Model.name:
					this.form.patch({
						latitude: message.orientation.latitude,
						longitude: message.orientation.longitude,
						zoom: message.zoom,
					});
					break;
			}
		});
	}

	orbit$() {
		let latitude, longitude, zoom = null;
		return MessageService.in$.pipe(
			filter(message => message.type === MessageType.ControlInfo),
			auditTime(65),
			distinctUntilChanged((previous, current) => {
				const didChange = (latitude !== current.orientation.latitude ||
					longitude !== current.orientation.longitude ||
					zoom !== current.zoom);
				latitude = current.orientation.latitude;
				longitude = current.orientation.longitude;
				zoom = current.zoom;
				return !didChange;
			}),
		);
	}

	getAssetDidChange(changes) {
		const view = this.view;
		const assetDidChange = AssetService.assetDidChange(view.asset, changes.asset);
		const usdzDidChange = AssetService.assetDidChange(view.ar ? view.ar.usdz : null, changes.usdz);
		const gltfDidChange = AssetService.assetDidChange(view.ar ? view.ar.gltf : null, changes.gltf);
		if (assetDidChange || usdzDidChange || gltfDidChange) {
			// console.log('UpdateViewComponent.getAssetDidChange', assetDidChange, usdzDidChange, gltfDidChange);
			return true;
		} else {
			return false;
		}
	}

	doUpdateView(changes) {
		const assetDidChange = this.getAssetDidChange(changes);
		// console.log('doUpdateItem.assetDidChange', assetDidChange);
		if (assetDidChange) {
			this.onSubmit();
		}
	}

	doUpdateForm() {
		const view = this.view;
		if (!this.type || this.type.name !== view.type.name) {
			this.type = view.type;
			const form = this.form;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (view.type.name) {
				case ViewType.WaitingRoom.name:
					keys = ['id', 'type', 'name', 'latitude', 'longitude', 'zoom', 'asset'];
					break;
				case ViewType.Panorama.name:
					keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
					break;
				case ViewType.PanoramaGrid.name:
					keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom'];
					break;
				case ViewType.Model.name:
					keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
					break;
				default:
					keys = ['id', 'type', 'name'];
			}
			if (view.type.name !== ViewType.WaitingRoom.name && environment.flags.ar) {
				keys.push('usdz?');
				keys.push('gltf?');
			}
			keys.forEach(key => {
				const optional = key.indexOf('?') !== -1;
				key = key.replace('?', '');
				switch (key) {
					case 'latitude':
					case 'longitude':
						const orientation = view.orientation || { latitude: 0, longitude: 0 };
						form.add(new FormControl(orientation[key], RequiredValidator()), key);
						break;
					case 'usdz':
					case 'gltf':
						form.add(new FormControl((view.ar ? (view.ar[key] || null) : null), optional ? undefined : RequiredValidator()), key);
						break;
					default:
						form.add(new FormControl((view[key] != null ? view[key] : null), optional ? undefined : RequiredValidator()), key);
				}
			});
			this.controls = form.controls;
		}
	}

	onChanges(changes) {
		this.doUpdateForm();
	}

	onSubmit() {
		if (!this.busy && this.form.valid) {
			this.busy = true;
			this.pushChanges();
			const payload = Object.assign({}, this.view, this.form.value);
			if (payload.latitude != null) { // !!! keep loose inequality
				payload.orientation = {
					latitude: payload.latitude,
					longitude: payload.longitude,
				};
				delete payload.latitude;
				delete payload.longitude;
			}
			const usdz = payload.usdz || null;
			const gltf = payload.gltf || null;
			delete payload.usdz;
			delete payload.gltf;
			payload.ar = (usdz || gltf) ? { usdz, gltf } : null;
			const view = new View(payload);
			EditorService.viewUpdate$(view).pipe(
				first(),
			).subscribe(response => {
				// console.log('UpdateViewComponent.onSubmit.viewUpdate$.success', response);
				this.update.next({ view });
				setTimeout(() => {
					this.busy = false;
					this.pushChanges();
				}, 300);
			}, error => console.log('UpdateViewComponent.onSubmit.viewUpdate$.error', error));
			// this.update.next({ view: new View(payload) });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ src: environment.template.modal.remove, data: { item: this.item } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.delete.next({ view: this.view });
			}
		});
	}

	onSelect(event) {
		this.select.next({ view: this.view.selected ? null : this.view });
	}

	getTitle(view) {
		return LabelPipe.getKeys('editor', view.type.name);
	}
}

UpdateViewComponent.meta = {
	selector: 'update-view',
	outputs: ['select', 'update', 'delete'],
	inputs: ['view'],
	template: /* html */`
		<div class="group--headline" [class]="{ active: view.selected }" (click)="onSelect($event)">
			<!-- <div class="id" [innerHTML]="view.id"></div> -->
			<div class="icon">
				<svg-icon [name]="view.type.name"></svg-icon>
			</div>
			<div class="title" [innerHTML]="getTitle(view)"></div>
			<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
		</div>
		<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off" *if="view.selected">
			<div class="form-controls">
				<div control-text [control]="controls.id" label="Id" [disabled]="true"></div>
				<!-- <div control-text [control]="controls.type" label="Type" [disabled]="true"></div> -->
				<div control-text [control]="controls.name" label="Name"></div>
			</div>
			<div class="form-controls" *if="view.type.name == 'waiting-room'">
				<div control-asset [control]="controls.asset" label="Image" accept="image/jpeg"></div>
				<div control-text [control]="controls.latitude" label="Latitude" [disabled]="true"></div>
				<div control-text [control]="controls.longitude" label="Longitude" [disabled]="true"></div>
				<div control-text [control]="controls.zoom" label="Zoom" [disabled]="true"></div>
			</div>
			<div class="form-controls" *if="view.type.name == 'panorama'">
				<div control-checkbox [control]="controls.hidden" label="Hide from menu"></div>
				<div control-asset [control]="controls.asset" label="Image or Video" accept="image/jpeg, video/mp4"></div>
				<div control-text [control]="controls.latitude" label="Latitude" [disabled]="true"></div>
				<div control-text [control]="controls.longitude" label="Longitude" [disabled]="true"></div>
				<div control-text [control]="controls.zoom" label="Zoom" [disabled]="true"></div>
			</div>
			<div class="form-controls" *if="view.type.name == 'panorama-grid'">
				<div control-checkbox [control]="controls.hidden" label="Hide from menu"></div>
				<div control-text [control]="controls.latitude" label="Latitude" [disabled]="true"></div>
				<div control-text [control]="controls.longitude" label="Longitude" [disabled]="true"></div>
				<div control-text [control]="controls.zoom" label="Zoom" [disabled]="true"></div>
			</div>
			<div class="form-controls" *if="view.type.name == 'model'">
				<div control-checkbox [control]="controls.hidden" label="Hide from menu"></div>
				<div control-asset [control]="controls.asset" label="Image" accept="image/jpeg"></div>
				<div control-text [control]="controls.latitude" label="Latitude" [disabled]="true"></div>
				<div control-text [control]="controls.longitude" label="Longitude" [disabled]="true"></div>
				<div control-text [control]="controls.zoom" label="Zoom" [disabled]="true"></div>
			</div>
			<div class="form-controls" *if="view.type.name != 'waiting-room' && ('ar' | flag)">
				<div control-model [control]="controls.usdz" label="AR IOS (.usdz)" accept=".usdz"></div>
				<div control-model [control]="controls.gltf" label="AR Android (.glb)" accept=".glb"></div>
			</div>
			<div class="group--cta">
				<button type="submit" class="btn--update" [class]="{ busy: busy }">
					<span [innerHTML]="'update' | label"></span>
				</button>
				<button type="button" class="btn--remove" *if="view.type.name != 'waiting-room'" (click)="onRemove($event)">
					<span [innerHTML]="'remove' | label"></span>
				</button>
			</div>
		</form>
	`,
};
