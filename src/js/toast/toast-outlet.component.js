import { Component } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import ToastService from './toast.service';

export default class ToastOutletComponent extends Component {
	onInit() {
		this.toast = null;
		this.lastMessage = '';
		ToastService.toast$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(toast => {
			if (toast) {
				this.lastMessage = toast.message;
			}
			this.toast = toast;
			this.pushChanges();
		});
		// console.log('ToastOutletComponent.onInit');
	}
}

ToastOutletComponent.meta = {
	selector: '[toast-outlet]',
	template: /* html */ `
	<div class="toast-outlet__container" [class]="{ active: toast }">
		<div class="toast-outlet__toast" [innerHTML]="lastMessage"></div>
	</div>
	`
};
