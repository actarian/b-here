export const NODE = (typeof module !== 'undefined' && module.exports);
export const PARAMS = NODE ? { get: () => { } } : new URLSearchParams(window.location.search);
export const DEBUG = false || (PARAMS.get('debug') != null);
export const BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
export const HEROKU = NODE ? false : (window && (window.location.host.indexOf('herokuapp') !== -1 || window.location.port === '5000'));
export const STATIC = NODE ? false : (HEROKU || (window && (window.location.port === '41789' || window.location.host === 'actarian.github.io')));
export const DEVELOPMENT = NODE ? false : (window && ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.host.split(':')[0]) !== -1);
export const PRODUCTION = !DEVELOPMENT;
export const ENV = {
	STATIC,
	DEVELOPMENT,
	PRODUCTION
};

export class Environment {

	get href() {
		if (HEROKU) {
			return 'https://raw.githubusercontent.com/actarian/b-here/cantinavirtuali/docs/';
		} else {
			return BASE_HREF;
		}
	}

	get host() {
		let host = window.location.host.replace('127.0.0.1', '192.168.1.2');
		// let host = window.location.host;
		if (host.substr(host.length - 1, 1) === '/') {
			host = host.substr(0, host.length - 1);
		}
		return `${window.location.protocol}//${host}${BASE_HREF}`;
	}

	getModelPath(path) {
		return STATIC ? (this.href + this.paths.models + path) : path;
	}

	getTexturePath(path) {
		return STATIC ? (this.href + this.paths.textures + path) : path;
	}

	getFontPath(path) {
		return STATIC ? (this.href + this.paths.fonts + path) : path;
	}

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}

}

export const environment = new Environment({
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	appCertificate: '',
	channelName: 'BHere',
	publisherId: '999',
	debugMeetingId: '1591366622325',
	port: 5000,
	apiEnabled: false,
	views: {
		tryInArModal: 2162,
		controlRequestModal: 2163,
	},
	paths: {
		models: 'models/',
		textures: 'textures/',
		fonts: 'fonts/',
	},
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
});
