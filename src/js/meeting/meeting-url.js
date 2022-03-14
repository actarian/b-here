import LocationService from '../location/location.service';
import RouterService from '../router/router.service';
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
		this.pathId = LocationService.has('pathId') ? parseInt(LocationService.get('pathId')) : null;
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
			if (options.pathId) {
				this.pathId = options.pathId;
			}
			if (options.embedViewId) {
				this.embedViewId = options.embedViewId;
			}
			if (options.support) {
				this.support = options.support;
			}
		}
	}

	toParams(shareable = false) {
		const params = {};
		if (this.link) {
			params.link = this.link;
		}
		if (this.name) {
			params.name = this.name;
		}
		if (this.role && !shareable) {
			params.role = this.role;
		}
		if (this.viewId) {
			params.viewId = this.viewId;
		}
		if (this.pathId) {
			params.pathId = this.pathId;
		}
		if (this.support) {
			params.support = this.support;
		}
		return params;
	}

	toString(shareable = false) {
		return MeetingUrl.compose(this.link, this.name, shareable ? null : this.role, this.viewId, this.pathId, this.support);
	}

	toUrl() {
		const params = this.toParams();
		return MeetingUrl.getCurrentUrl(params);
	}

	toAccessCodeUrl() {
		const params = this.toParams();
		return MeetingUrl.getAccessCodeUrl(params);
	}

	toGuidedTourUrl() {
		const params = this.toParams();
		return MeetingUrl.getGuidedTourUrl(params);
	}

	copyToClipBoard(asAccessCode = false) {
		const input = document.createElement('input');
		input.style.position = 'absolute';
		input.style.top = '1000vh';
		// input.style.visibility = 'hidden';
		document.querySelector('body').appendChild(input);
		const params = this.toParams(true);
		input.value = asAccessCode ? MeetingUrl.getAccessCodeUrl(params) : MeetingUrl.getGuidedTourUrl(params);
		input.focus();
		input.select();
		input.setSelectionRange(0, 99999);
		document.execCommand('copy');
		input.parentNode.removeChild(input);
		alert(`link copiato!\n ${input.value}`);
	}

	replaceUrl() {
		RouterService.setCurrentParams(this.toParams());
		/*
		if ('history' in window) {
			const query = this.toString();
			const url = MeetingUrl.getCurrentUrl(query);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
		*/
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

	static getCurrentUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = route.name;
			console.log('MeetingUrl.getCurrentUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
		/*
		const url = `${window.location.origin}${window.location.pathname}${query}`;
		return url;
		*/
	}

	static getAccessCodeUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = `${route.params.lang}.accessCode`;
			console.log('MeetingUrl.getAccessCodeUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
		/*
		const url = `${window.location.origin}${environment.url.accessCode}${query}`;
		return url;
		*/
	}

	static getGuidedTourUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = `${route.params.lang}.guidedTour`;
			console.log('MeetingUrl.getGuidedTourUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
		/*
		const url = `${window.location.origin}${environment.url.guidedTour}${query}`;
		return url;
		*/
	}

	static getName(user) {
		return (user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
	}

	static compose(link, name, role, viewId, pathId, support) {
		let components = { link, name, role, viewId, pathId, support };
		components = Object.keys(components).map(key => {
			return { key, value: components[key] }
		}).filter(x => x.value != null && x.value !== false).map(x => `${x.key}=${x.value}`);
		return `?${components.join('&')}`;
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
