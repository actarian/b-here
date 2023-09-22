import { from, interval, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import Emittable from '../emittable/emittable';
import { DEBUG, environment } from '../environment';
import { HttpService } from '../http/http.service';
import { Logger } from '../logger/logger';
import { MessageService } from '../message/message.service';
import StateService from '../state/state.service';
import SessionStorageService from '../storage/session-storage.service';
import StreamService from '../stream/stream.service';
import { RoleType } from '../user/user';
import { AgoraMuteAudioEvent, AgoraMuteVideoEvent, AgoraPeerEvent, AgoraRemoteEvent, AgoraStatus, AgoraUnmuteAudioEvent, AgoraUnmuteVideoEvent, AgoraVolumeLevelsEvent, MessageType, UIMode, USE_AUTODETECT, USE_RTM, USE_VOLUME_INDICATOR, getStreamQuality } from './agora.types';

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
		this.channelState = {};
		this.channelSnapshot = {};
		this.onException = this.onException.bind(this);
		this.onUserJoined = this.onUserJoined.bind(this);
		this.onUserLeft = this.onUserLeft.bind(this);
		this.onUserPublished = this.onUserPublished.bind(this);
		this.onUserUnpublished = this.onUserUnpublished.bind(this);
		/*
		this.onStreamAdded = this.onStreamAdded.bind(this);
		this.onStreamRemoved = this.onStreamRemoved.bind(this);
		this.onStreamSubscribed = this.onStreamSubscribed.bind(this);
		*/
		this.onMuteVideo = this.onMuteVideo.bind(this);
		this.onUnmuteVideo = this.onUnmuteVideo.bind(this);
		this.onMuteAudio = this.onMuteAudio.bind(this);
		this.onUnmuteAudio = this.onUnmuteAudio.bind(this);
		this.onVolumeIndicator = this.onVolumeIndicator.bind(this);
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

	get isHostRole() {
		return StateService.state.role === RoleType.Publisher || StateService.state.role === RoleType.Attendee;
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
		const devices = async () => {
			const videoTrack = await AgoraRTC.createCameraVideoTrack();
			const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
			const devices = await AgoraService.getDevices();
			// Logger.log('AgoraService.devices$.getDevices', devices);
			videoTrack.close();
			audioTrack.close();
			for (let i = 0; i < devices.length; i++) {
				const device = devices[i];
				// Logger.log('AgoraService.devices$', device.deviceId);
				if (device.kind === 'videoinput' && device.deviceId) {
					inputs.videos.push({
						label: device.label || 'camera-' + inputs.videos.length,
						deviceId: device.deviceId,
						kind: device.kind,
					});
				}
				if (device.kind === 'audioinput' && device.deviceId) {
					inputs.audios.push({
						label: device.label || 'microphone-' + inputs.audios.length,
						deviceId: device.deviceId,
						kind: device.kind,
					});
				}
			}
			if (inputs.videos.length > 0 || inputs.audios.length > 0) {
				return inputs;
			} else {
				throw inputs;
			}
		};
		return from(devices());
	}

	async connect(preferences) {
		if (!StateService.state.connecting) {
			const devices = StateService.state.devices;
			if (preferences) {
				devices.video = preferences.video;
				devices.audio = preferences.audio;
			}
			// Logger.log('AgoraService.connect', preferences, devices);
			StateService.patchState({ status: AgoraStatus.Connecting, connecting: true, devices });
			setTimeout(async () => {
				await this.createClient();
				const channelNameLink = this.getChannelNameLink();
				AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
					// Logger.log('AgoraService.rtcToken$', token);
					await this.join(token.token, channelNameLink);
				});
			}, 250);
		}
		return StateService.state$;
	}

	connect$(preferences) {
		return from(this.connect(preferences)).pipe(
			switchMap(() => StateService.state$),
		);
	}

	membersCount$(channelId) {
		const messageClient = this.messageClient;
		return interval(3000).pipe(
			switchMap(() => from(messageClient.getChannelMemberCount([channelId]))),
			map(counters => counters[channelId]),
			catchError(error => {
				Logger.error('AgoraService.membersCount$.error', error);
				return of(0);
			}),
			distinctUntilChanged(),
		);
	}

	observeMemberCount() {
		this.unobserveMemberCount();
		// !!! perf
		// only host roles collect membersCount to reduce call/sec.
		if (this.isHostRole) {
			this.membersCountSubscription = this.membersCount$(StateService.state.channelNameLink).subscribe(
				membersCount => {
					StateService.patchState({ membersCount: membersCount });
				},
			);
		}
	}

	unobserveMemberCount() {
		if (this.membersCountSubscription) {
			this.membersCountSubscription.unsubscribe();
			this.membersCountSubscription = null;
			StateService.patchState({ membersCount: 0 });
		}
	}

	async createClient() {
		if (this.client) {
			return this.client;
		}
		try {
			// Logger.log('agora rtc sdk version: ' + AgoraRTC.VERSION + ' compatible: ' + AgoraRTC.checkSystemRequirements());
			// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
			/*
			0: DEBUG. Output all API logs.
			1: INFO. Output logs of the INFO, WARNING and ERROR level.
			2: WARNING. Output logs of the WARNING and ERROR level.
			3: ERROR. Output logs of the ERROR level.
			4: NONE. Do not output any log.
			*/
			AgoraRTC.setLogLevel(2);
			const client = this.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc, vp8
			client.on('exception', this.onException);
			client.on('user-joined', this.onUserJoined);
			client.on('user-left', this.onUserLeft);
			client.on('user-published', this.onUserPublished);
			client.on('user-unpublished', this.onUserUnpublished);
			/*
			client.on('stream-added', this.onStreamAdded);
			client.on('stream-removed', this.onStreamRemoved);
			client.on('stream-subscribed', this.onStreamSubscribed);
			*/
			client.on('mute-video', this.onMuteVideo);
			client.on('unmute-video', this.onUnmuteVideo);
			client.on('mute-audio', this.onMuteAudio);
			client.on('unmute-audio', this.onUnmuteAudio);
			if (USE_VOLUME_INDICATOR) {
				client.enableAudioVolumeIndicator(); // Triggers the 'volume-indicator' callback event every two seconds.
				client.on('volume-indicator', this.onVolumeIndicator);
			}
			// client.on('connection-state-change', this.onConnectionStateChange);
			client.on('onTokenPrivilegeWillExpire', this.onTokenPrivilegeWillExpire);
			client.on('onTokenPrivilegeDidExpire', this.onTokenPrivilegeDidExpire);
			// Logger.log('AgoraService.createClient', 'agora rtm sdk version: ' + AgoraRTM.VERSION + ' compatible');
			if (USE_RTM) {
				/*
				AgoraRTM.LOG_FILTER_OFF
				AgoraRTM.LOG_FILTER_ERROR
				AgoraRTM.LOG_FILTER_INFO (Default)
				AgoraRTM.LOG_FILTER_WARNING
				*/
				const messageClient = this.messageClient = AgoraRTM.createInstance(environment.appKey, { logFilter: AgoraRTM.LOG_FILTER_OFF }); // LOG_FILTER_DEBUG
				messageClient.setParameters({ logFilter: AgoraRTM.LOG_FILTER_OFF });
				Logger.log('AgoraService.createClient', 'client initialized');
				// messageClient.on('ConnectionStateChanged', Logger.warn);
				// messageClient.on('MessageFromPeer', Logger.log);
			}
			await client.setClientRole(this.isAudienceRole ? 'audience' : 'host'); // 'audience' | 'host', AUDIENCE_LEVEL_LOW_LATENCY = 1
			if (environment.flags.useProxy) {
				client.startProxyServer(3);
				/*
				3: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
				5: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TLS 443.
				Note: As of v4.15.0, the default value of mode is 3.
				*/
				Logger.log('AgoraService.createClient.startProxyServer');
			}
		} catch (error) {
			Logger.error('AgoraService.createClient.error', error);
			this.client = null;
		}
		return this.client;
	}

	getChannelNameLink() {
		let link = StateService.state.link || '';
		const match = link.match(/(\d{9})-(\d{4})-(\d{13})/);
		if (match) {
			link = `${match[1]}-${match[3]}`;
		}
		const channelName = StateService.state.channelName;
		const channelNameLink = `${channelName}-${link}`;
		// Logger.log('AgoraService.getChannelNameLink', channelNameLink);
		return channelNameLink;
	}

	static getUniqueUserId() {
		// max safe integer 9007199254740991 length 16
		// max allowed integer 4294967296 2^32
		// const m = 9007199254740991;
		const mult = 10000000000000;
		const a = (1 + Math.floor(Math.random() * 8)) * 100;
		const b = (1 + Math.floor(Math.random() * 8)) * 10;
		const c = (1 + Math.floor(Math.random() * 8)) * 1;
		const combo = (a + b + c);
		const date = Date.now();
		const uid = combo * mult + date;
		// Logger.log('AgoraService.getUniqueUserId', combo);
		// Logger.log('AgoraService.getUniqueUserId', date);
		// Logger.log('AgoraService.getUniqueUserId', m);
		// Logger.log('AgoraService.getUniqueUserId', uid);
		return uid.toString();
	}

	async join(token, channelNameLink) {
		this.channel = null;
		const client = this.client;
		const clientId = SessionStorageService.get('bHereClientId') || AgoraService.getUniqueUserId();
		Logger.log('AgoraService.join', { token, channelNameLink, clientId });
		try {
			const uid = await client.join(environment.appKey, channelNameLink, token, clientId);
			// Logger.log('AgoraService.join', uid);
			StateService.patchState({ status: AgoraStatus.Connected, channelNameLink, connected: true, uid: uid });
			SessionStorageService.set('bHereClientId', uid);
			if (USE_RTM) {
				AgoraService.rtmToken$(uid).subscribe(async (token) => {
					// Logger.log('AgoraService.join.rtmToken$', token);
					try {
						await this.joinMessageChannel(token.token, uid);
						// Logger.log('AgoraService.join.joinMessageChannel.success', success);
						if (!this.isAudienceRole) {
							const devices = await this.autoDetectDevice();
							await this.createMediaStream(uid, devices.video, devices.audio);
						}
						this.observeMemberCount();
					} catch (error) {
						Logger.error('AgoraService.join.joinMessageChannel.error', error);
					}
				});
			} else {
				if (!this.isAudienceRole) {
					const devices = await this.autoDetectDevice();
					await this.createMediaStream(uid, devices.video, devices.audio);
				}
			}
		} catch (error) {
			Logger.error('AgoraService.join.error', error);
			if (error === 'DYNAMIC_KEY_EXPIRED') {
				AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
					await this.join(token.token, channelNameLink);
				});
			}
		}
	}

	joinMessageChannel(token, uid) {
		let channel;
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			Logger.log('AgoraService.joinMessageChannel', messageClient);
			messageClient.login({ token: token, uid: uid.toString() }).then(() => {
				Logger.log('AgoraService.joinMessageChannel.login.success');
				channel = messageClient.createChannel(StateService.state.channelNameLink);
				return channel.join();
			}).then(() => {
				this.channel = channel;
				channel.on('ChannelMessage', this.onMessage);
				this.emit('channel', channel);
				// Logger.log('AgoraService.joinMessageChannel.success');
				resolve(uid);
				Logger.log('AgoraService.joinMessageChannel.join.success');
				channel.getMembers().then(members => {
					members = members.filter(x => x !== uid.toString());
					const message = { type: MessageType.ChannelMembers, members };
					this.broadcastMessage(message);
					Logger.log('AgoraService.joinMessageChannel.members', message);
				});
				Logger.log('AgoraService.joinMessageChannel', StateService.state.channelNameLink);
			}).catch(error => {
				Logger.error('AgoraService.joinMessageChannel.error', error);
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
						kind: device.kind,
					});
				}
				if ('audioinput' == device.kind) {
					audios.push({
						label: device.label || 'microphone-' + videos.length,
						deviceId: device.deviceId,
						kind: device.kind,
					});
				}
			}
			next({ videos: videos, audios: audios });
		}).catch((error) => {
			Logger.error('AgoraService.detectDevices', error);
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
							// Logger.log('AgoraService.getVideoOptions.hls', data.levels);
							element.play().then(success => {
								const stream = element.captureStream();
								options.videoSource = stream.getVideoTracks()[0];
								// Logger.log('AgoraService.getVideoOptions', element, stream, stream.getVideoTracks());
								resolve(options);
							}, error => {
								Logger.error('AgoraService.getVideoOptions.error', error);
							});
						});
					});
				} else if (video.kind === 'videoplayer' || video.kind === 'videostream') {
					const element = document.querySelector('#' + video.deviceId);
					element.crossOrigin = 'anonymous';
					// element.oncanplay = () => {
					const stream = element.captureStream();
					options.videoSource = stream.getVideoTracks()[0];
					// Logger.log('getVideoOptions', element, stream, stream.getVideoTracks());
					resolve(options);
					// };
					/*
					element.play().then(success => {
						const stream = element.captureStream();
						options.videoSource = stream.getVideoTracks()[0];
						// Logger.log('getVideoOptions', element, stream, stream.getVideoTracks());
						resolve(options);
					}, error => {
						// Logger.error('AgoraService.getVideoOptions.error', error);
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
							// Logger.log('AgoraService.getAudioOptions.hls', data.levels);
							hls.loadLevel = data.levels.length - 1;
							element.play().then(success => {
								const stream = element.captureStream();
								options.audioSource = stream.getAudioTracks()[0];
								// Logger.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
								resolve(options);
							}, error => {
								Logger.error('AgoraService.getAudioOptions.error', error);
							});
						});
					});
				} else if (audio.kind === 'videoplayer' || audio.kind === 'videostream') {
					const element = document.querySelector('#' + audio.deviceId);
					element.crossOrigin = 'anonymous';
					// element.oncanplay = () => {
					const stream = element.captureStream();
					options.audioSource = stream.getAudioTracks()[0];
					// Logger.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
					resolve(options);
					// };
					/*
					element.play().then(success => {
						const stream = element.captureStream();
						options.audioSource = stream.getAudioTracks()[0];
						// Logger.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
						resolve(options);
					}, error => {
						// Logger.error('AgoraService.getAudioOptions.error', error);
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

	async autoDetectDevice() {
		const state = StateService.state;
		if (state.role === RoleType.SmartDevice || USE_AUTODETECT) {
			const inputDevices = await AgoraService.getDevices();
			const devices = { videos: [], audios: [], video: null, audio: null };
			inputDevices.forEach(x => {
				if (x.kind === 'videoinput') {
					devices.videos.push(x);
				} else if (x.kind === 'audioinput') {
					devices.audios.push(x);
				}
			});
			devices.video = devices.videos[0] || null;
			devices.audio = devices.audios[0] || null;
			StateService.patchState({ devices });
			return devices;
		}
	}

	async createMediaStream(uid, video, audio) {
		// this.releaseStream('_mediaVideoStream')
		const options = {
			streamID: uid,
			video: Boolean(video),
			audio: Boolean(audio),
			screen: false,
		};
		await this.getVideoOptions(options, video);
		await this.getAudioOptions(options, audio);
		const quality = Object.assign({}, StateService.state.quality);
		await this.createLocalStreamWithOptions(options, quality);
	}

	// If you prefer video smoothness to sharpness, use setVideoProfile
	// to set the video resolution and Agora self-adapts the video bitrate according to the network condition.
	// If you prefer video sharpness to smoothness, use setVideoEncoderConfiguration,
	// and set min in bitrate as 0.4 - 0.5 times the bitrate value in the video profile table.
	async createLocalStreamWithOptions(options, quality) {
		try {
			const tracks = [];
			if (options.audio) {
				const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
					microphoneId: options.microphoneId,
				});
				tracks.push(audioTrack);
			}
			if (options.video) {
				const videoTrack = await AgoraRTC.createCameraVideoTrack({
					cameraId: options.cameraId,
					encoderConfig: quality.profile,
				});
				/*
				if (quality) {
					local.setVideoProfile(quality.profile);
					// local.setVideoEncoderConfiguration(quality);
				}
				*/
				tracks.push(videoTrack);
			}
			StreamService.local = tracks;
			setTimeout(async () => {
				await this.publishLocalStream();
			}, 1);
			Logger.log('AgoraService.createLocalStreamWithOptions', tracks, options, quality);
		} catch (error) {
			Logger.error('AgoraService.createLocalStreamWithOptions.init.error', error);
			throw error;
		}
	}

	async publishLocalStream() {
		try {
			Logger.log('AgoraService.publishLocalStream');
			const clientInfo = await this.setUserState();
			const local = StreamService.local;
			const client = this.client;
			await client.publish(local);
			local.clientInfo = clientInfo;
			StreamService.local = local;
		} catch (error) {
			Logger.error('AgoraService.publishLocalStream.error', error);
			throw error;
		}
	}

	async unpublishLocalStream() {
		try {
			Logger.log('AgoraService.unpublishLocalStream');
			const client = this.client;
			const local = StreamService.local;
			if (local) {
				await client.unpublish(local);
			}
			await this.clearLocalUserAttributes();
			StreamService.local = null;
		} catch (error) {
			Logger.error('AgoraService.unpublishLocalStream.error', error);
			throw error;
		}
	}

	async leaveChannel() {
		try {
			StateService.patchState({ connecting: false });
			await this.unpublishLocalStream();
			await this.unpublishScreenStream();
			StreamService.remotes = [];
			StreamService.peers = [];
			await this.leaveMessageChannel();
			await this.leaveClient();
			await this.leaveScreenClient();
		} catch (error) {
			Logger.error('AgoraService.leaveChannel.error', error);
			throw error;
		}
	}

	leaveClient() {
		return new Promise((resolve, reject) => {
			const client = this.client;
			if (client) {
				client.leave(() => {
					this.client = null;
					// Logger.log('AgoraService.leaveClient', 'Leave channel successfully');
					if (environment.flags.useProxy) {
						client.stopProxyServer();
						Logger.log('AgoraService.leaveClient.stopProxyServer');
					}
					resolve();
				}, (error) => {
					Logger.error('AgoraService.leaveClient.error', error);
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
				}, reject);
			} else {
				return resolve();
			}
		});
	}

	toggleCamera() {
		const local = StreamService.local;
		// Logger.log('AgoraService.toggleCamera', local);
		if (local && local.video) {
			if (local.userMuteVideo) {
				local.unmuteVideo();
				StateService.patchState({ cameraMuted: false });
				this.broadcastEvent(new AgoraUnmuteVideoEvent({ streamId: local.getId() }));
				this.setUserState();
			} else {
				local.muteVideo();
				StateService.patchState({ cameraMuted: true });
				this.broadcastEvent(new AgoraMuteVideoEvent({ streamId: local.getId() }));
				this.setUserState();
			}
		}
	}

	toggleAudio() {
		const local = StreamService.local;
		// Logger.log('AgoraService.toggleAudio', local);
		if (local && local.audio) {
			if (local.userMuteAudio) {
				local.unmuteAudio();
				StateService.patchState({ audioMuted: false });
				this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: local.getId() }));
				this.setUserState();
			} else {
				local.muteAudio();
				StateService.patchState({ audioMuted: true });
				this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: local.getId() }));
				this.setUserState();
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
					this.setUserState();
				}
			} else {
				if (local.userMuteAudio && !this.previousMuteAudio_) {
					local.unmuteAudio();
					StateService.patchState({ audioMuted: false });
					this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: local.getId() }));
					this.setUserState();
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
		this.setChannelState({ mode });
	}

	toggleNavInfo() {
		const showNavInfo = !StateService.state.showNavInfo;
		StateService.patchState({ showNavInfo });
		MessageService.send({
			type: MessageType.NavInfo,
			showNavInfo: showNavInfo,
		});
	}

	/**
	 * controllingId is the uid of the controller user.
	 */
	requestControl(controllingId) {
		return new Promise((resolve, _) => {
			this.sendRequestControl(controllingId).then((controllingId) => {
				StateService.patchState({ controlling: controllingId, spying: false });
				resolve(controllingId);
				this.setChannelState({ controlling: controllingId, spying: '' });
			});
		});
	}

	requestSpy(spyingId) {
		return new Promise((resolve, _) => {
			this.sendRequestSpy(spyingId).then((spyingId) => {
				StateService.patchState({ spying: spyingId, controlling: false });
				resolve(spyingId);
				this.setChannelState({ spying: spyingId, controlling: '' });
			});
		});
	}

	/**
	 * controllingId is the uid of the controller user.
	 */
	dismissControl(skipAttributes = false) {
		return new Promise((resolve, _) => {
			const controllingId = StateService.state.controlling;
			if (controllingId) {
				this.sendRequestControlDismiss(controllingId).then(() => {
					StateService.patchState({ controlling: false });
					resolve(controllingId);
					if (!skipAttributes) {
						this.setChannelState({ controlling: '' });
					}
				});
			} else {
				resolve(false);
			}
		});
	}

	dismissSpy(skipAttributes = false) {
		return new Promise((resolve, _) => {
			const spyingId = StateService.state.spying;
			if (spyingId) {
				this.sendRequestSpyDismiss(spyingId).then(() => {
					StateService.patchState({ spying: false });
					resolve(spyingId);
					if (!skipAttributes) {
						this.setChannelState({ spying: '' });
					}
				});
			} else {
				resolve(false);
			}
		});
	}

	/**
	 * controllingId is the uid of the controller user.
	 */
	toggleControl(controllingId) {
		this.dismissSpy(true).then(() => {
			this.dismissControl(true).then((dismissedControllingId) => {
				if (dismissedControllingId !== controllingId) {
					this.requestControl(controllingId).then((controllingId) => {
						Logger.log('AgoraService.toggleControl', controllingId);
					});
				} else {
					this.setChannelState({ controlling: '' });
				}
			});
		});
	}

	toggleSpy(spyingId) {
		this.dismissControl(true).then(() => {
			this.dismissSpy(true).then((dismissedSpyingId) => {
				if (dismissedSpyingId !== spyingId) {
					this.requestSpy(spyingId).then((spyingId) => {
						Logger.log('AgoraService.toggleSpy', spyingId);
					});
				} else {
					this.setChannelState({ spying: '' });
				}
			});
		});
	}

	sendRequestControl(controllingId) {
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestControl,
				controllingId: controllingId,
			}).then(() => {
				resolve(controllingId);
			});
		});
	}

	sendRequestSpy(spyingId) {
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestSpy,
				spyingId: spyingId,
			}).then(() => {
				resolve(spyingId);
			});
		});
	}

	sendRequestControlDismiss(controllingId) {
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestControlDismiss,
				controllingId: controllingId,
			}).then(() => {
				resolve(controllingId);
			});
		});
	}

	sendRequestSpyDismiss(spyingId) {
		return new Promise((resolve, _) => {
			this.sendMessage({
				type: MessageType.RequestSpyDismiss,
				spyingId: spyingId,
			}).then(() => {
				resolve(spyingId);
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
		// !!! todo silencing
		// this.setChannelState({ silencing });
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
			Logger.log(`
AgoraService.getSessionStats
	Duration: ${stats.Duration}
	UserCount: ${stats.UserCount}
	SendBytes: ${stats.SendBytes}
	RecvBytes: ${stats.RecvBytes}
	SendBitrate: ${stats.SendBitrate}
	RecvBitrate: ${stats.RecvBitrate}
`);
		});
	}

	getSystemStats() {
		const client = this.client;
		client.getSystemStats((stats) => {
			Logger.log(`
AgoraService.getSystemStats
			BatteryLevel: ${stats.BatteryLevel}
`);
		});
	}

	sendMessage(message) {
		return new Promise((resolve, reject) => {
			if (StateService.state.connected) {
				message.clientId = StateService.state.uid;
				// Logger.log('AgoraService.sendMessage');
				switch (message.type) {
					case MessageType.ControlInfo:
					case MessageType.CurrentTimeMedia:
					case MessageType.MenuToggle:
					case MessageType.Mode:
					case MessageType.NavInfo:
					case MessageType.NavLink:
					case MessageType.NavLinkClose:
					case MessageType.NavToGrid:
					case MessageType.NavToView:
					case MessageType.PlayMedia:
					case MessageType.PlayModel:
					case MessageType.SelectItem:
					case MessageType.ShowPanel:
					case MessageType.SlideChange:
					case MessageType.VREnded:
					case MessageType.VRStarted:
					case MessageType.VRState:
					case MessageType.ZoomMedia:
					case MessageType.SetSnapshot:
						// Logger.log('AgoraService.sendMessage', StateService.state.uid, StateService.state.controlling, StateService.state.spying, StateService.state.controlling !== StateService.state.uid && StateService.state.spying !== StateService.state.uid);
						if (
							StateService.state.controlling !== StateService.state.uid &&
							StateService.state.spying !== StateService.state.uid
						) {
							return;
						}
						break;
				}
				// message.wrc_version = 'beta';
				// message.uid = StateService.state.uid;
				const onMessageSent = (message) => {
					resolve(message);
					// rewire inner messages
					switch (message.type) {
						case MessageType.RequestControl:
							// !!! rewire inner message
							this.broadcastMessage(message);
							break;
						case MessageType.SetSnapshot:
							// !!! saving channel snapshot
							this.setChannelSnapshot(message);
							break;
					}
				};
				const send = (message, channel) => {
					Logger.log('AgoraService.sendMessage', message);
					try {
						const text = JSON.stringify(message);
						if (message.messageId) {
							this.once(`message-${message.messageId}`, (message) => {
								onMessageSent(message);
							});
						}
						// Logger.log('AgoraService.sendMessage.sending', message.type);
						channel.sendMessage({ text: text }).then(() => {
							// Logger.log('AgoraService.sendMessage', text);
							if (!message.messageId) {
								onMessageSent(message);
							}
						}).catch(error => {
							Logger.error('AgoraService.sendMessage.error', error);
						});
					} catch (error) {
						Logger.error('AgoraService.sendMessage.error', error);
						// reject(error);
					}
				};
				const channel = this.channel;
				if (channel) {
					send(message, channel);
				} else {
					try {
						this.once('channel', (channel) => {
							send(message, channel);
						});
					} catch (error) {
						Logger.error('AgoraService.sendMessage.error', error);
						reject(error);
					}
				}
			} else {
				Logger.error('AgoraService.sendMessage.error', 'not connected');
				// reject();
			}
		});
	}

	/**
	 * @description getChannelAttributes
	 * @returns Record<string, { lastUpdateTs: number, value: string }>
	 */
	getChannelAttributes() {
		Logger.log('AgoraService.getChannelAttributes');
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient) {
				const promise = messageClient.getChannelAttributes(StateService.state.channelNameLink);
				promise.then((attributes) => {
					Logger.log('AgoraService.getChannelAttributes', attributes);
					resolve(attributes);
				}).catch(error => {
					Logger.error('AgoraService.getChannelAttributes.error', error);
					resolve({});
				});
			} else {
				Logger.error('AgoraService.getChannelAttributes.noop');
				resolve({});
			}
		});
	}

	/**
	 * @description getChannelAttributesByKeys
	 * @params string[]
	 * @returns Record<string, string>
	 */
	getChannelAttributesByKeys(...keys) {
		Logger.log('AgoraService.getChannelAttributesByKeys', keys);
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient) {
				const promise = messageClient.getChannelAttributes(StateService.state.channelNameLink, keys);
				promise.then((attributes) => {
					Logger.log('AgoraService.getChannelAttributesByKeys', attributes);
					const mappedAttributes = {};
					Object.keys(attributes).forEach(key => {
						mappedAttributes[key] = attributes[key].value;
					});
					resolve(mappedAttributes);
				}).catch(error => {
					Logger.error('AgoraService.getChannelAttributesByKeys.error', error);
					resolve({});
				});
			} else {
				Logger.error('AgoraService.getChannelAttributesByKeys.noop', keys);
				resolve({});
			}
		});
	}

	/**
	 * @description getChannelMessages
	 * @returns { date: number, clientId: string, name: string, message: string }[]
	 */
	getChannelMessages() {
		Logger.log('AgoraService.getChannelMessages');
		return from(this.getChannelAttributes()).pipe(
			map(attributes => Object.keys(attributes)
				.filter(key => key.indexOf('message-') === 0)
				.map(key => attributes[key]),
			),
			map(attributes => {
				attributes.sort((a, b) => {
					return a.lastUpdateTs - b.lastUpdateTs;
				});
				const messages = attributes.map(attribute => {
					const message = JSON.parse(attribute.value);
					return message;
				});
				Logger.log('AgoraService.getChannelMessages', messages);
				return messages;
			}),
			catchError(error => {
				Logger.error('AgoraService.getChannelMessages.error', error);
				return of([]);
			}),
		);
	}

	/**
	 * @description addOrUpdateChannelAttributes
	 * @params attributes: Record<string, string>
	 */
	addOrUpdateChannelAttributes(attributes) {
		Logger.log('AgoraService.addOrUpdateChannelAttributes', attributes);
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient && Object.keys(attributes).length > 0) {
				const promise = messageClient.addOrUpdateChannelAttributes(StateService.state.channelNameLink, attributes, { enableNotificationToChannelMembers: false });
				promise.then(() => {
					Logger.log('AgoraService.addOrUpdateChannelAttributes', attributes);
				}).catch(error => {
					Logger.error('AgoraService.addOrUpdateChannelAttributes.error', error);
				}).finally(() => {
					resolve();
				});
			} else {
				Logger.error('AgoraService.addOrUpdateChannelAttributes.noop', attributes);
				resolve();
			}
		});
	}

	/**
	 * this method is called after remote stream of the publisher has been added.
	 */
	getInitialSession() {
		this.getChannelSession().then(session => {
			StateService.patchState(session.state);
			if (session.state.controlling && session.snapshot) {
				// !!! rewire inner message to update view snapshot
				this.broadcastMessage(session.snapshot);
			}
			// handle window mode changes
			window.dispatchEvent(new Event('resize'));
		});
	}

	/**
	 * @description getChannelSession
	 * @returns { state: State, snapshot: Snapshot }
	 */
	getChannelSession() {
		Logger.log('AgoraService.getChannelSession');
		return new Promise((resolve, reject) => {
			this.getChannelAttributesByKeys('channelState', 'channelSnapshot').then(attributes => {
				const channelSession = {
					state: {},
					snapshot: {},
				};
				if (attributes.channelState) {
					const channelState = JSON.parse(attributes.channelState);
					this.channelState = channelState;
					channelSession.state = channelState;
				}
				if (attributes.channelSnapshot) {
					const channelSnapshot = JSON.parse(attributes.channelSnapshot);
					this.channelSnapshot = channelSnapshot;
					channelSession.snapshot = channelSnapshot;
				}
				Logger.log('AgoraService.getChannelSession', channelSession);
				resolve(channelSession);
			}).catch(error => {
				Logger.error('AgoraService.getChannelSession.error', error);
				resolve({});
			});
		});
	}

	/**
	 * @description getChannelState
	 * @returns State
	 */
	getChannelState() {
		Logger.log('AgoraService.getChannelState');
		return new Promise((resolve, reject) => {
			this.getChannelAttributesByKeys('channelState').then(attributes => {
				if (attributes.channelState) {
					const channelState = JSON.parse(attributes.channelState);
					this.channelState = channelState;
					/*
					const channelState = {
						role: StateService.state.role,
						name: StateService.state.name,
						uid: StateService.state.uid,
						screenUid: StateService.state.screenUid,
						controlling: StateService.state.controlling,
						spying: StateService.state.spying,
						mode: StateService.state.mode,
					};
					*/
					Logger.log('AgoraService.getChannelState', channelState);
					resolve(channelState);
				} else {
					resolve({});
				}
			}).catch(error => {
				Logger.error('AgoraService.getChannelState.error', error);
				resolve({});
			});
		});
	}

	/**
	 * @description setChannelState
	 * @params partialState: Record<string, string>
	 */
	setChannelState(partialState) {
		const channelState = { ...(this.channelState || {}), ...partialState };
		Logger.log('AgoraService.setChannelState', partialState, channelState);
		return this.addOrUpdateChannelAttributes({ channelState: JSON.stringify(channelState) });
	}

	/**
	 * @description getChannelSnapshot
	 * @returns Snapshot
	 */
	getChannelSnapshot() {
		Logger.log('AgoraService.getChannelSnapshot');
		return new Promise((resolve, reject) => {
			this.getChannelAttributesByKeys('channelSnapshot').then(attributes => {
				if (attributes.channelSnapshot) {
					const channelSnapshot = JSON.parse(attributes.channelSnapshot);
					this.channelSnapshot = channelSnapshot;
					Logger.log('AgoraService.getChannelSnapshot', channelSnapshot);
					resolve(channelSnapshot);
				} else {
					resolve({});
				}
			}).catch(error => {
				Logger.error('AgoraService.getChannelSnapshot.error', error);
				resolve({});
			});
		});
	}

	/**
	 * @description setChannelSnapshot
	 * @params partialSnapshot: Record<string, string>
	 */
	setChannelSnapshot(partialSnapshot) {
		const channelSnapshot = { ...(this.channelSnapshot || {}), ...partialSnapshot };
		Logger.log('AgoraService.setChannelSnapshot', partialSnapshot, channelSnapshot);
		return this.addOrUpdateChannelAttributes({ channelSnapshot: JSON.stringify(channelSnapshot) });
	}

	padStart(num, count = 5, char = '0') {
		const s = String(num);
		return s.length >= count ? s : new Array(count - s.length + 1).join(char) + s;
	}

	/**
	 * @description addOrUpdateChannelMessages
	 * @params messages: { date: number, clientId: string, name: string, message: string }[]
	 */
	addOrUpdateChannelMessages(messages) {
		const attributes = {};
		messages.forEach(message => {
			const num = Math.floor(Math.random() * 10000);
			const key = `message-${message.date}-${this.padStart(num)}`;
			attributes[key] = JSON.stringify(message);
		});
		return this.addOrUpdateChannelAttributes(attributes);
	}

	deleteChannelAttributesByKeys(keys) {
		Logger.log('AgoraService.deleteChannelAttributesByKeys', keys);
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient && keys.length > 0) {
				const promise = messageClient.deleteChannelAttributesByKeys(StateService.state.channelNameLink, keys, { enableNotificationToChannelMembers: false });
				promise.then(() => {
					Logger.log('AgoraService.deleteChannelAttributesByKeys', keys);
					resolve();
				}).catch(error => {
					Logger.error('AgoraService.deleteChannelAttributesByKeys.error', error);
					reject(error);
				});
			} else {
				Logger.error('AgoraService.deleteChannelAttributesByKeys.noop', keys);
				reject('missing rtm client or keys');
			}
		});
	}

	setUserState() {
		const clientInfo = {
			role: StateService.state.role,
			name: StateService.state.name,
			uid: StateService.state.uid,
			screenUid: StateService.state.screenUid,
			cameraMuted: StateService.state.cameraMuted,
			audioMuted: StateService.state.audioMuted,
		};
		Logger.log('AgoraService.setUserState', clientInfo);
		return this.addOrUpdateLocalUserAttributes({ clientInfo: JSON.stringify(clientInfo) }).then(() => {
			return clientInfo;
		});
	}

	getUserState(remoteId) {
		return this.getUserAttributes(remoteId).then(attributes => {
			const clientInfo = JSON.parse(attributes.clientInfo || '');
			Logger.log('AgoraService.getUserState', clientInfo);
			return clientInfo;
		});
	}

	addOrUpdateLocalUserAttributes(attributes) {
		Logger.log('AgoraService.addOrUpdateLocalUserAttributes', attributes);
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient && Object.keys(attributes).length > 0) {
				const promise = messageClient.addOrUpdateLocalUserAttributes(attributes);
				promise.then(() => {
					Logger.log('AgoraService.addOrUpdateLocalUserAttributes', attributes);
					resolve();
				}).catch(error => {
					Logger.error('AgoraService.addOrUpdateLocalUserAttributes.error', error);
					reject(error);
				});
			} else {
				Logger.error('AgoraService.addOrUpdateLocalUserAttributes.noop', attributes);
				reject('missing rtm client or attributes');
			}
		});
	}

	getUserAttributes(userId) {
		Logger.log('AgoraService.getUserAttributes', userId);
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient) {
				const promise = messageClient.getUserAttributes(userId);
				promise.then((attributes) => {
					Logger.log('AgoraService.getUserAttributes', attributes);
					resolve(attributes);
				}).catch(error => {
					Logger.error('AgoraService.getUserAttributes.error', error);
					reject(error);
				});
			} else {
				Logger.error('AgoraService.getUserAttributes', 'missing rtm client');
				reject('missing rtm client');
			}
		});
	}

	clearLocalUserAttributes() {
		Logger.log('AgoraService.clearLocalUserAttributes');
		return new Promise((resolve, reject) => {
			const messageClient = this.messageClient;
			if (messageClient) {
				const promise = messageClient.clearLocalUserAttributes();
				promise.then(() => {
					Logger.log('AgoraService.clearLocalUserAttributes');
					resolve();
				}).catch(error => {
					Logger.error('AgoraService.clearLocalUserAttributes.error', error);
					resolve();
				});
			} else {
				resolve();
			}
		});
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
				break;
			case MessageType.RequestSpyDismiss:
				StateService.patchState({ spying: false });
				break;
			case MessageType.SetSnapshot:
				// Logger.log('AgoraService.checkBroadcastMessage.SetSnapshot', message);
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
			case MessageType.CurrentTimeMedia:
			case MessageType.MenuToggle:
			case MessageType.Mode:
			case MessageType.NavInfo:
			case MessageType.NavLink:
			case MessageType.NavLinkClose:
			case MessageType.NavToGrid:
			case MessageType.NavToView:
			case MessageType.PlayMedia:
			case MessageType.PlayModel:
			case MessageType.SelectItem:
			case MessageType.ShowPanel:
			case MessageType.SlideChange:
			case MessageType.VREnded:
			case MessageType.VRStarted:
			case MessageType.VRState:
			case MessageType.ZoomMedia:
				if (
					(StateService.state.controlling && StateService.state.controlling !== StateService.state.uid) ||
					(StateService.state.spying && StateService.state.spying !== StateService.state.uid)) {
					this.broadcastMessage(message);
				} else {
					// send dismiss request info
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

	remoteUserAdd(remoteId) {
		Logger.log('AgoraService.remoteUserAdd', remoteId);
		const peer = {
			uid: remoteId,
		};
		const peers = StreamService.peers;
		peers.push(peer);
		StreamService.peers = peers;
		this.broadcastEvent(new AgoraPeerEvent({ peer }));
	}

	remoteUserRemove(remoteId) {
		Logger.log('AgoraService.remoteUserRemove', remoteId);
		const peers = StreamService.peers;
		const peer = peers.find(x => x.uid === remoteId);
		if (peer) {
			peers.splice(peers.indexOf(peer), 1);
			StreamService.peers = peers;
		}
	}

	onMessage(data, uid) {
		// Logger.log('AgoraService.onMessage', data.text, uid, StateService.state.uid);
		// discard message delivered by current state uid;
		if (uid !== StateService.state.uid) {
			Logger.log('AgoraService.onMessage', data.text, uid);
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
				// Logger.log('AgoraService.onMessage', message.type, message);
			}
			*/
			this.checkBroadcastMessage(message);
		} else {
			Logger.log('AgoraService.onMessage', data.text);
		}
	}

	onException(event) {
		Logger.error('AgoraService.onException', event);
	}

	async onUserJoined(user) {
		Logger.log('AgoraService.onUserJoined', user);
		this.remoteUserAdd(user.uid);
	}

	async onUserLeft(user, reason) {
		Logger.log('AgoraService.onUserLeft', user, reason);
		const remoteId = user.uid;
		if (remoteId !== StateService.state.uid) {
			// Logger.log('AgoraService.onUserLeft', user.uid);
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
		this.remoteUserRemove(remoteId);
	}

	async onUserPublished(user, mediaType) {
		const uid = user.uid.toString();
		Logger.log('AgoraService.onUserPublished', uid, user, mediaType);
		if (uid !== StateService.state.uid && uid !== StateService.state.screenUid) {
			// Subscribe to the remote user when the SDK triggers the "user-published" event.
			await this.client.subscribe(user, mediaType);
			let tracks = [];
			if (mediaType === 'video') {
				tracks.push(user.audioTrack);
				tracks.push(user.videoTrack);
				// user.videoTrack.play(player);
			}
			if (mediaType === 'audio') {
				tracks.push(user.audioTrack);
				// user.audioTrack.play();
			}
			await this.remoteAdd({
				uid,
				tracks,
				mediaType,
			});
		} else {
			const clientInfo = {
				role: StateService.state.role,
				name: StateService.state.name,
				uid: StateService.state.uid,
				screenUid: StateService.state.screenUid,
			};
			const local = StreamService.local;
			local.clientInfo = clientInfo;
			StreamService.local = local;
		}
	}

	async onUserUnpublished(user) {
		const uid = user.uid.toString();
		Logger.log('AgoraService.onUserUnpublished', uid, user);
		if (uid !== StateService.state.uid && uid !== StateService.state.screenUid) {
			// !!! this happen on oculus removed timeout
			this.remoteRemove({
				uid,
			});
		} else {
			StreamService.local = null;
		}
	}

	async onStreamAdded___(user, mediaType) {
		Logger.log('AgoraService.onStreamAdded', user, mediaType);
		const client = this.client;
		const stream = event.stream;
		if (!stream) {
			Logger.error('AgoraService.onStreamAdded.error', 'stream is undefined');
			return;
		}
		Logger.log('AgoraService.onStreamAdded', event.stream.getId());
		const streamId = stream.getId();
		// Logger.log('AgoraService.onStreamAdded', streamId, StateService.state.uid, StateService.state.screenUid);
		if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
			client.subscribe(stream, (error) => {
				Logger.error('AgoraService.onStreamAdded.subscribe.error', error);
			});
		}
	}

	async onStreamRemoved___(user) {
		const stream = event.stream;
		const streamId = stream.getId();
		if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
			// !!! this happen on oculus removed timeout
			// Logger.log('AgoraService.onStreamRemoved', streamId);
			this.remoteRemove(streamId);
		}
	}

	async onStreamSubscribed___(event) {
		Logger.log('AgoraService.onStreamSubscribed', event.stream.getId());
		await this.remoteAdd(event.stream);
	}

	async remoteAdd(stream) {
		Logger.log('AgoraService.remoteAdd', stream);
		StreamService.remoteAdd(stream);
		this.broadcastEvent(new AgoraRemoteEvent({ stream }));
		const remoteId = stream.getId();
		setTimeout(async () => {
			const clientInfo = await this.getUserState(remoteId);
			Logger.log('AgoraService.remoteAdd.getUserState', clientInfo);
			StreamService.remoteSetClientInfo(remoteId, clientInfo);
			if (clientInfo.cameraMuted) {
				this.broadcastEvent(new AgoraMuteVideoEvent({ streamId: remoteId }));
			}
			if (clientInfo.audioMuted) {
				this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: remoteId }));
			}
			if (clientInfo.role === RoleType.Publisher) {
				const state = { hosted: true };
				StateService.patchState(state);
				this.getInitialSession();
			}
		}, 100);
	}

	remoteRemove(streamId) {
		// Logger.log('AgoraService.remoteRemove', streamId);
		const remote = StreamService.remoteRemove(streamId);
		if (remote && remote.clientInfo && remote.clientInfo.role === RoleType.Publisher && remote.clientInfo.screenUid !== streamId) {
			StateService.patchState({ hosted: false });
		}
		return remote;
	}

	onMuteVideo(event) {
		// Logger.log('AgoraService.onMuteVideo', event);
		this.broadcastEvent(new AgoraMuteVideoEvent({ streamId: event.uid }));
	}

	onUnmuteVideo(event) {
		// Logger.log('AgoraService.onUnmuteVideo', event);
		this.broadcastEvent(new AgoraUnmuteVideoEvent({ streamId: event.uid }));
	}

	onMuteAudio(event) {
		// Logger.log('AgoraService.onMuteAudio', event);
		this.broadcastEvent(new AgoraMuteAudioEvent({ streamId: event.uid }));
	}

	onUnmuteAudio(event) {
		// Logger.log('AgoraService.onUnmuteAudio', event);
		this.broadcastEvent(new AgoraUnmuteAudioEvent({ streamId: event.uid }));
	}

	onVolumeIndicator(event) {
		// Logger.log('AgoraService.onVolumeIndicator', event);
		const streams = event.attr.map(x => {
			return { streamId: x.uid, level: x.level };
		});
		this.broadcastEvent(new AgoraVolumeLevelsEvent({ streams: streams }));
	}

	onConnectionStateChange(event) {
		Logger.log('AgoraService.onConnectionStateChange', event);
	}

	onTokenPrivilegeWillExpire(event) {
		Logger.log('AgoraService.onTokenPrivilegeWillExpire');
		const client = this.client;
		const channelNameLink = this.getChannelNameLink();
		AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
			if (token.token) {
				await client.renewToken(token.token);
				Logger.log('AgoraService.onTokenPrivilegeWillExpire.renewed');
			}
		});
	}

	onTokenPrivilegeDidExpire(event) {
		Logger.log('AgoraService.onTokenPrivilegeDidExpire');
		const client = this.client;
		const channelNameLink = this.getChannelNameLink();
		AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
			if (token.token) {
				await client.renewToken(token.token);
				Logger.log('AgoraService.onTokenPrivilegeDidExpire.renewed');
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
				this.createScreenClient().then(() => {
					const channelNameLink = this.getChannelNameLink();
					AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
						Logger.log('AgoraService.toggleScreen.rtcToken$', token);
						await this.screenJoin(token.token, channelNameLink);
					});
				});
			}
		}
	}

	async createScreenClient() {
		if (this.screenClient) {
			return this.screenClient;
		}
		try {
			const screenClient = this.screenClient = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc, vp8
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
			if (environment.flags.useProxy) {
				screenClient.startProxyServer(3);
				/*
				3: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
				5: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TLS 443.
				Note: As of v4.15.0, the default value of mode is 3.
				*/
				Logger.log('AgoraService.createScreenClient.startProxyServer');
			}
		} catch (error) {
			Logger.error('AgoraService.createScreenClient.error', error);
			this.screenClient = null;
		}
		return this.screenClient;
	}

	async screenJoin(token, channelNameLink) {
		const screenClient = this.screenClient;
		const screenClientId = AgoraService.getUniqueUserId();
		try {
			const screenUid = await screenClient.join(environment.appKey, channelNameLink, token, screenClientId);
			Logger.log('AgoraService.screenJoin', screenUid);
			StateService.patchState({ screenUid });
			this.createScreenStream(screenUid);
		} catch (error) {
			Logger.error('AgoraService.screenJoin.error', error);
			if (error === 'DYNAMIC_KEY_EXPIRED') {
				AgoraService.rtcToken$(channelNameLink).subscribe(async (token) => {
					await this.screenJoin(token.token, channelNameLink);
				});
			}
		}
	}

	createScreenStream(screenUid) {
		const options = {
			streamID: screenUid,
			audio: false,
			video: false,
			screen: true,
			// extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg', // Google Chrome:
			// mediaSource:  'screen', // Firefox: 'screen', 'application', 'window' (select one)
		};
		const stream = AgoraRTC.createStream(options);
		stream.setScreenProfile(environment.profiles.screen);
		Logger.log('AgoraService.createScreenStream', options);
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
			Logger.error('AgoraService.createScreenStream.screen.init.error', error);
		});
	}

	async publishScreenStream() {
		try {
			const clientInfo = await this.setUserState();
			const screen = StreamService.screen;
			const screenClient = this.screenClient;
			await screenClient.publish(screen);
			screen.clientInfo = clientInfo;
			StreamService.screen = screen;
			Logger.log('AgoraService.publishScreenStream');
		} catch (error) {
			Logger.error('AgoraService.publishScreenStream.error', error);
			throw error;
		}
	}

	async unpublishScreenStream() {
		try {
			const screenClient = this.screenClient;
			const screen = StreamService.screen;
			// Logger.log('AgoraService.unpublishScreenStream', screen, screenClient);
			if (screenClient && screen) {
				await screenClient.unpublish(screen);
			}
			StreamService.screen = null;
			Logger.log('AgoraService.unpublishScreenStream');
		} catch (error) {
			Logger.error('AgoraService.unpublishScreenStream.error', error);
			throw error;
		}
	}

	leaveScreenClient() {
		return new Promise((resolve, reject) => {
			const screenClient = this.screenClient;
			if (screenClient) {
				screenClient.leave(() => {
					this.screenClient = null;
					// Logger.log(AgoraService.leaveScreenClient');
					if (environment.flags.useProxy) {
						screenClient.stopProxyServer();
						Logger.log('AgoraService.leaveScreenClient.stopProxyServer');
					}
					resolve();
				}, (error) => {
					Logger.error('AgoraService.leaveScreenClient.error', error);
					reject(error);
				});
			} else {
				resolve();
			}
		});
	}

	onScreenError(error) {
		Logger.error('AgoraService.onScreenError', error);
	}

	onScreenStreamPublished(event) {
		// Logger.log('AgoraService.onScreenStreamPublished');
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
		// Logger.log('AgoraService.onScreenStreamUnpublished');
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
				const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' }); // rtc, vp8
				if (environment.flags.useProxy) {
					client.startProxyServer(3);
				}
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
			} catch (error) {
				reject(error);
			}
		});
	}

	static checkRtcTryJoin(client) {
		return new Promise((resolve, reject) => {
			const channelName = 'checkRtcConnection';
			AgoraService.rtcToken$(channelName).subscribe(async (token) => {
				try {
					const uid = await client.join(environment.appKey, channelName, token.token, null);
					// await this.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
					resolve(uid);
				} catch (error) {
					if (error === 'DYNAMIC_KEY_EXPIRED') {
						return AgoraService.checkRtcTryJoin(client);
					} else {
						Logger.error('AgoraService.checkRtcConnection.error', error);
						reject(error);
					}
				}
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
					// Logger.log('AgoraService.rtmToken$', token);
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
						});
					}).catch((error) => {
						Logger.error('checkRtmConnection.error', error);
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

	static async getDevices() {
		let devices_ = AgoraService.devices_;
		if (devices_) {
			return devices_;
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
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const devices = await navigator.mediaDevices.enumerateDevices();
				stream.getTracks().forEach((track) => {
					track.stop();
				});
				devices.forEach((device) => {
					devices_.push(device);
				});
				return devices_;
			} else {
				throw ('Media device not available');
			}
		}
	}

	static fixLegacy() {
		const prefixes = ['moz', 'webkit'];
		prefixes.forEach(prefix => {
			Logger.log('AgoraService.fixLegacy', `${prefix}RTC`);
			Object.getOwnPropertyNames(window).filter(key => key.indexOf('RTC') === 0).map(key => {
				const legacyKey = `${prefix}${key}`;
				if (typeof window[key] !== 'undefined' && typeof window[legacyKey] === 'undefined') {
					window[legacyKey] = window[key];
				}
			});
		});
	}
}
