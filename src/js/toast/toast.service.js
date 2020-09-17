import { Subject } from 'rxjs';

export class ToastEvent {
	constructor(toast) {
		this.toast = toast;
	}
}

export class ToastResolveEvent extends ToastEvent { }

export default class ToastService {
	static open$(toast) {
		toast.id = new Date().getTime();
		this.toast$.next(toast);
		setTimeout(() => {
			this.resolve(toast);
		}, toast.duration || 3000);
		return this.events$;
		/*
		return of(toast).pipe(
			tap(toast => this.toast$.next(toast)),
			switchMap(toast => this.events$),
		);
		*/
	}

	static resolve(toast) {
		this.toast$.next(null);
		this.events$.next(new ToastResolveEvent(toast));
	}
}

ToastService.toast$ = new Subject();
ToastService.events$ = new Subject();
