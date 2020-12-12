
export const environmentServed = {
	appKey: 'f1deb54cb8934ba184a39bb53c2e1f6f',
	channelName: 'BHere',
	flags: {
		production: true,
		useProxy: false,
		useToken: true,
		selfService: false,
		guidedTourRequest: true,
		editor: false,
		ar: false,
		menu: true,
		attendee: false,
		streamer: true,
		viewer: false,
		maxQuality: false,
	},
	logo: '/Modules/B-Here/Client/docs/img/logo-ernestomeda-white.png',
	background: {
		image: '/Modules/B-Here/Client/docs/img/background.jpg',
		video: '/Modules/B-Here/Client/docs/img/background.mp4',
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
	assets: '/Modules/B-Here/Client/docs/',
	worker: '/Modules/B-Here/Client/docs/js/workers/image.service.worker.js',
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-ernestomeda/docs/',
	language: '/it',
	market: '/it',
	url: {
		index: '/',
		access: '/',
		editor: '/editor',
		selfServiceTour: '/self-service-tour',
		guidedTour: '/guided-tour',
	},
	template: {
		tryInAr: '/template/modules/b-here/try-in-ar.cshtml?viewId=$viewId',
		modal: {
			controlRequest: '/template/modules/b-here/control-request-modal.cshtml',
			tryInAr: '/template/modules/b-here/try-in-ar-modal.cshtml',
			view: {
				'panorama': '/template/modules/b-here/panorama-modal.cshtml',
				'panorama-grid': '/template/modules/b-here/panorama-grid-modal.cshtml',
				'room-3d': '/template/modules/b-here/room-3d-modal.cshtml',
				'model': '/template/modules/b-here/model-modal.cshtml',
			},
			viewItem: {
				'nav': '/template/modules/b-here/nav-modal.cshtml',
				'plane': '/template/modules/b-here/plane-modal.cshtml',
				'curved-plane': '/template/modules/b-here/curved-plane-modal.cshtml',
				'texture': '/template/modules/b-here/texture-modal.cshtml',
				'model': '/template/modules/b-here/item-model-modal.cshtml',
			},
			remove: '/template/modules/b-here/remove-modal.cshtml',
		}
	}
};
