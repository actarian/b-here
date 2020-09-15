import { Directive, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default class UploadSrcDirective extends Directive {

	set uploadSrc(uploadSrc) {
		if (uploadSrc !== this.uploadSrc_) {
			this.uploadSrc_ = uploadSrc;
			if (uploadSrc) {
				this.read(uploadSrc.flowFile.file);
			}
		}
	}

	resize2Steps(blob, callback) {
		const canvas = document.createElement('canvas');
		canvas.width = 640;
		canvas.height = 480;
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.onload = function() {
			// set size proportional to image
			canvas.height = canvas.width * (img.height / img.width);
			// step 1 - resize to 50%
			const oc = document.createElement('canvas');
			const octx = oc.getContext('2d');
			oc.width = img.width * 0.5;
			oc.height = img.height * 0.5;
			octx.drawImage(img, 0, 0, oc.width, oc.height);
			// step 2
			octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
			// step 3, resize to final size
			ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);
			//
			callback(canvas.toDataURL('image/jpeg', 0.9));
		}
		img.src = blob;
	}

	resize(blob, callback) {
		if (typeof callback === 'function') {
			const img = document.createElement('img');
			img.onload = function() {
				const MAX_WIDTH = 640;
				const MAX_HEIGHT = 480;
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				let width = img.width;
				let height = img.height;
				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);
				const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
				callback(dataUrl);
			};
			img.src = blob;
		}
	}

	read(file) {
		if (this.subscription_) {
			this.subscription_.unsubscribe();
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		this.subscription_ = fromEvent(reader, 'load').pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			const { node } = getContext(this);
			const blob = event.target.result;
			// node.setAttribute('src', blob);
			this.resize(blob, (resized) => {
				node.setAttribute('src', resized);
			});
		});
	}

}

UploadSrcDirective.meta = {
	selector: '[[uploadSrc]]',
	inputs: ['uploadSrc'],
};
