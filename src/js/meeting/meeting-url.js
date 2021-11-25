import { environment } from '../environment';
import LocationService from '../location/location.service';
import { MeetingId } from './meeting-id';

export class MeetingUrl {

	get meetingId() {
		return this.link ? new MeetingId(this.link) : null;
	}

	constructor(options) {
		this.link = LocationService.get('link') || null;
		this.name = LocationService.get('name') || null;
		this.role = LocationService.get('role') || null;
		this.viewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : null;
		this.embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
		this.support = LocationService.has('support') ? (LocationService.get('support') === 'true') : false;
		if (typeof options === 'string') {
			options = MeetingUrl.decompose(options);
		}
		if (typeof options === 'object') {
			if (options.link) {
				this.link = options.link;
			}
			if (options.user) {
				const name = MeetingUrl.getName(options.user);
				if (name) {
					this.name = name;
				}
			}
			if (options.name) {
				this.name = options.name;
			}
			if (options.role) {
				this.role = options.role;
			}
			if (options.viewId) {
				this.viewId = options.viewId;
			}
			if (options.embedViewId) {
				this.embedViewId = options.embedViewId;
			}
			if (options.support) {
				this.support = options.support;
			}
		}
	}

	toString(shareable = false) {
		return MeetingUrl.compose(this.link, this.name, shareable ? null : this.role, this.viewId, this.support);
	}

	toUrl() {
		const query = this.toString();
		return MeetingUrl.getCurrentUrl(query);
	}

	toAccessCodeUrl() {
		const query = this.toString();
		return MeetingUrl.getAccessCodeUrl(query);
	}

	toGuidedTourUrl() {
		const query = this.toString();
		return MeetingUrl.getGuidedTourUrl(query);
	}

	copyToClipBoard(asAccessCode = false) {
		const input = document.createElement('input');
		input.style.position = 'absolute';
		input.style.top = '1000vh';
		// input.style.visibility = 'hidden';
		document.querySelector('body').appendChild(input);
		const query = this.toString(true);
		input.value = asAccessCode ? MeetingUrl.getAccessCodeUrl(query) : MeetingUrl.getGuidedTourUrl(query);
		input.focus();
		input.select();
		input.setSelectionRange(0, 99999);
		document.execCommand('copy');
		input.parentNode.removeChild(input);
		alert(`link copiato!\n ${input.value}`);
	}

	replaceUrl() {
		if ('history' in window) {
			const query = this.toString();
			const url = MeetingUrl.getCurrentUrl(query);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
	}

	static replaceWithUser(user) {
		const meetingUrl = new MeetingUrl({ user });
		meetingUrl.replaceUrl();
		return meetingUrl;
	}

	static replaceWithName(name) {
		const meetingUrl = new MeetingUrl({ name });
		meetingUrl.replaceUrl();
		return meetingUrl;
	}

	static replaceWithLink(link) {
		const meetingUrl = new MeetingUrl({ link });
		meetingUrl.replaceUrl();
		return meetingUrl;
	}

	static getCurrentUrl(query = '') {
		const url = `${window.location.origin}${window.location.pathname}${query}`;
		return url;
	}

	static getAccessCodeUrl(query = '') {
		const url = `${window.location.origin}${environment.url.accessCode}${query}`;
		return url;
	}

	static getGuidedTourUrl(query = '') {
		const url = `${window.location.origin}${environment.url.guidedTour}${query}`;
		return url;
	}

	static getName(user) {
		return (user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
	}

	static compose(link, name, role, viewId, support) {
		let components = { link, name, role, viewId, support };
		components = Object.keys(components).map(key => {
			return { key, value: components[key] }
		}).filter(x => x.value != null && x.value !== false).map(x => `${x.key}=${x.value}`);
		return `?${components.join('&')}`;
		// return `?link=${link}${name ? `&name=${name}` : ''}${role ? `&role=${role}` : ''}${viewId ? `&viewId=${viewId}` : ''}${support ? `&support=${support}` : ''}`;
	}

	static decompose(url) {
		const components = {};
		url.split('?')[1].split('&').forEach(keyvalue => {
			const key = keyvalue.split('=')[0];
			const value = keyvalue.split('=')[1];
			components[key] = value;
		});
		return components;
	}
}
