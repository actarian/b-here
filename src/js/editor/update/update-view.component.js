import { Component } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { auditTime, takeUntil } from 'rxjs/operators';
import { MessageType } from '../../agora/agora.types';
import MessageService from '../../message/message.service';
import ModalSrcService from '../../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import { View, ViewType } from '../../view/view';
import { EditorLocale } from '../editor.locale';

export default class UpdateViewComponent extends Component {

	onInit() {
		this.active = false;
		const form = this.form = new FormGroup();
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('UpdateViewComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		this.onUpdate();
		MessageService.in$.pipe(
			auditTime(500),
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			switch (message.type) {
				case MessageType.CameraOrientation:
					switch (this.view.type.name) {
						case ViewType.Panorama.name:
							this.form.patch({
								latitude: message.orientation.latitude,
								longitude: message.orientation.longitude,
								zoom: message.zoom,
							})
							break;
					}
					break;
			}
		});
	}

	onUpdate() {
		const view = this.view;
		if (!this.type || this.type.name !== view.type.name) {
			this.type = view.type;
			const form = this.form;
			Object.keys(this.controls).forEach(key => {
				form.removeKey(key);
			});
			let keys;
			switch (view.type.name) {
				case ViewType.Panorama.name:
					keys = ['id', 'type', 'name', 'latitude', 'longitude', 'zoom'];
					break;
				default:
					keys = ['id', 'type', 'name'];
			}
			keys.forEach(key => {
				switch (key) {
					case 'latitude':
					case 'longitude':
						const orientation = view.orientation || { latitude: 0, longitude: 0 };
						form.add(new FormControl(orientation[key], RequiredValidator()), key);
						break;
					default:
						form.add(new FormControl(view[key], RequiredValidator()), key);
				}
			});
			this.controls = form.controls;
		}
	}

	onChanges(changes) {
		this.onUpdate();
	}

	onSubmit() {
		if (this.form.valid) {
			const payload = Object.assign({}, this.view, this.form.value);
			if (payload.latitude !== undefined) {
				payload.orientation = {
					latitude: payload.latitude,
					longitude: payload.longitude,
				};
				delete payload.latitude;
				delete payload.longitude;
			}
			this.update.next({ view: new View(payload) });
		} else {
			this.form.touched = true;
		}
	}

	onRemove(event) {
		ModalService.open$({ src: ModalSrcService.get('remove'), data: { item: this.item } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.delete.next({ view: this.view });
			}
		});
	}

	onSelect(event) {
		this.select.next({ view: this.view.selected ? null : this.view });
		// this.active = !this.active;
		// this.pushChanges();
	}

	getTitle(view) {
		return EditorLocale[view.type.name];
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
			<fieldset>
				<div control-text [control]="controls.id" label="Id" [disabled]="true"></div>
				<!-- <div control-text [control]="controls.type" label="Type" [disabled]="true"></div> -->
				<div control-text [control]="controls.name" label="Name"></div>
			</fieldset>
			<fieldset *if="view.type.name == 'waiting-room'">
			</fieldset>
			<fieldset *if="view.type.name == 'panorama'">
				<div control-text [control]="controls.latitude" label="Latitude" [disabled]="true"></div>
				<div control-text [control]="controls.longitude" label="Longitude" [disabled]="true"></div>
				<div control-text [control]="controls.zoom" label="Zoom" [disabled]="true"></div>
			</fieldset>
			<div class="group--cta">
				<button type="submit" class="btn--update">
					<span *if="!form.submitted">Update</span>
					<span *if="form.submitted">Update!</span>
				</button>
				<button type="button" class="btn--remove" *if="view.type != 'waiting-room'" (click)="onRemove($event)">
					<span>Remove</span>
				</button>
			</div>
		</form>
	`,
};
