import { environment } from '../environment';

const URLS = {
	index: '/',
	access: '/',
	editor: '/editor',
	bHere: '/b-here',
	selfServiceTour: '/self-service-tour',
	guidedTour: '/guided-tour',
};

export class UrlService {

	static get(...keys) {
		let url = URLS;
		keys.forEach(key => url = typeof url === 'object' ? url[key] : null);
		return environment.STATIC ? url : `/it/it${url}`;
	}

	static redirect(...keys) {
		const url = this.get.apply(this, keys);
		window.location.href = url;
	}

}
