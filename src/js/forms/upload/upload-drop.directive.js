import { Directive, getContext, isPlatformBrowser } from 'rxcomp';
import { fromEvent, merge } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export default class UploadDropDirective extends Directive {

	set uploadDrop(uploader) {
		if (this.uploader !== uploader) {
			if (this.uploader) {
				this.disable();
			}
			this.uploader = uploader;
			if (uploader) {
				// console.log('UploadDropDirective.flow', this.uploader);
				this.enable();
			}
		}
	}

	enable() {
		const { node } = getContext(this);
		// console.log('UploadDropDirective.enable', this.uploader);
		this.uploader.flow.assignDrop(node);
	}

	disable() {
		const { node } = getContext(this);
		this.uploader.flow.unAssignDrop(node);
	}

	onInit() {
		if (isPlatformBrowser) {
			const body = document.querySelector('body');
			merge(fromEvent(body, 'drop'), fromEvent(body, 'dragover')).pipe(
				map((event) => {
					event.preventDefault();
					return;
				}),
				takeUntil(this.unsubscribe$)
			).subscribe();
			// console.log('UploadDropDirective.onInit');
		}
	}
}

UploadDropDirective.meta = {
	selector: '[[uploadDrop]]',
	inputs: ['uploadDrop']
};
