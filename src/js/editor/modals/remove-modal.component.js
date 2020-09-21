import { Component, getContext } from 'rxcomp';
import ModalOutletComponent from '../../modal/modal-outlet.component';
import ModalService from '../../modal/modal.service';

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

	close() {
		ModalService.reject();
	}

}

RemoveModalComponent.meta = {
	selector: '[remove-modal]'
};
