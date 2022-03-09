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

	onClose() {
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
	selector: '[try-in-ar-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form">
				<div class="title">Inquadra il qrcode con il cellulare o il tablet per vedere il VR.</div>
				<div class="picture">
					<canvas class="qrcode"></canvas>
				</div>
				<div class="group--cta">
					<button type="button" class="btn--accept" (click)="onClose()">
						<span>Chiudi</span>
					</button>
				</div>
			</div>
		</div>
	`,
};

TryInARModalComponent.chunk = () => /* html */`<div class="try-in-ar-modal" try-in-ar-modal></div>`;

