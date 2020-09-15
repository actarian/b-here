import { BASE_HREF, environment, STATIC } from "../environment";

const STATIC_MODALS = {
	controlRequest: 'control-request-modal.html',
	tryInAr: 'try-in-ar-modal.html',
	view: {
		'panorama': 'panorama-modal.html',
		'panorama-grid': 'panorama-grid-modal.html',
		'room-3d': 'room-3d-modal.html',
		'model': 'model-modal.html',
	},
	viewItem: {
		'nav': 'nav-modal.html',
		'plane': 'plane-modal.html',
		'curved-plane': 'curved-plane-modal.html',
		'texture': 'texture-modal.html',
		'gltf': 'gltf-modal.html',
	}
};

const SERVER_MODALS = {
	controlRequest: environment.views.controlRequestModal,
	tryInAr: environment.views.tryInArModal,
	view: {
		'panorama': 2000,
		'panorama-grid': 2001,
		'room-3d': 2002,
		'model': 2003,
	},
	viewItem: {
		'nav': 2004,
		'plane': 2005,
		'curved-plane': 2006,
		'texture': 2007,
		'gltf': 2008,
	}
};

export default class ModalSrcService {

	static get(...keys) {
		let src = STATIC_MODALS;
		keys.forEach(key => src = typeof src === 'object' ? src[key] : null);
		return STATIC ? BASE_HREF + src : `/viewdoc.cshtml?co_id=${src}`;
	}

}
