import { Component, getContext } from 'rxcomp';
import { BASE_HREF } from '../const';
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
				// const url = `${window.location.protocol}//${this.getHost()}${BASE_HREF}${data.ar.usdz}`;
				const url = `${window.location.protocol}//${this.getHost()}${BASE_HREF}try-in-ar.html?viewId=${data.id}`;
				console.log(url);
				const qrcode = new QRious({
					element: node.querySelector('.qrcode'),
					value: url,
					size: 256
				});
			}
		}
	}

	getHost() {
		let host = window.location.host.replace('127.0.0.1', '192.168.1.2');
		if (host.substr(host.length - 1, 1) === '/') {
			host = host.substr(0, host.length - 1);
		}
		return host;
	}

	close() {
		ModalService.reject();
	}

}

TryInARModalComponent.meta = {
	selector: '[try-in-ar-modal]'
};
