import { BASE_HREF, STATIC } from "../environment";

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
	},
	remove: 'remove-modal.html',
};

const SERVER_MODALS = {
	controlRequest: 'control-request-modal.cshtml',
	tryInAr: 'try-in-ar-modal.cshtml',
	view: {
		'panorama': 'panorama-modal.cshtml',
		'panorama-grid': 'panorama-grid-modal.cshtml',
		'room-3d': 'room-3d-modal.cshtml',
		'model': 'model-modal.cshtml',
	},
	viewItem: {
		'nav': 'nav-modal.cshtml',
		'plane': 'plane-modal.cshtml',
		'curved-plane': 'curved-plane-modal.cshtml',
		'texture': 'texture-modal.cshtml',
		'gltf': 'gltf-modal.cshtml',
	},
};

export default class ModalSrcService {

	static get(...keys) {
		let src = STATIC ? STATIC_MODALS : SERVER_MODALS;
		keys.forEach(key => src = typeof src === 'object' ? src[key] : null);
		return STATIC ? BASE_HREF + src : `/template/modules/b-here/${src}`;
		// return STATIC ? BASE_HREF + src : `/viewdoc.cshtml?co_id=${src}`;
	}

}
