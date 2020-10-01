import { Component, getContext } from 'rxcomp';
import { environment, STATIC } from '../environment';
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
				// const url = `${environment.host}${data.ar.usdz}`;
				const url = STATIC ? `${environment.host}try-in-ar.html?viewId=${data.id}` : `/template/modules/b-here/try-in-ar.cshtml?viewId=${data.id}`;
				console.log('TryInARModalComponent.onInit.url', url);
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

}

TryInARModalComponent.meta = {
	selector: '[try-in-ar-modal]'
};
