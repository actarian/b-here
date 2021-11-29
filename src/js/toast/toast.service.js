import { Subject } from 'rxjs';

export const ToastType = {
	Info: 'info',
	Alert: 'alert',
	Dialog: 'dialog',
}

export const ToastPosition = {
	Centered: 'centered',
	TopLeft: 'top-left',
	Top: 'top',
	TopRight: 'top-right',
	Right: 'right',
	BottomRight: 'bottom-right',
	Bottom: 'bottom',
	BottomLeft: 'bottom-left',
	Left: 'left',
}

export class ToastEvent {
	constructor(toast) {
		this.toast = toast;
	}
}

export class ToastResolveEvent extends ToastEvent { }
export class ToastRejectEvent extends ToastEvent { }

export default class ToastService {
	static open$(toast) {
		toast.id = new Date().getTime();
		toast.type = toast.type || ToastType.Info;
		toast.position = toast.position || ToastPosition.Centered;
		switch (toast.type) {
			case ToastType.Alert:
				toast.acceptMessage = toast.acceptMessage || `Ok`;
				break;
			case ToastType.Dialog:
				toast.acceptMessage = toast.acceptMessage || `Accept`;
				toast.rejectMessage = toast.rejectMessage || `Reject`;
				break;
		}
		this.toast$.next(toast);
		if (toast.type === ToastType.Info) {
			setTimeout(() => {
				this.resolve(toast);
			}, toast.duration || 4000);
		}
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

	static reject(toast) {
		this.toast$.next(null);
		this.events$.next(new ToastRejectEvent(toast));
	}
}

ToastService.toast$ = new Subject();
ToastService.events$ = new Subject();
