import { Component, getContext } from 'rxcomp';
import ModalOutletComponent from '../modal/modal-outlet.component';
import { ModalService } from '../modal/modal.service';

export default class ControlRequestModalComponent extends Component {

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

	/*
	onDestroy() {
		// console.log('ControlRequestModalComponent.onDestroy');
	}
	*/

	onClose() {
		ModalService.reject();
	}
}

ControlRequestModalComponent.meta = {
	selector: '[control-request-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">L'utente ha richiesto il controllo della navigazione. Accetti?</div>
				<div class="group--cta">
					<button type="button" class="btn--cancel" (click)="onReject()">
						<span>Rifiuta</span>
					</button>
					<button type="button" class="btn--accept" (click)="onAccept()">
						<span>Accetta</span>
					</button>
				</div>
			</div>
		</div>
	`,
};

ControlRequestModalComponent.chunk = () => /* html */`<div class="control-request-modal" control-request-modal></div>`;
