import { Component, getContext } from 'rxcomp';
import { CHUNK_BACKGROUND, CHUNK_CREDITS, CHUNK_LANGUAGE, CHUNK_LOGO } from '../agora/agora.component.chunks';
import { MeetingUrl } from '../meeting/meeting-url';
import { RouterOutletStructure } from '../router/router-outlet.structure';
// import { RouterService } from '../router/router.service';

export default class AccessCodeComponent extends Component {

	onInit() {
		this.state = {};
		const meetingUrl = new MeetingUrl();
		if (!meetingUrl.link) {
			// !!!
			// RouterService.setRouterLink(MeetingUrl.getGuidedTourUrl());
			window.location.href = window.location.origin + MeetingUrl.getGuidedTourUrl();
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
	hosts: { host: RouterOutletStructure },
	template: /* html */`
		<div class="page page--access-code">
			${CHUNK_BACKGROUND}
			<!-- access-code -->
			<div class="ui ui--info ui--info-centered">
				<div class="group--info">
					<div class="group--info__content stagger--childs">
						<div class="title" [innerHTML]="'access_code_title' | label"></div>
						<div class="picture">
							<canvas class="qrcode"></canvas>
						</div>
					</div>
				</div>
			</div>
			${CHUNK_LOGO}
			${CHUNK_CREDITS}
			${CHUNK_LANGUAGE}
		</div>
	`,
};
