import { environment } from '../environment';
import { RoleType } from '../user/user';

export const USE_AUTODETECT = false;
export const USE_VOLUME_INDICATOR = false;
export const USE_RTM = true;

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

export function getStreamQuality(state) {
	const lowestQuality = StreamQualities[StreamQualities.length - 1];
	const highestQuality = environment.flags.maxQuality ? StreamQualities[0] : StreamQualities[StreamQualities.length - 2];
	return (state.role === RoleType.Publisher || state.role === RoleType.SmartDevice) ? highestQuality : lowestQuality;
}

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
	SlideChange: 'slideChange',
	ControlInfo: 'controlInfo',
	AddLike: 'addLike',
	ShowPanel: 'showPanel',
	PlayMedia: 'playMedia',
	NavToView: 'navToView',
	NavToGrid: 'navToGrid',
	VRStarted: 'vrStarted',
	VREnded: 'vrEnded',
	VRState: 'vrState',
	MenuToggle: 'menuToggle',
	ChatMessage: 'chatMessage',
	ChatTypingBegin: 'chatTypingBegin',
	ChatTypingEnd: 'chatTypingEnd',
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
