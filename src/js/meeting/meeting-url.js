import { environment } from '../environment';
import { RouterService } from '../router/router.service';
import { MeetingId } from './meeting-id';

export class MeetingUrl {

	get meetingId() {
		return this.link ? new MeetingId(this.link) : null;
	}

	constructor(options) {
		/*
		this.link = LocationService.get('link') || null;
		this.name = LocationService.get('name') || null;
		this.firstName = LocationService.get('firstName') || null;
		this.lastName = LocationService.get('lastName') || null;
		this.email = LocationService.get('email') || null;
		this.role = LocationService.get('role') || null;
		this.viewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : null;
		this.pathId = LocationService.has('pathId') ? parseInt(LocationService.get('pathId')) : null;
		this.embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
		this.support = LocationService.has('support') ? (LocationService.get('support') === 'true') : false;
		*/
		options = options || window.location.href;
		if (typeof options === 'string') {
			options = MeetingUrl.decompose(options);
		}
		if (typeof options === 'object') {
			Object.assign(this, options);
			if (options.user) {
				const name = MeetingUrl.getName(options.user);
				if (name) {
					this.name = name;
				}
				if (environment.flags.useExtendedUserInfo) {
					const firstName = MeetingUrl.getFirstName(options.user);
					if (firstName) {
						this.firstName = firstName;
					}
					const lastName = MeetingUrl.getLastName(options.user);
					if (lastName) {
						this.lastName = lastName;
					}
					const email = MeetingUrl.getEmail(options.user);
					if (email) {
						this.email = email;
					}
				}
			}
			if (options.name) {
				this.name = options.name;
			}
			if (environment.flags.useExtendedUserInfo) {
				if (options.firstName) {
					this.firstName = options.firstName;
				}
				if (options.lastName) {
					this.lastName = options.lastName;
				}
				if (options.email) {
					this.email = options.email;
				}
			}
		}
		this.link = this.link || null;
		this.name = this.name || null;
		this.firstName = this.firstName || null;
		this.lastName = this.lastName || null;
		this.email = this.email || null;
		this.role = this.role || null;
		this.viewId = this.viewId || null;
		this.pathId = this.pathId || null;
		this.embedViewId = this.embedViewId || null;
		this.support = this.support || false;
		// console.log('MeetingUrl', this);
	}

	toParams(shareable = false) {
		let params = {};
		if (this.link) {
			params.link = this.link;
		}
		if (environment.flags.useExtendedUserInfo) {
			if (this.firstName) {
				params.firstName = this.firstName;
			}
			if (this.lastName) {
				params.lastName = this.lastName;
			}
			if (this.email) {
				params.email = this.email;
			}
		} else {
			if (this.name) {
				params.name = this.name;
			}
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
		if (environment.flags.useEncryptedUrl) {
			params = {
				p: MeetingUrl.encrypt(params),
			};
		}
		return params;
	}

	toString(shareable = false) {
		let components;
		if (environment.flags.useExtendedUserInfo) {
			components = {
				link: this.link,
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				role: shareable ? null : this.role,
				viewId: this.viewId,
				pathId: this.pathId,
				support: this.support
			};
		} else {
			components = {
				link: this.link,
				name: this.name,
				role: shareable ? null : this.role,
				viewId: this.viewId,
				pathId: this.pathId,
				support: this.support
			};
		}
		return MeetingUrl.compose(components);
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
		input.value = window.location.origin + (asAccessCode ? MeetingUrl.getAccessCodeUrl(params) : MeetingUrl.getGuidedTourUrl(params));
		input.focus();
		input.select();
		input.setSelectionRange(0, 99999);
		document.execCommand('copy');
		input.parentNode.removeChild(input);
		alert(`link copiato!\n ${input.value}`);
	}

	replaceUrl() {
		RouterService.setCurrentParams(this.toParams());
	}

	static replaceWithOptions(options) {
		const currentOptions = MeetingUrl.decompose(window.location.href);
		const meetingUrl = new MeetingUrl(Object.assign(currentOptions, options));
		meetingUrl.replaceUrl();
		return meetingUrl;
	}

	static replaceWithUser(user) {
		return this.replaceWithOptions({ user });
	}

	static replaceWithName(name) {
		return this.replaceWithOptions({ name });
	}

	static replaceWithLink(link) {
		return this.replaceWithOptions({ link });
	}

	static getCurrentUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = route.name;
			// console.log('MeetingUrl.getCurrentUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
	}

	static getAccessCodeUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = `${route.params.lang}.accessCode`;
			// console.log('MeetingUrl.getAccessCodeUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
	}

	static getGuidedTourUrl(params = null) {
		const route = RouterService.route;
		if (route) {
			const routeName = `${route.params.lang}.guidedTour`;
			// console.log('MeetingUrl.getGuidedTourUrl', routeName);
			return RouterService.buildUrl(routeName, params);
		}
	}

	static getName(user) {
		return (user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
	}

	static getFirstName(user) {
		return (user && user.firstName ? user.firstName : null);
	}

	static getLastName(user) {
		return (user && user.lastName ? user.lastName : null);
	}

	static getEmail(user) {
		return (user && user.email ? user.email : null);
	}

	static compose(components) {
		if (environment.flags.useEncryptedUrl) {
			const p = MeetingUrl.encrypt(components);
			return `?p=${p}`;
		} else {
			components = Object.keys(components).map(key => {
				return { key, value: components[key] }
			}).filter(x => x.value != null && x.value !== false).map(x => `${x.key}=${x.value}`);
			return `?${components.join('&')}`;
		}
	}

	static decompose(url) {
		let components = {};
		if (environment.flags.useEncryptedUrl) {
			const params = new URLSearchParams(url.split('?')[1]);
			if (params.has('p')) {
				components = MeetingUrl.decrypt(params.get('p'));
			}
		} else if (url.indexOf('?') > -1) {
			const params = new URLSearchParams(url.split('?')[1]);
			params.forEach((value, key) => {
				switch (key) {
					case 'viewId':
					case 'pathId':
					case 'embedViewId':
						value = value ? parseInt(value) : null;
						break;
					case 'support':
						value = value ? (value === 'true') : false;
						break;
				}
				components[key] = value;
			});
		}
		return components;
	}

	static decrypt(p) {
		return JSON.parse(window.atob(p));
	}

	static encrypt(params) {
		return window.btoa(JSON.stringify(params));
	}

	static validateParams(components) {
		if (environment.flags.useEncryptedUrl) {
			const p = MeetingUrl.encrypt(components);
			return { p };
		} else {
			return components;
		}
	}

}
