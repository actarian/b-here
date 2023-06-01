import { environment } from '../environment';
import { RoleType } from '../user/user';

export const USE_AUTODETECT = false;
export const USE_VOLUME_INDICATOR = false;
export const USE_RTM = true;

export const VIDEO_PROFILES = [
	/*
	['120p_1', 160, 120, 15, 65, false]],
	['120p_3', 120, 120, 15, 50, false]],
	['180p_1', 320, 180, 15, 140, false]],
	['180p_3', 180, 180, 15, 100, false]],
	['180p_4', 240, 180, 15, 120, false]],
	['240p_1', 320, 240, 15, 200, false]],
	['240p_3', 240, 240, 15, 140, false]],
	['240p_4', 424, 240, 15, 220, false]],
	['360p_1', 640, 360, 15, 400, false]],
	['360p_3', 360, 360, 15, 260, false]],
	['360p_4', 640, 360, 30, 600, false]],
	['360p_6', 360, 360, 30, 400, false]],
	['360p_7', 480, 360, 15, 320, false]],
	['360p_8', 480, 360, 30, 490, false]],
	['360p_9', 640, 360, 15, 800, false]],
	['360p_10', 640, 360, 24, 800, false]],
	['360p_11', 640, 360, 24, 1000, false]],
	*/
	['480p_1', 640, 480, 15, 500, true],
	['480p_2', 640, 480, 30, 1000, true],
	['480p_3', 480, 480, 15, 400, true],
	['480p_4', 640, 480, 30, 750, true],
	['480p_6', 480, 480, 30, 600, true],
	['480p_8', 848, 480, 15, 610, true],
	['480p_9', 848, 480, 30, 930, true],
	['480p_10', 640, 480, 10, 400, true],
	['720p_1', 1280, 720, 15, 1130, true],
	['720p_2', 1280, 720, 30, 2000, true],
	['720p_3', 1280, 720, 30, 1710, true],
	['720p_5', 960, 720, 15, 910, true],
	['720p_6', 960, 720, 30, 1380, true],
	['1080p_1', 1920, 1080, 15, 2080, false],
	['1080p_2', 1920, 1080, 30, 3000, false],
	['1080p_3', 1920, 1080, 30, 3150, false],
	['1080p_5', 1920, 1080, 60, 4780, false],
];

export const StreamQualities = VIDEO_PROFILES.map(a => {
	return {
		profile: a[0],
		resolution: {
			width: a[1],
			height: a[2],
		},
		frameRate: {
			min: a[3],
			max: a[3],
		},
		bitrate: {
			min: a[4],
			max: a[4],
		},
		compatible: a[5],
	};
});

/*
export const StreamQualities = [{
	// id: 1,
	// name: '4K 2160p 3840x2160',
	profile: '4K',
	resolution: {
		width: 3840,
		height: 2160
	},
	frameRate: {
		min: 15,
		max: 30
	},
	bitrate: {
		min: 8910,
		max: 13500
	}
}, {
	// id: 2,
	// name: 'HD 1440p 2560×1440',
	profile: '1440p',
	resolution: {
		width: 2560,
		height: 1440
	},
	frameRate: {
		min: 15,
		max: 30
	},
	bitrate: {
		min: 4850,
		max: 7350
	}
}, {
	// id: 3,
	// name: 'HD 1080p 1920x1080',
	profile: '1080p',
	resolution: {
		width: 1920,
		height: 1080
	},
	frameRate: {
		min: 15,
		max: 30
	},
	bitrate: {
		min: 2080,
		max: 4780
	}
}, {
	// id: 4,
	// name: 'LOW 720p 1280x720',
	profile: '720p_3',
	resolution: {
		width: 1280,
		height: 720
	},
	frameRate: {
		min: 15,
		max: 30
	},
	bitrate: {
		min: 1130,
		max: 1710
	}
}, {
	// id: 5,
	// name: 'LOWEST 240p 320x240',
	profile: '240p_1',
	resolution: {
		width: 320,
		height: 240
	},
	frameRate: {
		min: 15,
		max: 15
	},
	bitrate: {
		min: 140,
		max: 200
	}
}];
*/

export function getStreamQuality(state) {
	let profile = environment.profiles.streamer;
	switch (state.role) {
		case RoleType.Publisher:
		case RoleType.SmartDevice:
			profile = environment.profiles.publisher || environment.profiles.streamer;
			break;
		case RoleType.Attendee:
			profile = environment.profiles.attendee || environment.profiles.streamer;
			break;
		default:
	}
	return StreamQualities.find(x => x.profile === profile);
}

/*
export function getStreamQuality(state) {
	const lowestQuality = StreamQualities[StreamQualities.length - 1];
	const highestQuality = environment.flags.maxQuality ? StreamQualities[0] : StreamQualities[StreamQualities.length - 2];
	return (state.role === RoleType.Publisher || state.role === RoleType.SmartDevice) ? highestQuality : lowestQuality;
}
*/

export const AgoraStatus = {
	Idle: 'idle',
	Checklist: 'checklist',
	Link: 'link',
	Login: 'login',
	Name: 'name',
	Device: 'device',
	ShouldConnect: 'should-connect',
	Connecting: 'connecting',
	Connected: 'connected',
	Disconnected: 'disconnected',
};

export const MessageType = {
	AgoraEvent: 'agoraEvent',
	Ping: 'ping',
	ChannelMembers: 'channelMembers',
	SupportRequest: 'supportRequest',
	SupportRequestAccepted: 'supportRequestAccepted',
	SupportRequestRejected: 'supportRequestRejected',
	RequestControl: 'requestControl',
	RequestControlAccepted: 'requestControlAccepted',
	RequestControlRejected: 'requestControlRejected',
	RequestControlDismiss: 'requestControlDismiss',
	RequestControlDismissed: 'requestControlDismissed',
	RequestPeerInfo: 'requestPeerInfo',
	RequestPeerInfoResult: 'requestPeerInfoResult',
	RequestInfo: 'requestInfo',
	RequestInfoResult: 'requestInfoResult',
	RequestInfoDismiss: 'requestInfoDismiss',
	RequestInfoDismissed: 'requestInfoDismissed',
	RequestInfoRejected: 'requestInfoRejected',
	RemoteSilencing: 'remoteSilencing',
	SlideChange: 'slideChange',
	ControlInfo: 'controlInfo',
	AddLike: 'addLike',
	ShowPanel: 'showPanel',
	PlayMedia: 'playMedia',
	ZoomMedia: 'zoomMedia',
	CurrentTimeMedia: 'currentTimeMedia',
	PlayModel: 'playModel',
	Mode: 'mode',
	NavInfo: 'navInfo',
	NavToView: 'navToView',
	NavToGrid: 'navToGrid',
	NavLink: 'navLink',
	NavLinkClose: 'navLinkClose',
	VRStarted: 'vrStarted',
	VREnded: 'vrEnded',
	VRState: 'vrState',
	MenuToggle: 'menuToggle',
	ChatMessage: 'chatMessage',
	ChatTypingBegin: 'chatTypingBegin',
	ChatTypingEnd: 'chatTypingEnd',
	SelectItem: 'selectItem',
};

export const UIMode = {
	VirtualTour: 'virtual-tour',
	LiveMeeting: 'live-meeting',
	SelfServiceTour: 'self-service-tour',
	Embed: 'embed',
	None: 'none',
};

export class AgoraEvent {
	constructor(options) {
		Object.assign(this, options);
	}
}
export class AgoraPeerEvent extends AgoraEvent { }
export class AgoraRemoteEvent extends AgoraEvent { }
export class AgoraMuteVideoEvent extends AgoraEvent { }
export class AgoraUnmuteVideoEvent extends AgoraEvent { }
export class AgoraMuteAudioEvent extends AgoraEvent { }
export class AgoraUnmuteAudioEvent extends AgoraEvent { }
export class AgoraVolumeLevelsEvent extends AgoraEvent { }
