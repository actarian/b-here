export default class LocationService {

	static has(key) {
		const params = new URLSearchParams(window.location.search);
		// console.log('LocationService.has', params);
		return params.has(key);
	}

	static get(key) {
		const params = new URLSearchParams(window.location.search);
		// console.log('LocationService.get', params);
		return params.get(key);
	}

	static set(keyOrValue, value) {
		const params = new URLSearchParams(window.location.search);
		if (typeof keyOrValue === 'string') {
			params.set(keyOrValue, value);
		} else {
			params.set(keyOrValue, '');
		}
		this.pushParams(params);
		// console.log('LocationService.set', params, keyOrValue, value);
	}

	static delete(key) {
		const params = new URLSearchParams(window.location.search);
		// console.log('LocationService.has', params);
		if (params.has(key)) {
			params.delete(key);
			this.pushParams(params);
		}
	}

	static pushParams(params) {
		if (window.history && window.history.pushState) {
			const title = document.title;
			const url = `${window.location.href.split('?')[0]}?${params.toString()}`;
			window.history.pushState(params.toString(), title, url);
		}
	}

	static replace(from, to) {
		const history = window.history;
		if (history && history.replaceState) {
			const location = window.location;
			const title = document.title;
			if (location.pathname === '/') {
				const url = location.origin + to + location.search;
				history.replaceState(history.state, title, url);
			} else if (location.href.indexOf(from) !== -1) {
				const url = location.href.replace(from, to);
				history.replaceState(history.state, title, url);
			}
		}
	}

	static deserialize(key) {
		const encoded = this.get('params');
		return this.decode(key, encoded);
	}

	static serialize(keyOrValue, value) {
		const params = this.deserialize();
		const encoded = this.encode(keyOrValue, value, params);
		this.set('params', encoded);
	}

	static decode(key, encoded) {
		let decoded = null;
		if (encoded) {
			const json = window.atob(encoded);
			decoded = JSON.parse(json);
		}
		if (key && decoded) {
			decoded = decoded[key];
		}
		return decoded || null;
	}

	static encode(keyOrValue, value, params) {
		params = params || {};
		let encoded = null;
		if (typeof keyOrValue === 'string') {
			params[keyOrValue] = value;
		} else {
			params = keyOrValue;
		}
		const json = JSON.stringify(params);
		encoded = window.btoa(json);
		return encoded;
	}

}
