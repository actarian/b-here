
export const environmentStatic = {
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	channelName: 'BHere',
	flags: {
		production: false,
		useProxy: true,
		useToken: false,
		useExtendedUserInfo: true,
		useEncryptedUrl: true,
		gdprRoutes: true,
		selfService: true,
		guidedTourRequest: true,
		guidedTourAccess: true,
		ssoLogin: false,
		ssoRegister: false,
		editor: true,
		editorAssetScreen: true,
		menu: true,
		menuEmbed: true,
		navmaps: true,
		screenShare: true,
		chat: true,
		ar: true,
		like: true,
		hideNavInfo: true,
		useIframe: true,
		attendee: true,
		streamer: true,
		viewer: true,
		smartDevice: true,
		selfServiceProposition: false,
		navInfoAnimated: false,
		navInfoImportantAnimated: false,
		navMoveAnimated: true,
		navMoveImportantAnimated: true,
		navPointAnimated: false,
		navPointImportantAnimated: false,
		navTitleAnimated: false,
		navTitleImportantAnimated: false,
		navTransparentAnimated: true,
		navTransparentImportantAnimated: true,
		useTextureEnvironment: true,
		usePaths: true,
		antialias: true,
		alpha: false,
		premultipliedAlpha: false,
	},
	sso: {
		issuer: 'bhere-sso',
		origin: `http://localhost:3010`,
		loginUrl: `http://localhost:3010/sso/login?redirectUrl={redirectUrl}`,
		logoutUrl: `http://localhost:3010/sso/logout?redirectUrl={redirectUrl}`,
		registerUrl: `http://localhost:3010/sso/register?redirectUrl={redirectUrl}`,
		verifyTokenUrl: `http://localhost:3010/sso/verifytoken?verifyToken={verifytoken}`,
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

		// attendee: "720p_2", // 1920 x 1080 x 30
		attendee: "1080p_2", // 1920 x 1080 x 30

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
	/*
	background: {
		// image: 'img/background.jpg',
		video: 'img/background.mp4',
	},
	*/
	selfServiceAudio: null, // 'audio/self-service.mp3',
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
		disabledViewTypes: ['waiting-room'],
		disabledViewItemTypes: ['texture'],
	},
	assets: '/docs/',
	dist: '/dist/',
	workers: {
		image: './js/workers/image.service.worker.js',
		prefetch: './js/workers/prefetch.service.worker.js',
	},
	textures: {
		envMap: 'textures/envMap/studio_small_03_2k.hdr',
		grid: 'textures/grid/grid.jpg',
	},
	toneMappingExposure: 1,
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/beta-bhere-sso/docs/',
	template: {
		email: {
			supportRequest: '/email/support-request.html',
		}
	},
};
