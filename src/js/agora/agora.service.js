/* global AgoraRTM */
// import AgoraRTM from 'agora-rtm-sdk';
import { from, interval, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Emittable from '../emittable/emittable';
import { DEBUG, environment } from '../environment';
import HttpService from '../http/http.service';
// import LocationService from '../location/location.service';
import MessageService from '../message/message.service';
import StateService from '../state/state.service';
import StreamService from '../stream/stream.service';
import { RoleType } from '../user/user';
import { AgoraMuteAudioEvent, AgoraMuteVideoEvent, AgoraPeerEvent, AgoraRemoteEvent, AgoraStatus, AgoraUnmuteAudioEvent, AgoraUnmuteVideoEvent, AgoraVolumeLevelsEvent, MessageType, StreamQualities, USE_AUTODETECT, USE_RTM, USE_VOLUME_INDICATOR } from './agora.types';

export default class AgoraService extends Emittable {

	static getSingleton(defaultDevices) {
		if (DEBUG) {
			return;
		}
		if (!this.AGORA) {
			this.AGORA = new AgoraService(defaultDevices);
		}
		return this.AGORA;
	}

	constructor(defaultDevices) {
		if (AgoraService.AGORA) {
			throw ('AgoraService is a singleton');
		}
		super();
		this.onStreamPublished = this.onStreamPublished.bind(this);
		this.onStreamUnpublished = this.onStreamUnpublished.bind(this);
		this.onStreamAdded = this.onStreamAdded.bind(this);
		this.onStreamRemoved = this.onStreamRemoved.bind(this);
		this.onStreamSubscribed = this.onStreamSubscribed.bind(this);
		this.onMuteVideo = this.onMuteVideo.bind(this);
		this.onUnmuteVideo = this.onUnmuteVideo.bind(this);
		this.onMuteAudio = this.onMuteAudio.bind(this);
		this.onUnmuteAudio = this.onUnmuteAudio.bind(this);
		this.onVolumeIndicator = this.onVolumeIndicator.bind(this);
		this.onPeerConnect = this.onPeerConnect.bind(this);
		this.onPeerLeaved = this.onPeerLeaved.bind(this);
		this.onConnectionStateChange = this.onConnectionStateChange.bind(this);
		this.onTokenPrivilegeWillExpire = this.onTokenPrivilegeWillExpire.bind(this);
		this.onTokenPrivilegeDidExpire = this.onTokenPrivilegeDidExpire.bind(this);
		this.onMessage = this.onMessage.bind(this);
		const state = StateService.state;
		StateService.patchState({
			devices: (state.role !== RoleType.Attendee && defaultDevices) ? defaultDevices : { videos: [], audios: [] },
			quality: state.role === RoleType.Publisher ? StreamQualities[0] : StreamQualities[StreamQualities.length - 1],
			membersCount: 0,
		});
	}

	/*
	getInitialStatus(role, link, name) {
		if (!link) {
			return AgoraStatus.Link;
		}
		if (!name) {
			return AgoraStatus.Name;
		}
		if (role !== RoleType.Viewer) {
			return AgoraStatus.Device;
		}
		return AgoraStatus.ShouldConnect;
	}
	*/

	addStreamDevice(src) {
		this.removeStreamDevice();
		const video = {
			deviceId: 'video-stream',
			label: 'videostream',
			kind: 'videostream',
			src: src,
		};
		const audio = {
			deviceId: 'audio-stream',
			label: 'videostream',
			kind: 'videostream',
			src: src,
		};
		const devices = StateService.state.devices;
		devices.videos.push(video);
		devices.audios.push(audio);
		StateService.patchState({ devices: devices });
	}

	removeStreamDevice() {
		const devices = StateService.state.devices;
		devices.videos = devices.videos.filter(x => x.kind !== 'videostream');
		devices.audios = devices.audios.filter(x => x.kind !== 'videostream');
		StateService.patchState({ devices: devices });
	}

	devices$() {
		const inputs = StateService.state.devices;
		const defaultVideos = this.defaultVideos = (this.defaultVideos || inputs.videos.slice());
		const defaultAudios = this.defaultAudios = (this.defaultAudios || inputs.videos.slice());
		inputs.videos = defaultVideos.slice();
		inputs.audios = defaultAudios.slice();
		return from(new Promise((resolve, reject) => {
			const getDevices = () => {
				AgoraRTC.getDevices((devices) => {
					// console.log('AgoraRTC.getDevices', devices);
					tempStream.close();
					for (let i = 0; i < devices.length; i++) {
						const device = devices[i];
						// console.log('device', device.deviceId);
						if (device.kind === 'videoinput' && device.deviceId) {
							inputs.videos.push({
								label: device.label || 'camera-' + inputs.videos.length,
								deviceId: device.deviceId,
								kind: device.kind
							});
						}
						if (device.kind === 'audioinput' && device.deviceId) {
							inputs.audios.push({
								label: device.label || 'microphone-' + inputs.audios.length,
								deviceId: device.deviceId,
								kind: device.kind
							});
						}
					}
					if (inputs.videos.length > 0 || inputs.audios.length > 0) {
						resolve(inputs);
					} else {
						reject(inputs);
					}
				});
			};
			const tempStream = AgoraRTC.createStream({ audio: true, video: true });
			tempStream.init(() => {
				getDevices();
			}, () => {
				getDevices();
			});
		}));
	}

	connect$(preferences) {
		const devices = StateService.state.devices;
		if (preferences) {
			devices.video = preferences.video;
			devices.audio = preferences.audio;
		}
		// console.log('AgoraService.connect$', preferences, devices);
		if (!StateService.state.connecting) {
			StateService.patchState({ status: AgoraStatus.Connecting, connecting: true, devices });
			setTimeout(() => {
				this.createClient(() => {
					this.getRtcToken().subscribe(token => {
						// console.log('token', token);
						this.join(token.token);
					});
				});
			}, 250);
		}
		return StateService.state$;
	}

	membersCount$(channelId) {
		const messageClient = this.messageClient;
		return interval(2000).pipe(
			switchMap(() => from(messageClient.getChannelMemberCount([channelId]))),
			map(counters => counters[channelId]),
		);
	}

	observeMemberCount() {
		this.unobserveMemberCount();
		this.membersCountSubscription = this.membersCount$(StateService.state.channelNameLink).subscribe(
			membersCount => {
				StateService.patchState({ membersCount: membersCount });
			}
		);
	}

	unobserveMemberCount() {
		if (this.membersCountSubscription) {
			this.membersCountSubscription.unsubscribe();
			this.membersCountSubscription = null;
			StateService.patchState({ membersCount: 0 });
		}
	}

	getRtcToken() {
		if (environment.useToken) {
			return HttpService.post$('/api/token/rtc', { uid: null });
		} else {
			return of({ token: null });
		}
	}

	getRtmToken(uid) {
		if (environment.useToken) {
			return HttpService.post$('/api/token/rtm', { uid: uid });
		} else {
			return of({ token: null });
		}
	}

	createClient(next) {
		if (this.client) {
			next();
		}
		// console.log('agora rtc sdk version: ' + AgoraRTC.VERSION + ' compatible: ' + AgoraRTC.checkSystemRequirements());
		// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
		AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);
		const client = this.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc
		const clientInit = () => {
			client.init(environment.appKey, () => {
				// console.log('AgoraRTC client initialized');
				next();
			}, (error) => {
				// console.log('AgoraRTC client init failed', error);
				this.client = null;
			});
		}
		if (StateService.state.role === RoleType.Viewer) {
			client.setClientRole('audience', function(error) {
				if (!error) {
					clientInit();
				}
			});
		} else {
			clientInit();
		}
		client.on('stream-published', this.onStreamPublished);
		client.on('stream-unpublished', this.onStreamUnpublished);
		//subscribe remote stream
		client.on('stream-added', this.onStreamAdded);
		client.on('stream-subscribed', this.onStreamSubscribed);
		client.on('mute-video', this.onMuteVideo);
		client.on('unmute-video', this.onUnmuteVideo);
		client.on('mute-audio', this.onMuteAudio);
		client.on('unmute-audio', this.onUnmuteAudio);
		if (USE_VOLUME_INDICATOR) {
			client.enableAudioVolumeIndicator(); // Triggers the "volume-indicator" callback event every two seconds.
			client.on("volume-indicator", this.onVolumeIndicator);
		}
		client.on('error', this.onError);
		client.on('peer-online', this.onPeerConnect);
		// Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
		client.on('peer-leave', this.onPeerLeaved);
		// client.on('connection-state-change', this.onConnectionStateChange);
		client.on('stream-removed', this.onStreamRemoved);
		client.on('onTokenPrivilegeWillExpire', this.onTokenPrivilegeWillExpire);
		client.on('onTokenPrivilegeDidExpire', this.onTokenPrivilegeDidExpire);
		// console.log('agora rtm sdk version: ' + AgoraRTM.VERSION + ' compatible');
		if (USE_RTM) {
			/*
			AgoraRTM.LOG_FILTER_OFF
			AgoraRTM.LOG_FILTER_ERROR
			AgoraRTM.LOG_FILTER_INFO (Default)
			AgoraRTM.LOG_FILTER_WARNING
			*/
			const messageClient = this.messageClient = AgoraRTM.createInstance(environment.appKey, { logFilter: AgoraRTM.LOG_FILTER_OFF }); // LOG_FILTER_DEBUG
			messageClient.setParameters({ logFilter: AgoraRTM.LOG_FILTER_OFF });
			// messageClient.on('ConnectionStateChanged', console.warn);
			// messageClient.on('MessageFromPeer', console.log);
		}
	}

	getChannelNameLink() {
		let link = StateService.state.link || '';
		const match = link.match(/(\d{9})-(\d{4})-(\d{13})/);
		if (match) {
			link = `${match[1]}-${match[3]}`;
		}
		const channelName = StateService.state.channelName;
		const channelNameLink = `${channelName}-${link}`;
		// console.log('AgoraService.getChannelNameLink', channelNameLink);
		return channelNameLink;
	}

	join(token) {
		this.channel = null;
		const client = this.client;
		const clientId = null;
		token = null; // !!!
		const channelNameLink = this.getChannelNameLink();
		client.join(token, channelNameLink, clientId, (uid) => {
			// console.log('AgoraService.join', uid);
			StateService.patchState({ status: AgoraStatus.Connected, channelNameLink, connected: true, uid: uid });
			if (USE_RTM) {
				this.getRtmToken(uid).subscribe(token => {
					// console.log('token', token);
					this.joinMessageChannel(token.token, uid).then((success) => {
						// console.log('joinMessageChannel.success', success);
						if (StateService.state.role !== RoleType.Viewer) {
							this.autoDetectDevice();
							this.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
						}
						this.observeMemberCount();
					}, error => {
						// console.log('joinMessageChannel.error', error);
					});
				});
			} else {
				if (StateService.state.role !== RoleType.Viewer) {
					this.autoDetectDevice();
					this.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
				}
			}
		}, (error) => {
			console.log('AgoraService.join.error', error);
		});
		// https://console.agora.io/invite?sign=YXBwSWQlM0RhYjQyODlhNDZjZDM0ZGE2YTYxZmQ4ZDY2Nzc0YjY1ZiUyNm5hbWUlM0RaYW1wZXR0aSUyNnRpbWVzdGFtcCUzRDE1ODY5NjM0NDU=// join link expire in 30 minutes
	}

	joinMessageChannel(token, uid) {
		let channel;
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			token = null; // !!!
			messageClient.login({ uid: uid.toString() }).then(() => {
				channel = messageClient.createChannel(StateService.state.channelNameLink);
				return channel.join();
			}).then(() => {
				channel.on('ChannelMessage', this.onMessage);
				this.channel = channel;
				this.emit('channel', channel);
				// console.log('AgoraService.joinMessageChannel.success');
				resolve(uid);
			}).catch(reject);
		});
	}

	detectDevices(next) {
		AgoraRTC.getDevices((devices) => {
			const videos = [];
			const audios = [];
			for (let i = 0; i < devices.length; i++) {
				const device = devices[i];
				if ('videoinput' == device.kind) {
					videos.push({
						label: device.label || 'camera-' + videos.length,
						deviceId: device.deviceId,
						kind: device.kind
					});
				}
				if ('audioinput' == device.kind) {
					audios.push({
						label: device.label || 'microphone-' + videos.length,
						deviceId: device.deviceId,
						kind: device.kind
					});
				}
			}
			next({ videos: videos, audios: audios });
		});
	}

	getVideoOptions(options, video) {
		return new Promise((resolve, reject) => {
			if (video) {
				if (video.kind === 'videostream') {
					const element = document.querySelector('#' + video.deviceId);
					element.crossOrigin = 'anonymous';
					var hls = new Hls();
					hls.attachMedia(element);
					hls.on(Hls.Events.MEDIA_ATTACHED, () => {
						hls.loadSource(video.src);
						hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
							// console.log('HlsDirective', data.levels);
							element.play().then(success => {
								const stream = element.captureStream();
								options.videoSource = stream.getVideoTracks()[0];
								// console.log('AgoraService.getVideoOptions', element, stream, stream.getVideoTracks());
								resolve(options);
							}, error => {
								console.log('AgoraService.getVideoOptions.error', error);
							});
						});
					});
				} else if (video.kind === 'videoplayer' || video.kind === 'videostream') {
					const element = document.querySelector('#' + video.deviceId);
					element.crossOrigin = 'anonymous';
					// element.oncanplay = () => {
					const stream = element.captureStream();
					options.videoSource = stream.getVideoTracks()[0];
					// console.log('getVideoOptions', element, stream, stream.getVideoTracks());
					resolve(options);
					// };
					/*
					element.play().then(success => {
						const stream = element.captureStream();
						options.videoSource = stream.getVideoTracks()[0];
						// console.log('getVideoOptions', element, stream, stream.getVideoTracks());
						resolve(options);
					}, error => {
						// console.log('AgoraService.getVideoOptions.error', error);
					});
					*/
				} else {
					options.cameraId = video.deviceId;
					resolve(options);
				}
			} else {
				resolve(options);
			}
		});
	}

	getAudioOptions(options, audio) {
		return new Promise((resolve, reject) => {
			if (audio) {
				if (audio.kind === 'videostream') {
					const element = document.querySelector('#' + audio.deviceId);
					element.crossOrigin = 'anonymous';
					// !!! try hls.service;
					var hls = new Hls();
					hls.attachMedia(element);
					hls.on(Hls.Events.MEDIA_ATTACHED, () => {
						hls.loadSource(audio.src);
						hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
							// console.log('HlsDirective', data.levels);
							hls.loadLevel = data.levels.length - 1;
							element.play().then(success => {
								const stream = element.captureStream();
								options.audioSource = stream.getAudioTracks()[0];
								// console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
								resolve(options);
							}, error => {
								console.log('AgoraService.getAudioOptions.error', error);
							});
						});
					});
				} else if (audio.kind === 'videoplayer' || audio.kind === 'videostream') {
					const element = document.querySelector('#' + audio.deviceId);
					element.crossOrigin = 'anonymous';
					// element.oncanplay = () => {
					const stream = element.captureStream();
					options.audioSource = stream.getAudioTracks()[0];
					// console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
					resolve(options);
					// };
					/*
					element.play().then(success => {
						const stream = element.captureStream();
						options.audioSource = stream.getAudioTracks()[0];
						// console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
						resolve(options);
					}, error => {
						// console.log('AgoraService.getAudioOptions.error', error);
					});
					*/
				} else {
					options.microphoneId = audio.deviceId;
					resolve(options);
				}
			} else {
				resolve(options);
			}
		});
	}

	autoDetectDevice() {
		if (USE_AUTODETECT) {
			StateService.state.devices.video = StateService.state.devices.videos[0] || null;
			StateService.state.devices.audio = StateService.state.devices.audios[0] || null;
			/*
			const cameraId = devices.videos.length ? devices.videos[0].deviceId : null;
			const microphoneId = devices.audios.length ? devices.audios[0].deviceId : null;
			this.createLocalStream(uid, microphoneId, cameraId);
			*/
		}
	}

	createMediaStream(uid, video, audio) {
		// this.releaseStream('_mediaVideoStream')
		const options = {
			streamID: uid,
			video: Boolean(video),
			audio: Boolean(audio),
			screen: false,
		};
		Promise.all([
			this.getVideoOptions(options, video),
			this.getAudioOptions(options, audio)
		]).then(success => {
			const quality = Object.assign({}, StateService.state.quality);
			this.createLocalStreamWithOptions(options, quality);
			/*
			// console.log('AgoraService.createMediaStream', uid, options);
			const local = AgoraRTC.createStream(options);
			StreamService.local = local;
			// console.log('AgoraService.createMediaStream', uid, local.getId());
			// console.log('AgoraService.setVideoEncoderConfiguration', quality);
			local.setVideoEncoderConfiguration(quality);
			this.initLocalStream(options);
			*/
		});
	}

	createLocalStreamWithOptions(options, quality) {
		const local = AgoraRTC.createStream(options);
		if (quality) {
			local.setVideoEncoderConfiguration(quality);
		}
		local.init(() => {
			StreamService.local = local;
			setTimeout(() => {
				this.publishLocalStream();
			}, 1);
		}, (error) => {
			console.log('AgoraService.initLocalStream.init.error', error);
		});
	}

	initLocalStream() {
		const local = StreamService.local;
		local.init(() => {
			this.publishLocalStream();
		}, (error) => {
			console.log('AgoraService.initLocalStream.init.error', error);
		});
	}

	createLocalStream(uid, microphoneId, cameraId) {
		// console.log('createLocalStream', uid, microphoneId, cameraId);
		if (microphoneId || cameraId) {
			const options = {
				streamID: uid,
				microphoneId: microphoneId,
				cameraId: cameraId,
				audio: microphoneId ? true : false,
				video: cameraId ? true : false,
				screen: false,
			};
			this.createLocalStreamWithOptions(options);
			/*
			StreamService.local = AgoraRTC.createStream({
				streamID: uid,
				microphoneId: microphoneId,
				cameraId: cameraId,
				audio: microphoneId ? true : false,
				video: cameraId ? true : false,
				screen: false,
			});
			this.initLocalStream();
			*/
		}
	}

	createMediaVideoStream(video, callback) {
		// this.releaseStream('_mediaVideoStream')
		const videoStream = video.captureStream(60);
		const stream = AgoraRTC.createStream({
			audio: true,
			video: true,
			videoSource: videoStream.getVideoTracks()[0],
			audioSource: videoStream.getAudioTracks()[0],
		});
		stream.init(() => {
			callback(stream.getVideoTrack(), stream.getAudioTrack());
		});
	}

	publishLocalStream() {
		const client = this.client;
		const local = StreamService.local;
		// publish local stream
		client.publish(local, (error) => {
			console.log('AgoraService.publishLocalStream.error', local.getId(), error);
		});
		local.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
		};
		StreamService.local = local;
	}

	unpublishLocalStream() {
		const client = this.client;
		const local = StreamService.local;
		if (local) {
			client.unpublish(local, (error) => {
				console.log('AgoraService.unpublishLocalStream.error', local.getId(), error);
			});
		}
		StreamService.local = null;
	}

	leaveChannel() {
		StateService.patchState({ connecting: false });
		this.unpublishLocalStream();
		StreamService.remotes = [];
		StreamService.peers = [];
		return new Promise((resolve, reject) => {
			this.leaveMessageChannel().then(() => {
				const client = this.client;
				client.leave(() => {
					this.client = null;
					// console.log('Leave channel successfully');
					resolve();
				}, (error) => {
					console.log('AgoraService.leaveChannel.error', error);
					reject(error);
				});
			}, reject);
		});
	}

	leaveMessageChannel() {
		return new Promise((resolve, reject) => {
			if (USE_RTM) {
				this.unobserveMemberCount();
				const channel = this.channel;
				const messageClient = this.messageClient;
				channel.leave().then(() => {
					this.channel = null;
					messageClient.logout().then(() => {
						this.messageClient = null;
						resolve();
					}, reject);
				}, reject)
			} else {
				return resolve();
			}
		});
	}

	toggleCamera() {
		const local = StreamService.local;
		// console.log('toggleCamera', local);
		if (local && local.video) {
			if (local.userMuteVideo) {
				local.unmuteVideo();
				StateService.patchState({ cameraMuted: false });
				this.broadcastEvent(new AgoraUnmuteVideoEvent({ streamId: local.getId() }));
			} else {
				local.muteVideo();
				StateService.patchState({ cameraMuted: true });
				this.broadcastEvent(new AgoraMuteVideoEvent({ streamId: local.getId() }));
			}
		}
	}

	toggleAudio() {
		const local = StreamService.local;
		// console.log(local);
		if (local && local.audio) {
			if (local.userMuteAudio) {
				local.unmuteAudio();
				StateService.patchState({ audioMuted: false });
				this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: local.getId() }));
			} else {
				local.muteAudio();
				StateService.patchState({ audioMuted: true });
				this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: local.getId() }));
			}
		}
	}

	toggleControl() {
		if (StateService.state.control) {
			this.sendRemoteControlDismiss().then((control) => {
				// console.log('AgoraService.sendRemoteControlDismiss', control);
				StateService.patchState({ control: !control });
			});
		} else if (StateService.state.spying) {
			this.sendRemoteInfoDismiss(StateService.state.spying).then((spying) => {
				// console.log('AgoraService.sendRemoteInfoDismiss', spying);
				StateService.patchState({ spying: false });
				this.sendRemoteControlRequest().then((control) => {
					// console.log('AgoraService.sendRemoteControlRequest', control);
					StateService.patchState({ control: control });
				});
			});
		} else {
			this.sendRemoteControlRequest().then((control) => {
				// console.log('AgoraService.sendRemoteControlRequest', control);
				StateService.patchState({ control: control });
			});
		}
	}

	toggleSpy(remoteId) {
		if (StateService.state.control) {
			this.sendRemoteControlDismiss().then((control) => {
				StateService.patchState({ control: false });
				this.sendRemoteRequestInfo(remoteId).then((info) => {
					StateService.patchState({ spying: remoteId });
				});
			});
		} else if (StateService.state.spying) {
			this.sendRemoteInfoDismiss(StateService.state.spying).then((spying) => {
				// console.log('AgoraService.sendRemoteInfoDismiss', spying);
				// StateService.patchState({ spying: !spying });
				if (StateService.state.spying !== remoteId) {
					this.sendRemoteRequestInfo(remoteId).then((info) => {
						StateService.patchState({ spying: remoteId });
					});
				} else {
					StateService.patchState({ spying: false });
				}
			});
		} else {
			this.sendRemoteRequestInfo(remoteId).then((info) => {
				StateService.patchState({ spying: remoteId });
			});
		}
	}

	newMessageId() {
		return `${StateService.state.uid}-${Date.now().toString()}`;
	}

	sendRemoteControlDismiss() {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestControlDismiss,
				messageId: this.newMessageId(),
			}).then((message) => {
				// console.log('AgoraService.sendRemoteControlDismiss return', message);
				if (message.type === MessageType.RequestControlDismissed) {
					resolve(true);
				} else if (message.type === MessageType.RequestControlRejected) {
					resolve(false);
				}
			});
		});
	}

	sendRemoteControlRequest() {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestControl,
				messageId: this.newMessageId(),
			}).then((message) => {
				// console.log('AgoraService.sendRemoteControlRequest.response', message);
				if (message.type === MessageType.RequestControlAccepted) {
					resolve(true);
				} else if (message.type === MessageType.RequestControlRejected) {
					// this.remoteDeviceInfo = undefined
					resolve(false);
				}
			});
		});
	}

	sendRemoteRequestPeerInfo(remoteId) {
		// console.log('AgoraService.sendRemoteRequestPeerInfo', remoteId);
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestPeerInfo,
				messageId: this.newMessageId(),
				remoteId: remoteId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteRequestPeerInfo.response', message);
				if (message.type === MessageType.RequestPeerInfoResult) {
					if (message.clientInfo.role === RoleType.Publisher) {
						StateService.patchState({ hosted: true });
					}
					resolve(message);
				}
			});
		});
	}

	sendRemoteRequestInfo(remoteId) {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestInfo,
				messageId: this.newMessageId(),
				remoteId: remoteId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteRequestInfo.response', message);
				if (message.type === MessageType.RequestInfoResult) {
					StateService.patchState({ spying: remoteId });
					resolve(message);
				}
			});
		});
	}

	sendRemoteInfoDismiss(remoteId) {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestInfoDismiss,
				messageId: this.newMessageId(),
				remoteId: remoteId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteInfoDismiss.response', message);
				if (message.type === MessageType.RequestInfoDismissed) {
					resolve(true);
				} else if (message.type === MessageType.RequestInfoRejected) {
					resolve(false);
				}
			});
		});
	}

	navToView(viewId) {
		if (StateService.state.control || StateService.state.spyed) {
			this.sendMessage({
				type: MessageType.NavToView,
				viewId: viewId,
			});
		}
	}

	getSessionStats() {
		const client = this.client;
		client.getSessionStats((stats) => {
			console.log(`Current Session Duration: ${stats.Duration}`);
			console.log(`Current Session UserCount: ${stats.UserCount}`);
			console.log(`Current Session SendBytes: ${stats.SendBytes}`);
			console.log(`Current Session RecvBytes: ${stats.RecvBytes}`);
			console.log(`Current Session SendBitrate: ${stats.SendBitrate}`);
			console.log(`Current Session RecvBitrate: ${stats.RecvBitrate}`);
		});
	}

	getSystemStats() {
		const client = this.client;
		client.getSystemStats((stats) => {
			console.log(`Current battery level: ${stats.BatteryLevel}`);
		});
	}

	sendMessage(message) {
		return new Promise((resolve, reject) => {
			if (StateService.state.connected) {
				message.clientId = StateService.state.uid;
				switch (message.type) {
					case MessageType.CameraOrientation:
					case MessageType.NavToGrid:
						if (!StateService.state.control && !StateService.state.spyed) {
							return;
						}
						break;
					case MessageType.CameraRotate:
					case MessageType.SlideChange:
						if (!StateService.state.control) {
							return;
						}
						break;
				}
				// message.wrc_version = 'beta';
				// message.uid = StateService.state.uid;
				const send = (message, channel) => {
					try {
						const text = JSON.stringify(message);
						if (message.messageId) {
							this.once(`message-${message.messageId}`, (message) => {
								resolve(message);
							});
						}
						// console.log('AgoraService.sendMessage.sending', message.type);
						channel.sendMessage({ text: text }).then(() => {
							// console.log('AgoraService.sendMessage', text);
							if (!message.messageId) {
								resolve(message);
							}
						}).catch(error => {
							console.log('AgoraService.sendMessage.error', error);
						});
					} catch (error) {
						console.log('AgoraService.sendMessage.error', error);
						// reject(error);
					}
				}
				const channel = this.channel;
				if (channel) {
					send(message, channel);
				} else {
					try {
						this.once(`channel`, (channel) => {
							send(message, channel);
						});
					} catch (error) {
						reject(error);
					}
				}
			} else {
				// console.log('StateService.state.connected', StateService.state.connected)
				// reject();
			}
		})
	}

	checkBroadcastMessage(message) {
		// filter for broadcast
		// !!! filter events here
		switch (message.type) {
			case MessageType.RequestControlDismiss:
				StateService.patchState({ locked: false });
				this.sendMessage({
					type: MessageType.RequestControlDismissed,
					messageId: message.messageId
				});
				break;
			case MessageType.RequestInfoDismiss:
				// console.log('checkBroadcastMessage.RequestInfoDismiss', message);
				StateService.patchState({ spyed: false });
				this.sendMessage({
					type: MessageType.RequestInfoDismissed,
					messageId: message.messageId,
					remoteId: message.remoteId,
				});
				break;
			case MessageType.RequestInfoResult:
				// console.log('checkBroadcastMessage.RequestInfoResult', message);
				if (StateService.state.role === RoleType.Publisher) {
					this.broadcastMessage(message);
				}
			case MessageType.CameraOrientation:
			case MessageType.CameraRotate:
			case MessageType.NavToView:
			case MessageType.NavToGrid:
			case MessageType.SlideChange:
				if (StateService.state.locked || (StateService.state.spying && StateService.state.spying === message.clientId)) {
					this.broadcastMessage(message);
				}
				break;
			default:
				this.broadcastMessage(message);
		}
	}

	broadcastMessage(message) {
		MessageService.out(message);
	}

	broadcastEvent(event) {
		MessageService.out({
			type: MessageType.AgoraEvent,
			event,
		});
	}

	onMessage(data, uid) {
		// console.log('AgoraService.onMessage', data.text, uid, StateService.state.uid);
		// discard message delivered by current state uid;
		if (uid !== StateService.state.uid) {
			// console.log('AgoraService.onMessage', data.text);
			const message = JSON.parse(data.text);
			if (message.messageId && this.has(`message-${message.messageId}`)) {
				// !!! removed return
				this.emit(`message-${message.messageId}`, message);
			}
			// discard message delivered to specific remoteId when differs from current state uid;
			if (message.remoteId && message.remoteId !== StateService.state.uid) {
				return;
			}
			// !!! check position !!!
			if (message.type === MessageType.VRStarted) {
				const container = document.createElement('div');
				container.classList.add('player__vr');
				message.container = container;
			}
			this.checkBroadcastMessage(message);
		}
	}

	onError(error) {
		console.log('AgoraService.onError', error);
	}

	onStreamPublished(event) {
		// console.log('AgoraService.onStreamPublished');
		const local = StreamService.local;
		local.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
		};
		StreamService.local = local;
	}

	onStreamUnpublished(event) {
		// console.log('AgoraService.onStreamUnpublished');
		StreamService.local = null;
	}

	onStreamAdded(event) {
		const client = this.client;
		const stream = event.stream;
		if (!stream) {
			return;
		}
		const streamId = stream.getId();
		if (streamId !== StateService.state.uid) {
			// console.log('AgoraService.onStreamAdded', streamId, StateService.state.uid);
			client.subscribe(stream, (error) => {
				console.log('AgoraService.onStreamAdded.subscribe.error', error);
			});
		}
	}

	onStreamRemoved(event) {
		const stream = event.stream;
		const streamId = stream.getId();
		// console.log('AgoraService.onStreamRemoved', streamId, StateService.state.uid);
		if (streamId !== StateService.state.uid) {
			this.remoteRemove(streamId);
		}
	}

	onStreamSubscribed(event) {
		// console.log('AgoraService.onStreamSubscribed', event.stream.getId());
		this.remoteAdd(event.stream);
	}

	onPeerConnect(event) {
		// console.log('AgoraService.onPeerConnect', event);
		this.peerAdd(event);
	}

	onPeerLeaved(event) {
		const clientId = event.uid;
		if (clientId !== StateService.state.uid) {
			this.remoteRemove(clientId);
		}
		this.peerRemove(clientId);
		StateService.patchState({ locked: false, control: false, spyed: false });
	}

	peerAdd(event) {
		// console.log('AgoraService.peerAdd', event);
		const peer = {
			uid: event.uid
		};
		const peers = StreamService.peers;
		peers.push(peer);
		StreamService.peers = peers;
		this.broadcastEvent(new AgoraPeerEvent({ peer }));
	}

	peerRemove(peerId) {
		// console.log('AgoraService.peerRemove', peerId);
		const peers = StreamService.peers;
		const peer = peers.find(x => x.uid === peerId);
		if (peer) {
			peers.splice(peers.indexOf(peer), 1);
			StreamService.peers = peers;
		}
	}

	remoteAdd(stream) {
		// console.log('AgoraService.remoteAdd', stream);
		const remotes = StreamService.remotes;
		remotes.push(stream);
		StreamService.remotes = remotes;
		this.broadcastEvent(new AgoraRemoteEvent({ stream }));
		const remoteId = stream.getId();
		this.sendRemoteRequestPeerInfo(remoteId).then((message) => {
			const remotes = StreamService.remotes;
			const remote = remotes.find(x => x.getId() === remoteId);
			if (remote) {
				remote.clientInfo = message.clientInfo;
			}
			StreamService.remotes = remotes;
		});
	}

	remoteRemove(streamId) {
		// console.log('AgoraService.remoteRemove', streamId);
		const remotes = StreamService.remotes;
		const remote = remotes.find(x => x.getId() === streamId);
		if (remote) {
			if (remote.isPlaying()) {
				remote.stop();
			}
			remotes.splice(remotes.indexOf(remote), 1);
			StreamService.remotes = remotes;
			if (remote.clientInfo && remote.clientInfo.role === RoleType.Publisher) {
				StateService.patchState({ hosted: false });
			}
		}
	}

	onMuteVideo(event) {
		// console.log('AgoraService.onMuteVideo', event);
		this.broadcastEvent(new AgoraMuteVideoEvent({ streamId: event.uid }));
	}

	onUnmuteVideo(event) {
		// console.log('AgoraService.onUnmuteVideo', event);
		this.broadcastEvent(new AgoraUnmuteVideoEvent({ streamId: event.uid }));
	}

	onMuteAudio(event) {
		// console.log('AgoraService.onMuteAudio', event);
		this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: event.uid }));
	}

	onUnmuteAudio(event) {
		// console.log('AgoraService.onUnmuteAudio', event);
		this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: event.uid }));
	}

	onVolumeIndicator(event) {
		// console.log('AgoraService.onVolumeIndicator', event);
		const streams = event.attr.map(x => {
			return { streamId: x.uid, level: x.level };
		});
		this.broadcastEvent(new AgoraVolumeLevelsEvent({ streams: streams }));
	}

	onConnectionStateChange(event) {
		console.log('AgoraService.onConnectionStateChange', event);
	}

	onTokenPrivilegeWillExpire(event) {
		// After requesting a new token
		// client.renewToken(token);
		console.log('AgoraService.onTokenPrivilegeWillExpire');
	}

	onTokenPrivilegeDidExpire(event) {
		// After requesting a new token
		// client.renewToken(token);
		console.log('AgoraService.onTokenPrivilegeDidExpire');
	}
}
