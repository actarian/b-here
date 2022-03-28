import { Component, getContext } from 'rxcomp';
import ModalOutletComponent from '../modal/modal-outlet.component';
import { ModalService } from '../modal/modal.service';

export default class SupportRequestModalComponent extends Component {

	onInit() {
		super.onInit();
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			this.data = parentInstance.modal.data;
		}
	}

	onAccept(user) {
		ModalService.resolve();
	}

	onReject(user) {
		ModalService.reject();
	}

	onClose() {
		ModalService.reject();
	}
}

SupportRequestModalComponent.meta = {
	selector: '[support-request-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Un operatore è disponibile per un tour guidato.<br>Desideri Accettare?</div>
				<div class="group--cta">
					<button type="button" class="btn--accept" (click)="onAccept()">
						<span>Accetta</span>
					</button>
					<button type="button" class="btn--cancel" (click)="onReject()">
						<span>Rifiuta</span>
					</button>
				</div>
			</div>
		</div>
	`,
};

SupportRequestModalComponent.chunk = () => /* html */`<div class="support-request-modal" support-request-modal></div>`;
