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

	static editor$ = new BehaviorSubject(null);
	static set editor(editor) {
		this.editor$.next(editor);
	}
	static get editor() {
		return this.editor$.getValue();
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
					if (remote.clientInfo) {
						remote.clientInfo.audioLevel = remote.getAudioLevel();
						remote.clientInfo.peekAudioLevel = Math.max(remote.clientInfo.audioLevel, 0.2);
						/*
						if (remote.clientInfo.screenUid !== remote.getId()) {
							orderedRemotes.push(remote);
						}
						*/
					}
					orderedRemotes.push(remote);
				});
				orderedRemotes.sort((a, b) => {
					if (a.clientInfo && b.clientInfo) {
						if (a.clientInfo.role === RoleType.Publisher) {
							return -1;
						} else if (b.clientInfo.role === RoleType.Publisher) {
							return 1;
						} else {
							// sort on audioLevel or lastOrder
							return b.clientInfo.peekAudioLevel - a.clientInfo.peekAudioLevel ||
							(a.clientInfo.order || 0) - (b.clientInfo.order || 0);
						}
					} else {
						return 0;
					}
				});
				orderedRemotes.forEach((remote, i) => {
					if (remote.clientInfo) {
						remote.clientInfo.order = i;
					}
				});
				// !!! hard limit max visible stream
				orderedRemotes.length = Math.min(orderedRemotes.length, MAX_VISIBLE_STREAMS);
				return orderedRemotes;
			}),
			distinctUntilChanged((a, b) => {
				return a.map(remote => remote.clientInfo ? remote.clientInfo.uid : '').join('|') ===
				b.map(remote => remote.clientInfo ? remote.clientInfo.uid : '').join('|');
			}),
		);
	}

	static streams$ = combineLatest([StreamService.local$, StreamService.screen$, StreamService.remotes$, StreamService.editorStreams$()]).pipe(
		map(data => {
			const local = data[0];
			const screen = data[1];
			const remotes = data[2];
			const editor = data[3];
			let streams = remotes;
			if (local) {
				streams = streams.slice();
				streams.push(local);
			}
			if (screen) {
				streams = streams.slice();
				streams.push(screen);
			}
			if (editor) {
				streams.push(...editor);
			}
			// console.log('StreamService.streams$', streams, local, screen, remotes);
			return streams;
		}),
		shareReplay(1),
	);

	static editorStreams$() {
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
								}
							};
							const fakeAttendeeStream = {
								getId: () => 'editor',
								clientInfo: {
									role: RoleType.Attendee,
								}
							};
							this.editor$.next([fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream]);
							// StreamService.editor = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];
						}
						video.play();
					}).catch((error) => {
						console.log('EditorComponent.getUserMedia.error', error.name, error.message);
					});
				}
				return this.editor$;
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
		const publisherStream = streams.find(x => x.clientInfo && x.clientInfo.role === RoleType.Publisher);
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
