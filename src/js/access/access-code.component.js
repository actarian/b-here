import { Component, getContext } from 'rxcomp';
import { environment } from '../environment';
import LocationService from '../location/location.service';

export default class AccessCodeComponent extends Component {

	onInit() {
		this.env = environment;
		const link = LocationService.get('link');
		if (!link) {
			window.location.href = `${window.location.origin}${environment.url.guidedTour}`;
		}
		const url = `${window.location.origin}${environment.url.guidedTour}?link=${link}`;
		const { node } = getContext(this);
		const qrcode = new QRious({
			element: node.querySelector('.qrcode'),
			value: url,
			size: 256
		});
	}
}

AccessCodeComponent.meta = {
	selector: '[access-code-component]',
};
