import { Component } from 'rxcomp';
import ModalService from '../modal/modal.service';

export default class AgoraConfigureFirewallModalComponent extends Component {

	onClose() {
		ModalService.resolve();
	}
}

AgoraConfigureFirewallModalComponent.meta = {
	selector: '[agora-configure-firewall-modal]'
};
