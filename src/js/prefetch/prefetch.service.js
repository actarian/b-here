import { fromEvent, of } from 'rxjs';
import { filter, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { environment } from '../environment';

let UID = 0;

export const PrefetchServiceEvent = {
	Progress: 'progress',
	Complete: 'complete',
};
export default class PrefetchService {

	static worker() {
		if (!this.worker_) {
			this.worker_ = new Worker(environment.workers.prefetch);
		}
		return this.worker_;
	}

	static events$(assets) {
		if (!('Worker' in window)) {
			return of({ type: PrefetchServiceEvent.Complete, data: assets });
		}
		const worker = this.worker();
		worker.postMessage({ id: UID });
		const id = ++UID;
		worker.postMessage({ id, assets });
		let lastEvent;
		return fromEvent(worker, 'message').pipe(
			map(event => event.data),
			filter(event => event.assets === assets),
			tap(event => {
				// console.log('PrefetchService', event);
				/*
				if (event.type === PrefetchServiceEvent.Complete) {
				}
				*/
				lastEvent = event;
			}),
			takeWhile(event => event.type !== PrefetchServiceEvent.Complete, true),
			finalize(() => {
				// console.log('PrefetchService.finalize', lastEvent);
				worker.postMessage({ id });
			})
		);
	}

	static load$(assets) {
		return this.events$(assets).pipe(
			filter(event => event.type === PrefetchServiceEvent.Complete),
			map(event => event.data),
		);
	}

	static prefetch(assets) {
		this.load$(assets).subscribe(event => {
			// console.log('PrefetchService.prefetch', event);
		});
	}

	static cancel() {
		if (!('Worker' in window)) {
			return null;
		}
		const worker = this.worker();
		worker.postMessage({ id: UID });
		return worker;
	}
}
