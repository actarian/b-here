import { BehaviorSubject, combineLatest, interval, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { RoleType } from '../user/user';

const MAX_VISIBLE_STREAMS = 8;

export const StreamServiceMode = {
	Client: 'client',
	Editor: 'editor',
};

export default class StreamService {

	static mode = StreamServiceMode.Client;

	static editorStreams$ = new BehaviorSubject(null);
	static set editorStreams(editorStreams) {
		this.editorStreams$.next(editorStreams);
	}
	static get editorStreams() {
		return this.editorStreams$.getValue();
	}

	static editorScreens$ = new BehaviorSubject(null);
	static set editorScreens(editorScreens) {
		this.editorScreens$.next(editorScreens);
	}
	static get editorScreens() {
		return this.editorScreens$.getValue();
	}

	static local$ = new BehaviorSubject(null);
	static set local(local) {
		this.local$.next(local);
	}
	static get local() {
		return this.local$.getValue();
	}

	static screen$ = new BehaviorSubject(null);
	static set screen(screen) {
		this.screen$.next(screen);
	}
	static get screen() {
		return this.screen$.getValue();
	}

	static remotes$ = new BehaviorSubject([]);
	static set remotes(remotes) {
		this.remotes$.next(remotes);
	}
	static get remotes() {
		return this.remotes$.getValue();
	}

	static peers$ = new BehaviorSubject([]);
	static set peers(peers) {
		this.peers$.next(peers);
	}
	static get peers() {
		return this.peers$.getValue();
	}

	static orderedRemotes$() {
		return combineLatest([StreamService.remotes$, interval(1000)]).pipe(
			map(datas => {
				const orderedRemotes = [];
				const remotes = datas[0];
				remotes.forEach(remote => {
					// const audioLevel = remote.getAudioLevel();
					// console.log('audioLevel', audioLevel, remote);
					let role = null, uid = null, screenUid = null, audioLevel = 0, peekAudioLevel = 0, order = 0;
					if (remote.clientInfo) {
						audioLevel = remote.clientInfo.audioLevel = remote.getAudioLevel();
						peekAudioLevel = remote.clientInfo.peekAudioLevel = Math.max(remote.clientInfo.audioLevel, 0.2);
						order = remote.clientInfo.order;
						role = remote.clientInfo.role || null;
						uid = remote.clientInfo.uid || null;
						screenUid = remote.clientInfo.screenUid || null;
						/*
						if (remote.clientInfo.screenUid !== remote.getId()) {
							orderedRemotes.push(remote);
						}
						*/
					}
					orderedRemotes.push({ role, uid, screenUid, audioLevel, peekAudioLevel, order, remote });
				});
				orderedRemotes.sort((a, b) => {
					const av = a.role === RoleType.Publisher ? 2 : (a.role === RoleType.Attendee ? 1 : 0);
					const bv = b.role === RoleType.Publisher ? 2 : (b.role === RoleType.Attendee ? 1 : 0);
					return (bv - av) ||
						(b.peekAudioLevel - a.peekAudioLevel) ||
						((a.order || 0) - (b.order || 0));
				});
				orderedRemotes.forEach((x, i) => {
					if (x.remote.clientInfo) {
						x.remote.clientInfo.order = i;
					}
				});
				// !!! hard limit max visible stream
				// orderedRemotes.length = Math.min(orderedRemotes.length, MAX_VISIBLE_STREAMS);
				// console.log('StreamService.orderedRemotes$', orderedRemotes);
				return orderedRemotes;
			}),
			distinctUntilChanged((a, b) => {
				const auid = a.map(x => `${x.uid}-${x.screenUid}`).join('|');
				const buid = b.map(x => `${x.uid}-${x.screenUid}`).join('|');
				// console.log('StreamService.orderedRemotes$', auid, buid);
				return auid === buid;
			}),
			map(remotes => remotes.map(x => x.remote)),
		);
	}

	static streams$ = combineLatest([StreamService.local$, StreamService.screen$, StreamService.remotes$, StreamService.getEditorStreams$(), StreamService.getEditorScreens$()]).pipe(
		map(data => {
			const local = data[0];
			const screen = data[1];
			const remotes = data[2];
			const editorStreams = data[3];
			const editorScreens = data[4];
			let streams = remotes;
			if (local) { // my stream
				streams = streams.slice();
				streams.push(local);
			}
			if (screen) { // my screen
				streams = streams.slice();
				streams.push(screen);
			}
			if (editorStreams) { // editor streams
				streams.push(...editorStreams);
			}
			if (editorScreens) { // editor screens
				streams.push(...editorScreens);
			}
			return streams;
		}),
		shareReplay(1),
	);

	static getEditorStreams$() {
		return of(null).pipe(
			switchMap(() => {
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && this.mode === StreamServiceMode.Editor) {
					const body = document.querySelector('body');
					const media = document.createElement('div');
					const video = document.createElement('video');
					media.setAttribute('id', 'stream-editor');
					media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
					media.appendChild(video);
					body.appendChild(media);
					navigator.mediaDevices.getUserMedia({
						video: { width: 800, height: 450 },
					}).then((stream) => {
						// console.log(stream);
						if ('srcObject' in video) {
							video.srcObject = stream;
						} else {
							video.src = window.URL.createObjectURL(stream);
						}
						video.oncanplay = () => {
							const fakePublisherStream = {
								getId: () => 'editor',
								clientInfo: {
									role: RoleType.Publisher,
									uid: 'editor',
								}
							};
							const fakeAttendeeStream = {
								getId: () => 'editor',
								clientInfo: {
									role: RoleType.Attendee,
									uid: 'editor',
								}
							};
							const fakeSmartDeviceStream = {
								getId: () => 'editor',
								clientInfo: {
									role: RoleType.SmartDevice,
									uid: 'editor',
								}
							};
							this.editorStreams$.next([fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeSmartDeviceStream]);
							// StreamService.editorStreams = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];
						}
						video.play();
					}).catch((error) => {
						console.log('EditorComponent.getUserMedia.error', error.name, error.message);
					});
				}
				return this.editorStreams$;
			}),
			shareReplay(1),
		);
	}

	static getEditorScreens$() {
		return of(null).pipe(
			switchMap(() => {
				if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && this.mode === StreamServiceMode.Editor) {
					const body = document.querySelector('body');
					const media = document.createElement('div');
					const video = document.createElement('video');
					media.setAttribute('id', 'stream-editor-screen');
					media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
					media.appendChild(video);
					body.appendChild(media);
					navigator.mediaDevices.getDisplayMedia({
						screen: { width: 800, height: 450 },
					}).then((stream) => {
						// console.log(stream);
						if ('srcObject' in video) {
							video.srcObject = stream;
						} else {
							video.src = window.URL.createObjectURL(stream);
						}
						video.oncanplay = () => {
							const fakePublisherScreen = {
								getId: () => 'editor-screen',
								clientInfo: {
									role: RoleType.Publisher,
									uid: 'editor',
									screenUid: 'editor-screen',
								}
							};
							const fakeAttendeeScreen = {
								getId: () => 'editor-screen',
								clientInfo: {
									role: RoleType.Attendee,
									uid: 'editor',
									screenUid: 'editor-screen',
								}
							};
							this.editorScreens$.next([fakePublisherScreen, fakeAttendeeScreen]);
						}
						video.play();
					}).catch((error) => {
						console.log('EditorComponent.getUserMedia.error', error.name, error.message);
					});
				}
				return this.editorScreens$;
			}),
			shareReplay(1),
		);
	}

	static get publisherStreamId() {
		const streams = this.remotes.slice();
		const local = this.local;
		if (local) {
			streams.unshift(local);
		}
		const publisherStream = streams.find(x => x.clientInfo && x.clientInfo.role === RoleType.Publisher && x.clientInfo.uid === x.getId());
		if (publisherStream) {
			return publisherStream.getId();
		}
		return null;
	}

	static getPublisherStreamId$() {
		const publisherStreamId = this.publisherStreamId;
		if (publisherStreamId) {
			return of(publisherStreamId);
		} else {
			return this.streams$.pipe(
				map(() => this.publisherStreamId),
				filter(x => x),
			);
		}
	}

	static get attendeeStreamId() {
		const streams = this.remotes.slice();
		const local = this.local;
		if (local) {
			streams.unshift(local);
		}
		const attendeeStream = streams.find(x => x.clientInfo && x.clientInfo.role === RoleType.Attendee && x.clientInfo.uid === x.getId());
		if (attendeeStream) {
			return attendeeStream.getId();
		}
		return null;
	}

	static getAttendeeStreamId$() {
		const attendeeStreamId = this.attendeeStreamId;
		if (attendeeStreamId) {
			return of(attendeeStreamId);
		} else {
			return this.streams$.pipe(
				map(() => this.attendeeStreamId),
				filter(x => x),
			);
		}
	}

	static getRemoteById(streamId) {
		// console.log('StreamService.getRemoteById', streamId);
		const remotes = StreamService.remotes;
		const remote = remotes.find(x => x.getId() === streamId);
		if (remote) {
			return remote;
		}
	}

	static remoteAdd(stream) {
		const remotes = this.remotes.slice();
		remotes.push(stream);
		this.remotes = remotes;
	}

	static remoteRemove(streamId) {
		const remotes = this.remotes.slice();
		const remote = remotes.find(x => x.getId() === streamId);
		// console.log('StreamService.remoteRemove', streamId, remote);
		if (remote) {
			if (remote.isPlaying()) {
				remote.stop();
			}
			remotes.splice(remotes.indexOf(remote), 1);
			this.remotes = remotes;
		}
		return remote;
	}

	static remoteSetClientInfo(remoteId, clientInfo) {
		const remotes = this.remotes;
		const remote = remotes.find(x => x.getId() === remoteId);
		if (remote) {
			remote.clientInfo = clientInfo;
		}
		this.remotes = remotes;
	}
}
