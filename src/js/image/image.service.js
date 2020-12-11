import { fromEvent, of } from 'rxjs';
import { auditTime, filter, finalize, map, takeWhile } from 'rxjs/operators';
import { environment } from '../environment';

let UID = 0;

export const ImageServiceEvent = {
	Progress: 'progress',
	Complete: 'complete',
};
export default class ImageService {

	static worker() {
		if (!this.worker_) {
			this.worker_ = new Worker(environment.worker);
		}
		return this.worker_;
	}

	static load$(src, size) {
		if (!('Worker' in window) || this.isBlob(src) || this.isCors(src)) {
			return of(src);
		}
		const id = ++UID;
		const worker = this.worker();
		worker.postMessage({ src, id, size });
		let lastEvent;
		return fromEvent(worker, 'message').pipe(
			map(event => event.data),
			filter(event => event.src === src),
			auditTime(100),
			map(event => {
				// console.log('ImageService', event);
				if (event.type === ImageServiceEvent.Complete) {
					const url = URL.createObjectURL(event.data);
					event.data = url;
				}
				lastEvent = event;
				return event;
			}),
			takeWhile(event => event.type !== ImageServiceEvent.Complete, true),
			finalize(() => {
				// console.log('ImageService.finalize', lastEvent);
				worker.postMessage({ id });
				/*
				if (lastEvent && lastEvent.type === ImageServiceEvent.Complete && lastEvent.data) {
					URL.revokeObjectURL(lastEvent.data);
				}
				*/
			})
		);
	}

	static isCors(src) {
		return src.indexOf('://') !== -1 && src.indexOf(window.location.host) === -1;
	}

	static isBlob(src) {
		return src.indexOf('blob:') === 0;
	}

}
