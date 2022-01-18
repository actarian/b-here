import { Component } from 'rxcomp';
import ModalService from '../../modal/modal.service';

export default class IframeModalComponent extends Component {
	onClose() {
		ModalService.reject();
	}
}

IframeModalComponent.meta = {
	selector: '[iframe-modal]'
};
