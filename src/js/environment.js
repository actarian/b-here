import { environmentServed } from "./environment.served";
import { environmentStatic } from "./environment.static";

export const NODE = (typeof module !== 'undefined' && module.exports);
export const PARAMS = NODE ? { get: () => { } } : new URLSearchParams(window.location.search);
export const DEBUG = false || (PARAMS.get('debug') != null);
export const BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
export const HEROKU = NODE ? false : (window && window.location.host.indexOf('herokuapp') !== -1);
export const STATIC = NODE ? false : (HEROKU || (window && (window.location.port === '41789' || window.location.port === '5000' || window.location.port === '6443' || window.location.host === 'actarian.github.io')));
export const DEVELOPMENT = NODE ? false : (window && ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.host.split(':')[0]) !== -1);
export const PRODUCTION = !DEVELOPMENT;
export const ENV = {
	STATIC,
	DEVELOPMENT,
	PRODUCTION
};

export class Environment {

	get STATIC() {
		return ENV.STATIC;
	}
	set STATIC(STATIC) {
		ENV.STATIC = (STATIC === true || STATIC === 'true');
		console.log('Environment.STATIC.set', ENV.STATIC);
	}

	get href() {
		if (HEROKU) {
			return this.githubDocs;
		} else {
			return BASE_HREF;
		}
	}

	getAbsoluteUrl(path, params) {
		let url = `${window.location.origin}${path}`;
		// let url = `${window.location.protocol}//${window.location.host}${path}`;
		Object.keys(params).forEach(key => {
			url = url.replace(`$${key}`, params[key]);
		});
		return url;
	}

	getPath(path) {
		return this.isLocal(path) ? (this.href + path) : path;
	}

	isLocal(path) {
		return path.indexOf('://') === -1;
	}

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}

const defaultOptions = {
	port: 5000,
	useToken: false,
	fontFamily: 'GT Walsheim',
	renderOrder: {
		panorama: 0,
		model: 10,
		plane: 20,
		tile: 30,
		banner: 40,
		nav: 50,
		panel: 60,
		menu: 70,
		debug: 80,
		pointer: 90,
	}
};

const defaultAppOptions = {
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	channelName: 'BHere',
};

const environmentOptions = window.STATIC ? environmentStatic : environmentServed;

const options = Object.assign(defaultOptions, defaultAppOptions, environmentOptions);

export const environment = new Environment(options);

environment.STATIC = window.STATIC;

console.log('environment', environment);
