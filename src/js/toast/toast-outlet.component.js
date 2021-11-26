import { Component } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import ToastService from './toast.service';

export default class ToastOutletComponent extends Component {

	onInit() {
		this.toast = null;
		this.lastToast = null;
		ToastService.toast$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(toast => {
			if (toast) {
				this.lastToast = toast;
			}
			this.toast = toast;
			this.pushChanges();
		});
		// console.log('ToastOutletComponent.onInit');
	}

	getClass() {
		const classList = {};
		if (this.toast) {
			classList.active = true;
		}
		if (this.lastToast) {
			classList[this.lastToast.type] = true;
			classList[this.lastToast.position] = true;
		}
		return classList;
	}

	onClose() {
		ToastService.reject(this.toast);
	}

	onAccept() {
		ToastService.resolve(this.toast);
	}

	onReject() {
		ToastService.reject(this.toast);
	}

}

ToastOutletComponent.meta = {
	selector: '[toast-outlet]',
	template: /* html */ `
	<div class="toast-outlet__container" [class]="getClass()">
		<div class="toast-outlet__toast" *if="lastToast">
			<span class="toast-outlet__message" [innerHTML]="lastToast.message"></span>
			<div class="group--cta" *if="lastToast.type != 'info'">
				<button type="button" class="btn--accept" (click)="onAccept()">
					<span [innerHTML]="lastToast.acceptMessage"></span>
				</button>
				<button type="button" class="btn--cancel" (click)="onReject()" *if="lastToast.type == 'dialog'">
					<span [innerHTML]="lastToast.rejectMessage"></span>
				</button>
			</div>
			<button type="button" class="btn--close" (click)="onClose()" *if="lastToast.type != 'info'">
				<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
	</div>
	`
};
