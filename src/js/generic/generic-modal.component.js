import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import ModalOutletComponent from '../modal/modal-outlet.component';
import { ModalService } from '../modal/modal.service';
import { GenericService } from './generic.service';

export class GenericModalComponent extends Component {

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	onInit() {
		console.log(this.data);
		this.page = null;
		GenericService.currentLanguagePage$(this.data.mode).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(page => {
			this.page = page;
			this.pushChanges();
		});
	}

	onClose() {
		ModalService.reject();
	}
}

GenericModalComponent.meta = {
	selector: '[generic-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container" *if="page">
			<h1 class="title" [innerHTML]="page.title"></h1>
			<div class="description" [innerHTML]="page.description"></div>
		</div>
		<div class="modal__footer">
			<button type="button" class="btn--accept" (click)="onClose()">
				<span [innerHTML]="'title_close' | label"></span>
			</button>
		</div>
	`,
};

GenericModalComponent.chunk = () => /* html */`<div class="generic-modal" generic-modal></div>`;
