/* global AgoraRTM */
// import AgoraRTM from 'agora-rtm-sdk';
import { from, interval, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import Emittable from '../emittable/emittable';
import { DEBUG, environment } from '../environment';
import { HttpService } from '../http/http.service';
// import LocationService from '../location/location.service';
import { MessageService } from '../message/message.service';
import StateService from '../state/state.service';
import SessionStorageService from '../storage/session-storage.service';
import StreamService from '../stream/stream.service';
import { RoleType } from '../user/user';
import { AgoraMuteAudioEvent, AgoraMuteVideoEvent, AgoraPeerEvent, AgoraRemoteEvent, AgoraStatus, AgoraUnmuteAudioEvent, AgoraUnmuteVideoEvent, AgoraVolumeLevelsEvent, getStreamQuality, MessageType, UIMode, USE_AUTODETECT, USE_RTM, USE_VOLUME_INDICATOR } from './agora.types';

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
			quality: getStreamQuality(state),
			membersCount: 0,
		});
	}

	get isAudienceRole() {
		return StateService.state.role === RoleType.Viewer || StateService.state.role === RoleType.SelfService;
	}

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
				AgoraService.getDevices().then((devices) => {
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
				}).catch((error) => {
					reject(error);
				});
				/*
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
				*/
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
					const channelNameLink = this.getChannelNameLink();
					AgoraService.rtcToken$(channelNameLink).subscribe(token => {
						// console.log('AgoraService.rtcToken$', token);
						this.join(token.token, channelNameLink);
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
			catchError(error => {
				console.log('AgoraRTM', 'AgoraService.membersCount$.error', error);
				return of(0)
			}),
			distinctUntilChanged(),
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

	createClient(next) {
		if (this.client) {
			next();
		}
		// console.log('agora rtc sdk version: ' + AgoraRTC.VERSION + ' compatible: ' + AgoraRTC.checkSystemRequirements());
		// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
		AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);
		const client = this.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc
		const clientInit = () => {
			if (environment.flags.useProxy) {
				client.startProxyServer(3);
				console.log('AgoraService.client.startProxyServer');
			}
			client.init(environment.appKey, () => {
				console.log('AgoraRTC client initialized');
				next();
			}, (error) => {
				console.log('AgoraRTC client init failed', error);
				this.client = null;
			});
		}
		if (this.isAudienceRole) {
			client.setClientRole('audience', function(error) {
				if (!error) {
					clientInit();
				}
			});
		} else {
			clientInit();
		}
		client.on('error', this.onError);
		client.on('stream-published', this.onStreamPublished);
		client.on('stream-unpublished', this.onStreamUnpublished);
		//subscribe remote stream
		client.on('stream-added', this.onStreamAdded);
		client.on('stream-removed', this.onStreamRemoved);
		client.on('stream-subscribed', this.onStreamSubscribed);
		client.on('mute-video', this.onMuteVideo);
		client.on('unmute-video', this.onUnmuteVideo);
		client.on('mute-audio', this.onMuteAudio);
		client.on('unmute-audio', this.onUnmuteAudio);
		if (USE_VOLUME_INDICATOR) {
			client.enableAudioVolumeIndicator(); // Triggers the 'volume-indicator' callback event every two seconds.
			client.on('volume-indicator', this.onVolumeIndicator);
		}
		client.on('peer-online', this.onPeerConnect);
		// Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
		client.on('peer-leave', this.onPeerLeaved);
		// client.on('connection-state-change', this.onConnectionStateChange);
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
			console.log('AgoraRTM', 'client initialized');
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

	static getUniqueUserId() {
		// max safe integer 9007199254740991 length 16
		// max allowed integer 4294967296 2^32
		const m = 9007199254740991;
		const mult = 10000000000000;
		const a = (1 + Math.floor(Math.random() * 8)) * 100;
		const b = (1 + Math.floor(Math.random() * 8)) * 10;
		const c = (1 + Math.floor(Math.random() * 8)) * 1;
		const combo = (a + b + c);
		const date = Date.now();
		const uid = combo * mult + date;
		// console.log(combo);
		// console.log(date);
		// console.log(m);
		// console.log('AgoraService.getUniqueUserId', uid);
		return uid.toString();
	}

	join(token, channelNameLink) {
		this.channel = null;
		const client = this.client;
		const clientId = SessionStorageService.get('bHereClientId') || AgoraService.getUniqueUserId();
		console.log('AgoraService.join', { token, channelNameLink, clientId });
		client.join(token, channelNameLink, clientId, (uid) => {
			// console.log('AgoraService.join', uid);
			StateService.patchState({ status: AgoraStatus.Connected, channelNameLink, connected: true, uid: uid });
			SessionStorageService.set('bHereClientId', uid);
			if (USE_RTM) {
				AgoraService.rtmToken$(uid).subscribe(token => {
					// console.log('AgoraService.rtmToken$', token);
					this.joinMessageChannel(token.token, uid).then((success) => {
						// console.log('joinMessageChannel.success', success);
						if (!this.isAudienceRole) {
							this.autoDetectDevice().then(devices => {
								this.createMediaStream(uid, devices.video, devices.audio);
							});
						}
						this.observeMemberCount();
					}, error => {
						console.log('joinMessageChannel.error', error);
					});
				});
			} else {
				if (!this.isAudienceRole) {
					this.autoDetectDevice().then(devices => {
						this.createMediaStream(uid, devices.video, devices.audio);
					});
				}
			}
		}, (error) => {
			console.log('AgoraService.join.error', error);
			if (error === 'DYNAMIC_KEY_EXPIRED') {
				AgoraService.rtcToken$(channelNameLink).subscribe(token => {
					this.join(token.token, channelNameLink);
				});
			}
		});
		// https://console.agora.io/invite?sign=YXBwSWQlM0RhYjQyODlhNDZjZDM0ZGE2YTYxZmQ4ZDY2Nzc0YjY1ZiUyNm5hbWUlM0RaYW1wZXR0aSUyNnRpbWVzdGFtcCUzRDE1ODY5NjM0NDU=// join link expire in 30 minutes
	}

	joinMessageChannel(token, uid) {
		let channel;
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			console.log('AgoraRTM', 'AgoraService.joinMessageChannel', messageClient);
			messageClient.login({ token: token, uid: uid.toString() }).then(() => {
				console.log('AgoraRTM', 'AgoraService.joinMessageChannel.login.success');
				channel = messageClient.createChannel(StateService.state.channelNameLink);
				return channel.join();
			}).then(() => {
				this.channel = channel;
				channel.on('ChannelMessage', this.onMessage);
				this.emit('channel', channel);
				// console.log('AgoraService.joinMessageChannel.success');
				resolve(uid);
				console.log('AgoraRTM', 'AgoraService.joinMessageChannel.join.success');
				channel.getMembers().then(members => {
					members = members.filter(x => x !== uid.toString());
					const message = { type: MessageType.ChannelMembers, members };
					this.broadcastMessage(message);
					console.log('AgoraRTM', 'AgoraService.joinMessageChannel.members', message);
				});
				console.log('AgoraRTM', 'AgoraService.joinMessageChannel', StateService.state.channelNameLink);
			}).catch(error => {
				console.log('AgoraRTM', 'AgoraService.joinMessageChannel.error', error);
				reject(error);
			});
		});
	}

	detectDevices(next) {
		AgoraService.getDevices().then((devices) => {
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
		}).catch((error) => {
			console.log('AgoraService.detectDevices', error);
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
		return new Promise((resolve, reject) => {
			const state = StateService.state;
			if (state.role === RoleType.SmartDevice || USE_AUTODETECT) {
				AgoraService.getDevices().then(inputDevices => {
					const devices = { videos: [], audios: [], video: null, audio: null };
					inputDevices.forEach(x => {
						if (x.kind === 'videoinput') {
							devices.videos.push(x);
						} else if (x.kind === 'audioinput') {
							devices.audios.push(x);
						}
					});
					// console.log(inputDevices);
					// console.log(devices);
					devices.video = devices.videos[0] || null;
					devices.audio = devices.audios[0] || null;
					StateService.patchState({ devices });
					resolve(devices);
				}).catch(error => {
					reject(error);
				});
			} else {
				resolve(state.devices);
			}
		});
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
		});
	}

	// If you prefer video smoothness to sharpness, use setVideoProfile
	// to set the video resolution and Agora self-adapts the video bitrate according to the network condition.
	// If you prefer video sharpness to smoothness, use setVideoEncoderConfiguration,
	// and set min in bitrate as 0.4 - 0.5 times the bitrate value in the video profile table.
	createLocalStreamWithOptions(options, quality) {
		const local = AgoraRTC.createStream(options);
		if (quality) {
			local.setVideoProfile(quality.profile);
			// local.setVideoEncoderConfiguration(quality);
		}
		// console.log('AgoraService.createLocalStreamWithOptions', options, quality, local.attributes);
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

	/*
	createMediaVideoStream(video, callback) {
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
	*/

	publishLocalStream() {
		const client = this.client;
		console.log('AgoraService.publishLocalStream');
		const local = StreamService.local;
		// publish local stream
		client.publish(local, (error) => {
			console.log('AgoraService.publishLocalStream.error', local.getId(), error);
		});
		local.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
			screenUid: StateService.state.screenUid,
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
		this.unpublishScreenStream();
		StreamService.remotes = [];
		StreamService.peers = [];
		return new Promise((resolve, reject) => {
			this.leaveMessageChannel().then(() => {
				Promise.all([this.leaveClient(), this.leaveScreenClient()]).then(() => {
					resolve();
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		});
	}

	leaveClient() {
		return new Promise((resolve, reject) => {
			const client = this.client;
			if (client) {
				client.leave(() => {
					this.client = null;
					// console.log('Leave channel successfully');
					if (environment.flags.useProxy) {
						client.stopProxyServer();
						console.log('AgoraService.client.stopProxyServer');
					}
					resolve();
				}, (error) => {
					console.log('AgoraService.leaveClient.error', error);
					reject(error);
				});
			} else {
				resolve();
			}
		});
	}

	leaveMessageChannel() {
		return new Promise((resolve, reject) => {
			if (USE_RTM) {
				this.unobserveMemberCount();
				const channel = this.channel;
				if (!channel) {
					return resolve();
				}
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

	previousMuteAudio_ = false;
	setAudio(audioMuted) {
		const local = StreamService.local;
		if (local && local.audio) {
			if (audioMuted) {
				this.previousMuteAudio_ = local.userMuteAudio;
				if (!local.userMuteAudio) {
					local.muteAudio();
					StateService.patchState({ audioMuted: true });
					this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: local.getId() }));
				}
			} else {
				if (local.userMuteAudio && !this.previousMuteAudio_) {
					local.unmuteAudio();
					StateService.patchState({ audioMuted: false });
					this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: local.getId() }));
				}
			}
		}
	}

	toggleMode() {
		const mode = StateService.state.mode === UIMode.VirtualTour ? UIMode.LiveMeeting : UIMode.VirtualTour;
		StateService.patchState({ mode });
		MessageService.send({
			type: MessageType.Mode,
			mode: mode,
		});
	}

	toggleNavInfo() {
		const showNavInfo = !StateService.state.showNavInfo;
		StateService.patchState({ showNavInfo });
		MessageService.send({
			type: MessageType.NavInfo,
			showNavInfo: showNavInfo,
		});
	}

	dismissControl() {
		return new Promise((resolve, _) => {
			const controllingId = StateService.state.controlling;
			if (controllingId) {
				this.sendRemoteControlDismiss(controllingId).then(() => {
					StateService.patchState({ controlling: false });
					resolve(controllingId);
				});
			} else {
				resolve(false);
			}
		});
	}

	requestControl(controllingId) {
		return new Promise((resolve, _) => {
			this.sendRemoteControlRequest(controllingId).then((controllingId) => {
				StateService.patchState({ controlling: controllingId });
				resolve(controllingId);
			});
		});
	}

	toggleControl(controllingId) {
		this.dismissSpy().then(() => {
			this.dismissControl().then((dismissedControllingId) => {
				if (dismissedControllingId !== controllingId) {
					this.requestControl(controllingId).then((controllingId) => {
						// console.log('AgoraService.toggleControl', controllingId);
					});
				}
			});
		});
	}

	toggleSilence() {
		const silencing = !StateService.state.silencing;
		this.sendMessage({
			type: MessageType.RemoteSilencing,
			silencing: silencing,
		});
		StateService.patchState({ silencing });
	}

	dismissSpy() {
		return new Promise((resolve, _) => {
			const spyingId = StateService.state.spying;
			if (spyingId) {
				this.sendRemoteSpyDismiss(spyingId).then(() => {
					StateService.patchState({ spying: false });
					resolve(spyingId);
				});
			} else {
				resolve(false);
			}
		});
	}

	requestSpy(spyingId) {
		return new Promise((resolve, _) => {
			this.sendSpyRemoteRequestInfo(spyingId).then(() => {
				StateService.patchState({ spying: spyingId });
				resolve(spyingId);
			});
		});
	}

	toggleSpy(spyingId) {
		this.dismissControl().then(() => {
			this.dismissSpy().then((dismissedSpyingId) => {
				if (dismissedSpyingId !== spyingId) {
					this.requestSpy(spyingId).then((spyingId) => {
						console.log('AgoraService.toggleSpy', spyingId);
					});
				}
			});
		});
	}

	sendRemoteRequestPeerInfo(remoteId) {
		console.log('AgoraService.sendRemoteRequestPeerInfo', remoteId);
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestPeerInfo,
				messageId: this.newMessageId(),
				remoteId: remoteId,
			}).then((message) => {
				console.log('AgoraService.sendRemoteRequestPeerInfo.response', message);
				if (message.type === MessageType.RequestPeerInfoResult) {
					// !!! RequestPeerInfoResult Publisher
					if (message.clientInfo.role === RoleType.Publisher) {
						const state = { hosted: true };
						if (message.clientInfo.controllingId) {
							state.controlling = message.clientInfo.controllingId;
							state.mode = message.clientInfo.mode;
							this.sendControlRemoteRequestInfo(message.clientInfo.controllingId);
						}
						StateService.patchState(state);
					}
					resolve(message);
				}
			});
		});
	}

	sendRemoteControlRequest(controllingId) {
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestControl,
				messageId: this.newMessageId(),
				controllingId: controllingId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteControlRequest.response', message);
				// !!! always accepted
				if (message.type === MessageType.RequestControlAccepted) {
					resolve(controllingId);
				} else if (message.type === MessageType.RequestControlRejected) {
					// this.remoteDeviceInfo = undefined
					resolve(false);
				}
			});
		});
	}

	sendRemoteControlDismiss(controllingId) {
		// !!! can't dismiss if room is empty
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestControlDismiss,
				messageId: this.newMessageId(),
				controllingId: controllingId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteControlDismiss return', message);
				if (message.type === MessageType.RequestControlDismissed) {
					resolve(controllingId);
				} else if (message.type === MessageType.RequestControlRejected) {
					resolve(false);
				}
			});
		});
	}

	sendControlRemoteRequestInfo(controllingId) {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestInfo,
				messageId: this.newMessageId(),
				remoteId: controllingId,
			}).then((message) => {
				// console.log('AgoraService.sendControlRemoteRequestInfo.response', message);
				if (message.type === MessageType.RequestInfoResult) {
					StateService.patchState({ controlling: controllingId });
					resolve(message);
				}
			});
		});
	}

	sendSpyRemoteRequestInfo(spyingId) {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestInfo,
				messageId: this.newMessageId(),
				remoteId: spyingId,
			}).then((message) => {
				// console.log('AgoraService.sendSpyRemoteRequestInfo.response', message);
				if (message.type === MessageType.RequestInfoResult) {
					StateService.patchState({ spying: spyingId });
					resolve(message);
				}
			});
		});
	}

	sendRemoteSpyDismiss(spyingId) {
		return new Promise((resolve, reject) => {
			this.sendMessage({
				type: MessageType.RequestInfoDismiss,
				messageId: this.newMessageId(),
				remoteId: spyingId,
			}).then((message) => {
				// console.log('AgoraService.sendRemoteSpyDismiss.response', message);
				if (message.type === MessageType.RequestInfoDismissed) {
					resolve(spyingId);
				} else if (message.type === MessageType.RequestInfoRejected) {
					resolve(false);
				}
			});
		});
	}

	newMessageId() {
		return `${StateService.state.uid}-${Date.now().toString()}`;
	}

	navToView(viewId, keepOrientation = false, useLastOrientation = false) {
		if (StateService.state.controlling === StateService.state.uid || StateService.state.spying === StateService.state.uid) {
			this.sendMessage({
				type: MessageType.NavToView,
				viewId: viewId,
				keepOrientation: keepOrientation,
				useLastOrientation: useLastOrientation,
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
				console.log('AgoraService.sendMessage');
				switch (message.type) {
					case MessageType.ControlInfo:
					case MessageType.NavToGrid:
					case MessageType.ShowPanel:
					case MessageType.PlayMedia:
					case MessageType.ZoomMedia:
					case MessageType.CurrentTimeMedia:
					case MessageType.PlayModel:
					case MessageType.Mode:
					case MessageType.NavInfo:
					case MessageType.NavLink:
					case MessageType.NavLinkClose:
						// console.log('AgoraService.sendMessage', StateService.state.uid, StateService.state.controlling, StateService.state.spying, StateService.state.controlling !== StateService.state.uid && StateService.state.spying !== StateService.state.uid);
						if (StateService.state.controlling !== StateService.state.uid && StateService.state.spying !== StateService.state.uid) {
							return;
						}
						break;
				}
				// message.wrc_version = 'beta';
				// message.uid = StateService.state.uid;
				const send = (message, channel) => {
					console.log('AgoraService.sendMessage', message);
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
						console.log('AgoraService.sendMessage.error', error);
						reject(error);
					}
				}
			} else {
				console.log('AgoraService.sendMessage.error', 'not connected');
				// console.log('StateService.state.connected', StateService.state.connected)
				// reject();
			}
		})
	}

	addOrUpdateChannelAttributes(messages) {
		const messageClient = this.messageClient;
		console.log('AgoraRTM', 'AgoraService.addOrUpdateChannelAttributes', messageClient);
		if (messageClient) {
			const attributes = {};
			messages.forEach(message => {
				const key = message.date.toString();
				attributes[key] = JSON.stringify(message);
			});
			if (Object.keys(attributes).length) {
				// console.log('AgoraService.setChannelAttributes', attributes);
				const promise = messageClient.addOrUpdateChannelAttributes(StateService.state.channelNameLink, attributes, { enableNotificationToChannelMembers: false });
				return from(promise).pipe(
					tap(_ => {
						console.log('AgoraRTM', 'AgoraService.addOrUpdateChannelAttributes', _);
					}),
					catchError(error => {
						console.log('AgoraRTM', 'AgoraService.addOrUpdateChannelAttributes.error', error);
						return of(null);
					}),
				);
			} else {
				return of(null);
			}
		} else {
			return of(null);
		}
	}

	getChannelAttributes() {
		const messageClient = this.messageClient;
		console.log('AgoraRTM', 'AgoraService.getChannelAttributes', messageClient);
		if (messageClient) {
			const promise = messageClient.getChannelAttributes(StateService.state.channelNameLink);
			return from(promise).pipe(
				map(attributes => Object.keys(attributes).map(key => attributes[key])),
				map(attributes => {
					attributes.sort((a, b) => {
						return a.lastUpdateTs - b.lastUpdateTs;
					});
					const messages = attributes.map(attribute => {
						const message = JSON.parse(attribute.value);
						// console.log('AgoraService.getChannelAttributes.attribute', attribute, message);
						return message;
					});
					console.log('AgoraRTM', 'AgoraService.getChannelAttributes', messages);
					return messages;
				}),
				catchError(error => {
					console.log('AgoraRTM', 'AgoraService.getChannelAttributes.error', error);
					return of([]);
				}),
			);
		} else {
			return of(null);
		}
	}

	checkBroadcastMessage(message) {
		// filter for broadcast
		// !!! filter events here
		switch (message.type) {
			case MessageType.RequestControlDismiss:
				StateService.patchState({ controlling: false });
				if (message.controllingId === StateService.state.uid) {
					this.unpublishScreenStream();
				}
				this.sendMessage({
					type: MessageType.RequestControlDismissed,
					messageId: message.messageId
				});
				break;
			case MessageType.RequestInfoDismiss:
				// console.log('checkBroadcastMessage.RequestInfoDismiss', message);
				StateService.patchState({ spying: false });
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
				} else if (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid) {
					this.broadcastMessage(message);
				}
				break;
			case MessageType.RemoteSilencing:
				// only streamers can be silenced
				if (StateService.state.role === RoleType.Streamer) {
					this.broadcastMessage(message);
				}
				break;
			case MessageType.ControlInfo:
			case MessageType.ShowPanel:
			case MessageType.PlayMedia:
			case MessageType.ZoomMedia:
			case MessageType.CurrentTimeMedia:
			case MessageType.PlayModel:
			case MessageType.Mode:
			case MessageType.NavInfo:
			case MessageType.NavToView:
			case MessageType.NavToGrid:
			case MessageType.NavLink:
			case MessageType.NavLinkClose:
				if ((StateService.state.controlling && StateService.state.controlling !== StateService.state.uid) || (StateService.state.spying && StateService.state.spying !== StateService.state.uid)) {
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
			console.log('AgoraService.onMessage', data.text, uid);
			const message = JSON.parse(data.text);
			if (message.messageId && this.has(`message-${message.messageId}`)) {
				// !!! removed return
				this.emit(`message-${message.messageId}`, message);
			}
			// discard message delivered to specific remoteId when differs from current state uid;
			if (message.remoteId && message.remoteId !== StateService.state.uid && message.remoteId !== StateService.state.screenUid) {
				return;
			}
			// !!! check position !!!
			if (message.type === MessageType.VRStarted) {
				const container = document.createElement('div');
				container.classList.add('player__vr');
				message.container = container;
			}
			/*
			if (message.type === MessageType.VRStarted || message.type === MessageType.VREnded) {
				// console.log('AgoraService.onMessage', message.type, message);
			}
			*/
			this.checkBroadcastMessage(message);
		}
	}

	onError(error) {
		console.log('AgoraService.onError', error);
	}

	onStreamPublished(event) {
		console.log('AgoraService.onStreamPublished', event);
		const local = StreamService.local;
		local.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
			screenUid: StateService.state.screenUid,
		};
		StreamService.local = local;
	}

	onStreamUnpublished(event) {
		// console.log('AgoraService.onStreamUnpublished');
		StreamService.local = null;
	}

	onStreamAdded(event) {
		console.log('AgoraService.onStreamAdded', event);
		const client = this.client;
		const stream = event.stream;
		if (!stream) {
			console.log('AgoraService.onStreamAdded.error', 'stream is undefined');
			return;
		}
		console.log('AgoraService.onStreamAdded', event.stream.getId());
		const streamId = stream.getId();
		// console.log('AgoraService.onStreamAdded', streamId, StateService.state.uid, StateService.state.screenUid);
		if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
			client.subscribe(stream, (error) => {
				console.log('AgoraService.onStreamAdded.subscribe.error', error);
			});
		}
	}

	onStreamRemoved(event) {
		const stream = event.stream;
		const streamId = stream.getId();
		if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
			// !!! this happen on oculus removed timeout
			// console.log('AgoraService.onStreamRemoved', streamId);
			this.remoteRemove(streamId);
		}
	}

	onStreamSubscribed(event) {
		console.log('AgoraService.onStreamSubscribed', event.stream.getId());
		this.remoteAdd(event.stream);
	}

	onPeerConnect(event) {
		console.log('AgoraService.onPeerConnect', event);
		this.peerAdd(event);
	}

	onPeerLeaved(event) {
		const remoteId = event.uid;
		if (remoteId !== StateService.state.uid) {
			// console.log('AgoraService.onPeerLeaved', event.uid);
			const remote = this.remoteRemove(remoteId);
			if (remote.clientInfo) {
				// !!! remove screenRemote?
				if (remote.clientInfo.role === RoleType.Publisher) {
					if (StateService.state.role === RoleType.SelfService) {
						StateService.patchState({ hosted: true, controlling: false, spying: false, silencing: false });
					} else {
						StateService.patchState({ hosted: false, controlling: false, spying: false, silencing: false });
					}
				} else {
					if (StateService.state.controlling === remoteId) {
						StateService.patchState({ controlling: false });
					}
					if (StateService.state.spying === remoteId) {
						StateService.patchState({ spying: false });
					}
				}
			}
		}
		this.peerRemove(remoteId);
	}

	peerAdd(event) {
		const peer = {
			uid: event.uid
		};
		console.log('AgoraService.peerAdd', peer);
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
		console.log('AgoraService.remoteAdd', stream);
		StreamService.remoteAdd(stream);
		this.broadcastEvent(new AgoraRemoteEvent({ stream }));
		const remoteId = stream.getId();
		this.sendRemoteRequestPeerInfo(remoteId).then((message) => {
			StreamService.remoteSetClientInfo(remoteId, message.clientInfo);
		});
	}

	remoteRemove(streamId) {
		// console.log('AgoraService.remoteRemove', streamId);
		const remote = StreamService.remoteRemove(streamId);
		if (remote && remote.clientInfo && remote.clientInfo.role === RoleType.Publisher && remote.clientInfo.screenUid !== streamId) {
			StateService.patchState({ hosted: false });
		}
		return remote;
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
		console.log('AgoraService.onTokenPrivilegeWillExpire');
		const client = this.client;
		const channelNameLink = this.getChannelNameLink();
		AgoraService.rtcToken$(channelNameLink).subscribe(token => {
			if (token.token) {
				client.renewToken(token.token);
				console.log('AgoraService.onTokenPrivilegeWillExpire.renewed');
			}
		});
	}

	onTokenPrivilegeDidExpire(event) {
		console.log('AgoraService.onTokenPrivilegeDidExpire');
		const client = this.client;
		const channelNameLink = this.getChannelNameLink();
		AgoraService.rtcToken$(channelNameLink).subscribe(token => {
			if (token.token) {
				client.renewToken(token.token);
				console.log('AgoraService.onTokenPrivilegeDidExpire.renewed');
			}
		});
	}

	// screen

	toggleScreen() {
		const screen = StreamService.screen;
		if (screen) {
			this.unpublishScreenStream();
		} else {
			if (this.screenClient) {
				this.createScreenStream(StateService.state.screenUid);
			} else {
				this.createScreenClient(() => {
					const channelNameLink = this.getChannelNameLink();
					AgoraService.rtcToken$(channelNameLink).subscribe(token => {
						// console.log('AgoraService.rtcToken$', token);
						this.screenJoin(token.token, channelNameLink);
					});
				});
			}
		}
		// console.log(screen);
	}

	createScreenClient(next) {
		if (this.screenClient) {
			next();
		}
		const screenClient = this.screenClient = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc, vp8
		const clientInit = () => {
			if (environment.flags.useProxy) {
				screenClient.startProxyServer(3);
				console.log('AgoraService.screenClient.startProxyServer');
			}
			screenClient.init(environment.appKey, () => {
				// console.log('AgoraRTC screenClient initialized');
				next();
			}, (error) => {
				// console.log('AgoraRTC client init failed', error);
				this.screenClient = null;
			});
		}
		clientInit();
		screenClient.on('error', this.onScreenError);
		screenClient.on('stream-published', this.onScreenStreamPublished);
		screenClient.on('stream-unpublished', this.onScreenStreamUnpublished);
		// only for remotes
		// screenClient.on('stream-added', this.onScreenStreamAdded);
		// screenClient.on('stream-removed', this.onScreenStreamRemoved);
		// screenClient.on('stream-subscribed', this.onScreenStreamSubscribed);
		// screenClient.on('peer-online', this.onScreenPeerConnect);
		// screenClient.on('peer-leave', this.onScreenPeerLeaved);
		// screenClient.on('onTokenPrivilegeWillExpire', this.onScreenTokenPrivilegeWillExpire);
		// screenClient.on('onTokenPrivilegeDidExpire', this.onScreenTokenPrivilegeDidExpire);
	}

	screenJoin(token, channelNameLink) {
		const screenClient = this.screenClient;
		const screenClientId = AgoraService.getUniqueUserId();
		// const screenClientId = SessionStorageService.get('bHereClientId') || AgoraService.getUniqueUserId();
		// console.log('AgoraService.screenJoin', { token, channelNameLink, screenClientId });
		screenClient.join(token, channelNameLink, screenClientId, (screenUid) => {
			// console.log('AgoraService.join', screenUid);
			StateService.patchState({ screenUid });
			this.createScreenStream(screenUid);
		}, (error) => {
			console.log('AgoraService.screenJoin.error', error);
			if (error === 'DYNAMIC_KEY_EXPIRED') {
				AgoraService.rtcToken$(channelNameLink).subscribe(token => {
					this.screenJoin(token.token, channelNameLink);
				});
			}
		});
	}

	createScreenStream(screenUid) {
		const options = {
			streamID: screenUid,
			audio: false,
			video: false,
			screen: true,
			// extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg', // Google Chrome:
			// mediaSource:  'screen', // Firefox: 'screen', 'application', 'window' (select one)
		}
		/*
		// Set relevant properties according to the browser.
		// Note that you need to implement isFirefox and isCompatibleChrome.
		if (isFirefox()) {
			options.mediaSource = 'window';
		} else if (!isCompatibleChrome()) {
			options.extensionId = 'minllpmhdgpndnkomcoccfekfegnlikg';
		}
		*/
		const stream = AgoraRTC.createStream(options);

		/*
		const quality = Object.assign({}, StateService.state.quality);
		console.log('AgoraService.createScreenStream', quality);
		if (quality) {
			// stream.setVideoProfile(quality.profile);
			// stream.setVideoEncoderConfiguration(quality);
		}
		*/

		stream.setScreenProfile(environment.profiles.screen);

		console.log('AgoraService.createScreenStream', options);

		const onStopScreenSharing = () => {
			this.unpublishScreenStream();
		};

		// Initialize the stream.
		stream.init(() => {
			StreamService.screen = stream;
			stream.on('stopScreenSharing', onStopScreenSharing);
			stream.muteAudio();
			setTimeout(() => {
				this.publishScreenStream();
			}, 1);
		}, function(error) {
			console.log('AgoraService.createScreenStream.screen.init.error', error);
		});
	}

	publishScreenStream() {
		const screenClient = this.screenClient;
		const screen = StreamService.screen;
		// publish screen stream
		screenClient.publish(screen, (error) => {
			console.log('AgoraService.publishScreenStream.error', screen.getId(), error);
		});
		screen.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
			screenUid: StateService.state.screenUid,
		};
		StreamService.screen = screen;
	}

	unpublishScreenStream() {
		const screenClient = this.screenClient;
		const screen = StreamService.screen;
		// console.log('AgoraService.unpublishScreenStream', screen, screenClient);
		if (screenClient && screen) {
			screenClient.unpublish(screen, (error) => {
				console.log('AgoraService.unpublishScreenStream.error', screen.getId(), error);
			});
		}
		StreamService.screen = null;
	}

	leaveScreenClient() {
		return new Promise((resolve, reject) => {
			const screenClient = this.screenClient;
			if (screenClient) {
				screenClient.leave(() => {
					this.screenClient = null;
					// console.log('Leave channel successfully');
					if (environment.flags.useProxy) {
						screenClient.stopProxyServer();
						console.log('AgoraService.screenClient.stopProxyServer');
					}
					resolve();
				}, (error) => {
					console.log('AgoraService.leaveScreenClient.error', error);
					reject(error);
				});
			} else {
				resolve();
			}
		});
	}

	onScreenError(error) {
		console.log('AgoraService.onScreenError', error);
	}

	onScreenStreamPublished(event) {
		// console.log('AgoraService.onScreenStreamPublished');
		const screen = StreamService.screen;
		screen.clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
			screenUid: StateService.state.screenUid,
		};
		StreamService.screen = screen;
	}

	onScreenStreamUnpublished(event) {
		// console.log('AgoraService.onScreenStreamUnpublished');
		StreamService.screen = null;
	}

	// tokens
	static rtcToken$(channelNameLink) {
		if (environment.flags.useToken) {
			return HttpService.post$('/api/token/rtc', { channelName: channelNameLink, uid: null });
		} else {
			return of({ token: null });
		}
	}

	static rtmToken$(uid) {
		if (environment.flags.useToken) {
			return HttpService.post$('/api/token/rtm', { uid: uid });
		} else {
			return of({ token: null });
		}
	}

	// checks
	static checkRtcConnection() {
		return new Promise((resolve, reject) => {
			try {
				const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
				if (environment.flags.useProxy) {
					client.startProxyServer(3);
				}
				client.init(environment.appKey, () => {
					AgoraService.checkRtcTryJoin(client).then(uid => {
						resolve(uid);
					}).catch(error => {
						reject(error);
					}).finally(() => {
						// clear
						client.leave(() => {
							if (environment.flags.useProxy) {
								client.stopProxyServer();
							}
						}, () => { });
					});
				}, (error) => {
					reject(error);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static checkRtcTryJoin(client) {
		return new Promise((resolve, reject) => {
			const channelName = 'checkRtcConnection';
			AgoraService.rtcToken$(channelName).subscribe(token => {
				client.join(token.token, channelName, null, (uid) => {
					// this.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
					resolve(uid);
				}, (error) => {
					if (error === 'DYNAMIC_KEY_EXPIRED') {
						return AgoraService.checkRtcTryJoin(client);
					} else {
						console.log('AgoraService.checkRtcConnection.error', error);
						reject(error);
					}
				});
			}, error => reject(error));
		});
	}

	static checkRtmConnection(uid) {
		return new Promise((resolve, reject) => {
			if (!USE_RTM) {
				return resolve();
			}
			try {
				let client = AgoraRTM.createInstance(environment.appKey, { logFilter: AgoraRTM.LOG_FILTER_OFF });
				client.setParameters({ logFilter: AgoraRTM.LOG_FILTER_OFF });
				let channel;
				AgoraService.rtmToken$(uid).subscribe(token => {
					// console.log('AgoraService.rtmToken$', token);
					const channelName = 'checkRtcConnection';
					client.login({ token: token.token, uid: uid.toString() }).then(() => {
						channel = client.createChannel(channelName);
						channel.join().then(() => {
							resolve(uid);
							channel.leave();
						}).catch((error) => {
							reject(error);
						}).finally(() => {
							// clear
							channel.leave().then(() => {
								channel = null;
								client.logout().then(() => {
									client = null;
								}).catch(() => { });
							}).catch(() => { });
						})
					}).catch((error) => {
						console.log('checkRtmConnection.error', error);
						reject(error);
					}).finally(() => {
						// clear
						if (client) {
							client.logout().then(() => {
								client = null;
							}).catch(() => { });
						}
					});
				}, error => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	static getDevices() {
		return new Promise((resolve, reject) => {
			let devices_ = AgoraService.devices_;
			if (devices_) {
				resolve(devices_);
			} else {
				devices_ = AgoraService.devices_ = [];
				const constraints = {
					audio: true,
					video: true,
				};
				if (DeviceService.platform === DevicePlatform.IOS) {
					constraints.video = { facingMode: 'user' };
				}
				if (DeviceService.platform === DevicePlatform.VRHeadset) {
					constraints.video = false;
				}
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
					navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
						navigator.mediaDevices.enumerateDevices().then((devices) => {
							stream.getTracks().forEach((track) => {
								track.stop();
							});
							devices.forEach((device) => {
								devices_.push(device);
							});
							resolve(devices_);
						}).catch((error) => {
							reject(error);
						})
					}).catch((error) => {
						reject(error);
					});
				} else {
					reject('Media device not available');
				}
			}
		});
	}

	static fixLegacy() {
		const prefixes = ['moz', 'webkit'];
		prefixes.forEach(prefix => {
			console.log('AgoraService', `fixing legacy ${prefix}RTC`);
			Object.getOwnPropertyNames(window).filter(key => key.indexOf('RTC') === 0).map(key => {
				const legacyKey = `${prefix}${key}`;
				if (typeof window[key] !== 'undefined' && typeof window[legacyKey] === 'undefined') {
					window[legacyKey] = window[key];
					// console.log(key, '->', legacyKey);
				}
			});
		});
	}
}
