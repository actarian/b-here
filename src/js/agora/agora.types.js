
export const USE_AUTODETECT = false;
export const USE_VOLUME_INDICATOR = false;
export const USE_RTM = true;

export const StreamQualities = [{
	id: 1,
	name: '4K 2160p 3840x2160',
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
	id: 2,
	name: 'HD 1440p 2560×1440',
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
	id: 3,
	name: 'HD 1080p 1920x1080',
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
	id: 4,
	name: 'LOW 720p 960x720',
	resolution: {
		width: 960,
		height: 720
	},
	frameRate: {
		min: 15,
		max: 30
	},
	bitrate: {
		min: 910,
		max: 1380
	}
}, {
	id: 5,
	name: 'LOWEST 240p 320x240',
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

export const AgoraStatus = {
	Link: 'link',
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
	CameraRotate: 'cameraRotate',
	CameraOrientation: 'cameraOrientation',
	NavToView: 'navToView',
	NavToGrid: 'navToGrid',
	VRStarted: 'vrStarted',
	VREnded: 'vrEnded',
	VRState: 'vrState',
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
