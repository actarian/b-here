
export const environmentStatic = {
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	channelName: 'BHere',
	flags: {
		production: false,
		useProxy: true,
		useToken: false,
		selfService: true,
		guidedTourRequest: true,
		editor: true,
		editorAssetScreen: true,
		menu: true,
		menuEmbed: true,
		navmaps: true,
		chat: true,
		ar: true,
		like: false,
		hideNavInfo: true,
		attendee: true,
		streamer: true,
		viewer: true,
		smartDevice: true,
		selfServiceProposition: true,
		// maxQuality: false,
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
		// screen: "720p_2", // 1280 × 720 x 30
		// screen: "1080p_1", // 1920 × 1080 x 5
		screen: "1080p_2", // 1920 × 1080 30
	},
	logo: null,
	background: {
		// image: '/b-here/img/background.jpg',
		video: '/b-here/img/background.mp4',
	},
	selfServiceAudio: '/b-here/audio/self-service.mp3',
	colors: {
		menuBackground: '#000000',
		menuForeground: '#ffffff',
		menuOverBackground: '#74716c',
		menuOverForeground: '#ffffff',
		menuBackBackground: '#74716c',
		menuBackForeground: '#000000',
		menuBackOverBackground: '#74716c',
		menuBackOverForeground: '#ffffff',
	},
	editor: {
		disabledViewTypes: ['waiting-room'],
		disabledViewItemTypes: ['texture'],
	},
	assets: '/b-here/',
	workers: {
		image: './js/workers/image.service.worker.js',
		prefetch: './js/workers/prefetch.service.worker.js',
	},
	textures: {
		envMap: 'textures/envMap/flower_road_1k.hdr',
		grid: 'textures/grid/grid.jpg',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-ws-new/docs/',
	template: {
		tryInAr: '/try-in-ar.html?viewId=$viewId',
		modal: {
			configureFirewall: '/configure-firewall-modal.html',
			controlRequest: '/control-request-modal.html',
			supportRequest: '/support-request-modal.html',
			tryInAr: '/try-in-ar-modal.html',
			view: {
				'panorama': '/panorama-modal.html',
				'panorama-grid': '/panorama-grid-modal.html',
				'room-3d': '/room-3d-modal.html',
				'model': '/model-modal.html',
				'media': '/media-modal.html',
			},
			viewItem: {
				'nav': '/nav-modal.html',
				'plane': '/plane-modal.html',
				'curved-plane': '/curved-plane-modal.html',
				'texture': '/texture-modal.html',
				'model': '/item-model-modal.html',
			},
			navmap: '/navmap-modal.html',
			navmapItem: '/navmap-item-modal.html',
			remove: '/remove-modal.html',
		},
		email: {
			supportRequest: '/email/support-request.html',
		}
	},
};
