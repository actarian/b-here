import { Component, getContext } from 'rxcomp';
import { RouterService } from '../../../../../../rxcomp-router';
import { MeetingUrl } from '../meeting/meeting-url';

export default class AccessCodeComponent extends Component {

	onInit() {
		this.state = {};
		const meetingUrl = new MeetingUrl();
		if (!meetingUrl.link) {
			RouterService.setRouterLink(MeetingUrl.getGuidedTourUrl());
			// window.location.href = MeetingUrl.getGuidedTourUrl();
		} else {
			const url = meetingUrl.toGuidedTourUrl();
			const { node } = getContext(this);
			const qrcode = new QRious({
				element: node.querySelector('.qrcode'),
				value: url,
				size: 256
			});
		}
	}

}

AccessCodeComponent.meta = {
	selector: '[access-code-component]',
};
