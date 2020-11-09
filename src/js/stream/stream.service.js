import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { RoleType } from '../user/user';

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

	static streams$ = combineLatest([StreamService.local$, StreamService.remotes$, StreamService.editorStreams$()]).pipe(
		map(data => {
			const local = data[0];
			const remotes = data[1];
			const editor = data[2];
			let streams = remotes;
			if (local) {
				streams = streams.slice();
				streams.push(local);
			}
			if (editor) {
				streams.push(...editor);
			}
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
}
