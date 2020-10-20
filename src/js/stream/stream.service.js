import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RoleType } from '../user/user';

export default class StreamService {

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

	static streams$ = combineLatest(StreamService.local$, StreamService.remotes$).pipe(
		map(data => {
			const local = data[0];
			const remotes = data[1];
			let streams = remotes;
			if (local) {
				streams = streams.slice();
				streams.push(local);
			}
			return streams;
		}),
		shareReplay(1),
	);

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
