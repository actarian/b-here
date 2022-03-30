import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
import { environment } from '../../environment';
// import * as THREE from 'three';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import { ModalService } from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import { WebhookService } from '../../webhook/webhook.service';
import { Host } from '../../world/host/host';
import ModelNavComponent from '../../world/model/model-nav.component';
import { EditorService } from '../editor.service';

export default class NavModalComponent extends Component {

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	get view() {
		let view = null;
		const data = this.data;
		if (data) {
			view = data.view;
		}
		return view;
	}

	get position() {
		let position = null;
		const data = this.data;
		if (data) {
			position = data.hit.position;
		}
		return position;
	}

	get object() {
		const object = new THREE.Object3D();
		const data = this.data;
		if (data) {
			const position = data.hit.position.clone();
			const normal = data.hit.normal.clone();
			const spherical = data.hit.spherical;
			if (spherical) {
				position.normalize().multiplyScalar(ModelNavComponent.RADIUS);
				object.position.copy(position);
				object.lookAt(Host.origin);
			} else {
				object.lookAt(normal);
				object.position.set(position.x, position.y, position.z);
				object.position.add(normal.multiplyScalar(0.01));
			}
		}
		return object;
	}

	onInit() {
		const object = this.object;
		this.error = null;
		this.useHooks = WebhookService.enabled;
		const form = this.form = new FormGroup({
			type: ViewItemType.Nav,
			title: null,
			abstract: null,
			viewId: null, // new FormControl(null, RequiredValidator()),
			hook: null,
			hookExtra: null,
			keepOrientation: false,
			important: false,
			transparent: false,
			//
			position: new FormControl(object.position.toArray(), RequiredValidator()),
			rotation: new FormControl(object.rotation.toArray(), RequiredValidator()), // [0, -Math.PI / 2, 0],
			scale: new FormControl([20, 5, 1], RequiredValidator()),
			//
			asset: null,
			link: new FormGroup({
				title: new FormControl(null),
				href: new FormControl(null),
				target: '_blank',
			}),
			// upload: new FormControl(null, RequiredValidator()),
			// items: new FormArray([null, null, null], RequiredValidator()),
		});
		this.controls = form.controls;
		if (WebhookService.enabled) {
			const options = environment.webhook.methods.nav.map(x => ({ id: x, name: x }));
			options.unshift({ id: null, name: 'select' });
			this.controls.hook.options = options;
		}
		// !!! mode validator
		// form.addValidators(NavModalValidator(form, this.view));
		/*
		this.controls.viewId.options = [{
			name: 'Name',
			id: 2,
		}];
		*/
		form.changes$.subscribe((changes) => {
			// console.log('NavModalComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});
		EditorService.viewIdOptions$().pipe(
			first(),
		).subscribe(options => {
			this.controls.viewId.options = options;
			this.pushChanges();
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const item = Object.assign({}, this.form.value);
			item.viewId = item.viewId ? parseInt(item.viewId) : this.view.id;
			if (item.link && (!item.link.title || !item.link.href)) {
				item.link = null;
			}
			// console.log('NavModalComponent.onSubmit', this.view, item);
			EditorService.inferItemCreate$(this.view, item).pipe(
				first(),
			).subscribe(response => {
				// console.log('NavModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('NavModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.submitted = false;
				// this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onViewIdDidChange(viewId) {
		// console.log('NavModalComponent.onViewIdDidChange', viewId, this.form.value);
		// const viewId = this.form.value.viewId;
		if (viewId != null && environment.flags.navAutoUpdateTitle) {
			const options = this.controls.viewId.options;
			const selectedOption = options.find(x => x.id === viewId);
			// console.log('NavModalComponent.onViewIdDidChange', selectedOption, options);
			if (selectedOption != null) {
				const title = selectedOption.name;
				const currentTitle = this.form.value.title;
				// console.log('NavModalComponent.onViewIdDidChange', title, currentTitle);
				if (!currentTitle || options.find(x => x.name === currentTitle)) {
					this.form.patch({ title });
				}
			}
		}
	}

	onClose() {
		ModalService.reject();
	}
}

NavModalComponent.meta = {
	selector: '[nav-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Create Nav.</div>
				<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
					<div class="form-controls">
						<div control-text [control]="controls.title" label="Title"></div>
						<div control-textarea [control]="controls.abstract" label="Abstract"></div>
						<div control-custom-select [control]="controls.viewId" label="NavToView" (change)="onViewIdDidChange($event)"></div>
						<div control-checkbox [control]="controls.keepOrientation" label="Keep Orientation"></div>
						<div control-checkbox [control]="controls.important" label="Important"></div>
						<div control-checkbox [control]="controls.transparent" label="Transparent"></div>
						<div control-vector [control]="controls.position" label="Position" [precision]="3" [disabled]="true"></div>
						<div *if="controls.transparent.value == true">
							<div control-vector [control]="controls.rotation" label="Rotation" [precision]="3" [increment]="Math.PI / 360" [disabled]="true"></div>
							<div control-vector [control]="controls.scale" label="Scale" [precision]="2" [disabled]="true"></div>
						</div>
						<div control-asset [control]="controls.asset" label="Image" accept="image/png, image/jpeg"></div>
						<div control-text [control]="controls.link.controls.title" label="Link Title"></div>
						<div control-text [control]="controls.link.controls.href" label="Link Url"></div>
						<div control-custom-select [control]="controls.hook" label="Hook" *if="useHooks"></div>
						<div control-text [control]="controls.hookExtra" label="Hook Extra" *if="useHooks"></div>
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

NavModalComponent.chunk = () => /* html */`<div class="nav-modal" nav-modal></div>`;
