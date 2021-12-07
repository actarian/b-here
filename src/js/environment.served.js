
export const environmentServed = {
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	channelName: 'BHere',
	flags: {
		production: true,
		useProxy: false,
		useToken: false,
		selfService: true,
		guidedTourRequest: true,
		editor: false,
		editorAssetScreen: false,
		menu: true,
		menuEmbed: false,
		navmaps: false,
		chat: false,
		ar: true,
		like: true,
		hideNavInfo: true,
		attendee: true,
		streamer: true,
		viewer: true,
		smartDevice: true,
		selfServiceProposition: false,
		navInfoAnimated: false,
		navInfoImportantAnimated: false,
		navMoveAnimated: false,
		navMoveImportantAnimated: false,
		navPointAnimated: false,
		navPointImportantAnimated: false,
		navTitleAnimated: false,
		navTitleImportantAnimated: false,
		navTransparentAnimated: false,
		navTransparentImportantAnimated: false,
		// maxQuality: false,
	},
	navs: {
		iconMinScale: 1,
		iconMaxScale: 1.4,
	},
	profiles: {
		// streamer: "480p_1", // 640 x 480 x 15
		streamer: "480p_2", // 640 x 480 x 30
		// streamer: "480p_3", // 480 x 480 x 15
		// streamer: "480p_4", // 640 x 480 x 30
		// streamer: "480p_6", // 480 x 480 x 30
		// streamer: "480p_8", // 848, 480 x 15
		// streamer: "480p_9", // 848, 480 x 30
		// streamer: "480p_10", // 640 x 480 x 10
		// streamer: "720p_1", // 1280 x 720 x 15
		// streamer: "720p_2", // 1280 x 720 x 30
		// streamer: "720p_3", // 1280 x 720 x 30
		// streamer: "720p_5", // 960 x 720 x 15
		// streamer: "720p_6", // 960 x 720 x 30
		// streamer: "1080p_1", // 1920 x 1080 x 15
		// streamer: "1080p_2", // 1920 x 1080 x 30
		// streamer: "1080p_3", // 1920 x 1080 x 30
		// streamer: "1080p_5", // 1920 x 1080 x 60

		// publisher: "720p_2", // 1920 x 1080 x 30
		publisher: "1080p_2", // 1920 x 1080 x 30

		// screen: "480p_1", // 640 × 480 x 5
		// screen: "480p_2", // 640 × 480 x 30
		// screen: "720p_1", // 1280 × 720 x 5
		screen: "720p_2", // 1280 × 720 x 30
		// screen: "1080p_1", // 1920 × 1080 x 5
		// screen: "1080p_2", // 1920 × 1080 30
	},
	logo: null,
	background: {
		// image: '/Modules/B-Here/Client/docs/img/background.jpg',
		video: '/Modules/B-Here/Client/docs/img/background.mp4',
	},
	selfServiceAudio: null, // '/Modules/B-Here/Client/docs/audio/self-service.mp3',
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
	assets: '/Modules/B-Here/Client/docs/',
	workers: {
		image: '/Modules/B-Here/Client/docs/js/workers/image.service.worker.js',
		prefetch: '/Modules/B-Here/Client/docs/js/workers/prefetch.service.worker.js',
	},
	textures: {
		envMap: 'textures/envMap/flower_road_1k.hdr',
		grid: 'textures/grid/grid.jpg',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-demo/docs/',
	template: {
		tryInAr: '/template/modules/b-here/try-in-ar.cshtml?viewId=$viewId',
		modal: {
			configureFirewall: '/template/modules/b-here/configure-firewall-modal.cshtml',
			controlRequest: '/template/modules/b-here/control-request-modal.cshtml',
			supportRequest: '/template/modules/b-here/support-request-modal.cshtml',
			tryInAr: '/template/modules/b-here/try-in-ar-modal.cshtml',
			view: {
				'panorama': '/template/modules/b-here/panorama-modal.cshtml',
				'panorama-grid': '/template/modules/b-here/panorama-grid-modal.cshtml',
				'room-3d': '/template/modules/b-here/room-3d-modal.cshtml',
				'model': '/template/modules/b-here/model-modal.cshtml',
				'media': '/template/modules/b-here/media-modal.cshtml',
			},
			viewItem: {
				'nav': '/template/modules/b-here/nav-modal.cshtml',
				'plane': '/template/modules/b-here/plane-modal.cshtml',
				'curved-plane': '/template/modules/b-here/curved-plane-modal.cshtml',
				'texture': '/template/modules/b-here/texture-modal.cshtml',
				'model': '/template/modules/b-here/item-model-modal.cshtml',
			},
			navmap: '/template/modules/b-here/navmap-modal.cshtml',
			navmapItem: '/template/modules/b-here/navmap-item-modal.cshtml',
			remove: '/template/modules/b-here/remove-modal.cshtml',
		},
		email: {
			supportRequest: '/template/modules/b-here/email/support-request.cshtml',
		}
	},
};
