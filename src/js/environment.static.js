
export const environmentStatic = {
	appKey: '1a066259928f4b40a243647b58aca42e',
	channelName: 'BHere',
	flags: {
		production: false,
		useToken: false,
		selfService: true,
		guidedTourRequest: true,
		editor: true,
		ar: false,
		menu: true,
		attendee: false,
		streamer: true,
		viewer: false,
		maxQuality: false,
	},
	logo: './img/logo-ipf-access.png',
	background: {
		image: '/b-here/img/background.jpg',
		video: '/b-here/img/background.mp4',
	},
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
	assets: './',
	worker: './js/workers/image.service.worker.js',
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-ipf/docs/',
	language: '',
	market: '',
	url: {
		index: '/',
		access: '/',
		editor: '/editor',
		selfServiceTour: '/self-service-tour',
		guidedTour: '/guided-tour',
	},
	template: {
		tryInAr: '/try-in-ar.html?viewId=$viewId',
		modal: {
			controlRequest: '/control-request-modal.html',
			tryInAr: '/try-in-ar-modal.html',
			view: {
				'panorama': '/panorama-modal.html',
				'panorama-grid': '/panorama-grid-modal.html',
				'room-3d': '/room-3d-modal.html',
				'model': '/model-modal.html',
			},
			viewItem: {
				'nav': '/nav-modal.html',
				'plane': '/plane-modal.html',
				'curved-plane': '/curved-plane-modal.html',
				'texture': '/texture-modal.html',
				'gltf': '/gltf-modal.html',
			},
			remove: '/remove-modal.html',
		}
	}
};
