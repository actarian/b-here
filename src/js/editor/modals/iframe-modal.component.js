import { Component } from 'rxcomp';
import { ModalService } from '../../modal/modal.service';

export default class IframeModalComponent extends Component {
	onClose() {
		ModalService.reject();
	}
}

IframeModalComponent.meta = {
	selector: '[iframe-modal]',
	inputs: ['src'],
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="modal__content">
			<iframe [src]="src"></iframe>
		</div>
	`,
};

IframeModalComponent.chunk = (src) => /* html */`<div class="iframe-modal" iframe-modal src="${src}"></div>`;
