import { Component, getContext } from 'rxcomp';
import ModalOutletComponent from './modal-outlet.component';
import { ModalService } from './modal.service';

export default class ModalComponent extends Component {

	onInit() {
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			this.data = parentInstance.modal.data;
		}
	}

	onClose() {
		ModalService.reject();
	}
}

ModalComponent.meta = {
	selector: '[modal]'
};
