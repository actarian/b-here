import { environmentServed } from './environment.served';
import { environmentStatic } from './environment.static';
import { Utils } from './utils/utils';

export const NODE = (typeof module !== 'undefined' && module.exports);
export const PARAMS = NODE ? { get: () => { } } : new URLSearchParams(window.location.search);
export const DEBUG = false || (PARAMS.get('debug') != null);
export const BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
export const HEROKU = NODE ? false : (window && window.location.host.indexOf('herokuapp') !== -1);
export const VERCEL = NODE ? false : (window && window.location.host.indexOf('vercel.app') !== -1);
export const DEPLOYED = HEROKU || VERCEL;
export const STATIC = NODE ? false : (DEPLOYED || (window && (window.location.port === '41789' || window.location.port === '5000' || window.location.port === '6443' || window.location.host === 'actarian.github.io')));
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
		if (DEPLOYED) {
			return this.githubDocs;
		} else {
			return this.assets;
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

	merge(options) {
		if (options) {
			Utils.merge(this, options);
		}
	}

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}

const defaultOptions = {
	port: 5000,
	// fontFamily: 'GT Walsheim, sans-serif',
	fontFamily: 'Work Sans, sans-serif',
	colors: {
		menuBackground: '#000000',
		menuForeground: '#ffffff',
		menuOverBackground: '#0099ff',
		menuOverForeground: '#ffffff',
		menuBackBackground: '#0099ff',
		menuBackForeground: '#000000',
		menuBackOverBackground: '#0099ff',
		menuBackOverForeground: '#ffffff',
	},
	editor: {
		disabledViewTypes: ['waiting-room', 'room-3d', 'media'],
		disabledViewItemTypes: ['texture'],
	},
	renderOrder: {
		panorama: 0,
		room: 10,
		plane: 20,
		tile: 30,
		model: 40,
		banner: 50,
		nav: 60,
		panel: 70,
		menu: 80,
		debug: 90,
		pointer: 100,
	}
};

const defaultAppOptions = {
	channelName: 'BHere',
	flags: {
		heroku: HEROKU,
		vercel: VERCEL,
		deployed: DEPLOYED,
	},
	navs: {
		iconMinScale: 1,
		iconMaxScale: 1.4,
	},
	url: {},
	languages: ['it', 'en'],
	defaultLanguage: 'it',
	labels: {},
	data: {},
	fields: [],
};

const environmentOptions = window.STATIC ? environmentStatic : environmentServed;

let options = Object.assign(defaultOptions, defaultAppOptions, environmentOptions);
options = Utils.merge(options, window.bhere);

export const environment = new Environment(options);

console.log('environment', environment);
