import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, RequiredValidator } from 'rxcomp-form';
import { first } from 'rxjs/operators';
// import * as THREE from 'three';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';
import { ViewItemType } from '../../view/view';
import EditorService from '../editor.service';
import NavmapService from '../navmap/navmap.service';

export default class NavmapItemModalComponent extends Component {

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	get navmap() {
		let navmap = null;
		const data = this.data;
		if (data) {
			navmap = data.navmap;
		}
		return navmap;
	}

	get position() {
		let position = [0, 0, 0];
		const data = this.data;
		if (data) {
			position = [data.hit.x, data.hit.y, 0];
		}
		return position;
	}

	onInit() {
		const position = this.position;
		this.error = null;
		const form = this.form = new FormGroup({
			type: ViewItemType.Nav,
			title: null,
			abstract: null,
			viewId: new FormControl(null, RequiredValidator()),
			keepOrientation: false,
			important: false,
			transparent: false,
			position: new FormControl(position, RequiredValidator()),
			asset: null,
		});
		this.controls = form.controls;
		form.changes$.subscribe((changes) => {
			// console.log('NavmapItemModalComponent.form.changes$', changes, form.valid, form);
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
			item.viewId = parseInt(item.viewId);
			// console.log('NavmapItemModalComponent.onSubmit', this.navmap, item);
			NavmapService.itemCreate$(this.navmap, item).pipe(
				first(),
			).subscribe(response => {
				// console.log('NavmapItemModalComponent.onSubmit.success', response);
				ModalService.resolve(response);
			}, error => {
				console.log('NavmapItemModalComponent.onSubmit.error', error);
				this.error = error;
				this.form.submitted = false;
				// this.form.reset();
			});
		} else {
			this.form.touched = true;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

NavmapItemModalComponent.meta = {
	selector: '[navmap-item-modal]'
};
