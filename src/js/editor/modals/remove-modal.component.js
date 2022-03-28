import { Component, getContext } from 'rxcomp';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import { ModalService } from '../../modal/modal.service';

export default class RemoveModalComponent extends Component {

	get data() {
		let data = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			data = parentInstance.modal.data;
		}
		return data;
	}

	get item() {
		let item = null;
		const data = this.data;
		if (data) {
			item = data.item;
		}
		return item;
	}

	onRemove() {
		ModalService.resolve();
	}

	onCancel() {
		ModalService.reject();
	}

	onClose() {
		ModalService.reject();
	}
}

RemoveModalComponent.meta = {
	selector: '[remove-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Remove <span *if="item">&ldquo;<span [innerHTML]="item.title || item.name"></span>&rdquo;</span>.</div>
				<div class="abstract">are you sure?</div>
				<div class="group--cta">
					<button type="button" class="btn--remove" (click)="onRemove($event)">
						<span>Remove</span>
					</button>
					<button type="button" class="btn--accept" (click)="onCancel($event)">
						<span>Cancel</span>
					</button>
				</div>
			</div>
		</div>
	`,
};

RemoveModalComponent.chunk = () => /* html */`<div class="remove-modal" remove-modal></div>`;
