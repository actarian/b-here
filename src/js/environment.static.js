
export const environmentStatic = {
	appKey: '04ce14386a134bdc8a98e9e84a0cf162',
	channelName: 'BHere',
	flags: {
		production: false,
		useProxy: false,
		useToken: false,
		selfService: false,
		guidedTourRequest: true,
		editor: true,
		ar: false,
		menu: true,
		attendee: false,
		streamer: true,
		viewer: false,
		maxQuality: false,
	},
	logo: './img/logo-ernestomeda-white.png',
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
	editor: {
		disabledViewTypes: ['waiting-room', 'room-3d', 'model'],
		disabledViewItemTypes: ['texture', 'model'],
	},
	assets: './',
	worker: './js/workers/image.service.worker.js',
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-ernestomeda/docs/',
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
				'model': '/item-model-modal.html',
			},
			remove: '/remove-modal.html',
		}
	}
};
