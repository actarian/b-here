import { Component } from 'rxcomp';
import { ModalService } from '../modal/modal.service';

export default class AgoraConfigureFirewallModalComponent extends Component {

	onClose() {
		ModalService.resolve();
	}
}

AgoraConfigureFirewallModalComponent.meta = {
	selector: '[agora-configure-firewall-modal]',
	template: /* html */`
		<div class="modal__header">
			<button type="button" class="btn--close" (click)="onClose()">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="container">
			<div class="form" [innerHTML]="'bhere_configure_firewall' | label"></div>
			<div class="group--cta">
				<button type="button" class="btn--accept" (click)="onClose()">
					<span>Chiudi</span>
				</button>
			</div>
		</div>
	`,
};

AgoraConfigureFirewallModalComponent.chunk = () => /* html */`<div class="configure-firewall-modal" agora-configure-firewall-modal></div>`;
