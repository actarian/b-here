import { Component, getContext } from 'rxcomp';
import { environment } from '../environment';
import ModalOutletComponent from '../modal/modal-outlet.component';
import ModalService from '../modal/modal.service';

export default class TryInARModalComponent extends Component {

	onInit() {
		super.onInit();
		const { parentInstance, node } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			const data = this.data = parentInstance.modal.data;
			// console.log('data', data);
			if (data && data.ar) {
				const url = TryInARModalComponent.getUrl(data);
				const qrcode = new QRious({
					element: node.querySelector('.qrcode'),
					value: url,
					size: 256
				});
			}
		}
	}

	close() {
		ModalService.reject();
	}

	static getUrl(data) {
		const url = environment.getAbsoluteUrl(environment.template.tryInAr, { viewId: data.id });
		console.log('TryInARModalComponent.getUrl', url);
		return url;
	}

	static openInAR(data) {
		const url = this.getUrl(data);
		window.open(url, '_blank');
	}

}

TryInARModalComponent.meta = {
	selector: '[try-in-ar-modal]'
};
