import { getContext, isPlatformBrowser } from 'rxcomp';
import { combineLatest, EMPTY, fromEvent, merge } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import EditorService from '../editor/editor.service';
import { Asset } from '../view/view';
import ControlComponent from './control.component';

export default class ControlAssetComponent extends ControlComponent {

	get image() {
		let image = null;
		if (this.control.value) {
			image = `${this.control.value.folder}${this.control.value.file}`;
		} else if (this.previews && this.previews.length) {
			image = this.previews[0];
		}
		return image;
	}

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
		this.accept = this.accept || 'image/png, image/jpeg';
		this.previews = [];
		const { node } = getContext(this);
		const input = node.querySelector('input');
		input.setAttribute('accept', this.accept);
		this.drop$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		this.change$(input).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(assets => {
			console.log('ControlAssetComponent.change$', assets);
			this.control.value = assets[0];
		});
	}

	change$(input) {
		if (isPlatformBrowser && input) {
			return fromEvent(input, 'change').pipe(
				filter((event) => input.files && input.files.length),
				switchMap((event) => {
					console.log('ControlAssetComponent.change$', input.files);
					const fileArray = Array.from(input.files);
					this.previews = fileArray.map(() => null);
					const uploads$ = fileArray.map((file, i) => this.read$(file, i).pipe(
						switchMap(() => EditorService.upload$([file])),
						tap(uploads => console.log('upload', uploads)),
						switchMap((uploads) => {
							const upload = uploads[0];
							/*
							id: 1601303293569
							type: "image/jpeg"
							file: "1601303293569_ambiente1_x0_y2.jpg"
							originalFileName: "ambiente1_x0_y2.jpg"
							url: "/uploads/1601303293569_ambiente1_x0_y2.jpg"
							*/
							const asset = Asset.fromUrl(upload.url);
							return EditorService.assetCreate$(asset);
						}),
					));
					return combineLatest(uploads$);
				})
			);
		} else {
			return EMPTY;
		}
	}

	read$(file, i) {
		const reader = new FileReader();
		const reader$ = fromEvent(reader, 'load').pipe(
			tap(event => {
				const blob = event.target.result;
				this.resize_(blob, (resized) => {
					this.previews[i] = resized;
					this.pushChanges();
				});
			}),
		);
		reader.readAsDataURL(file);
		return reader$;
	}

	drop$(input) {
		if (isPlatformBrowser && input) {
			const body = document.querySelector('body');
			return merge(fromEvent(body, 'drop'), fromEvent(body, 'dragover')).pipe(
				map((event) => {
					console.log('ControlAssetComponent.drop$', event);
					event.preventDefault();
					if (event.target === input) {
						input.files = event.dataTransfer.files;
					}
					return;
				})
			);
		} else {
			return EMPTY;
		}
	}

	resize_(blob, callback) {
		if (typeof callback === 'function') {
			const img = document.createElement('img');
			img.onload = function() {
				const MAX_WIDTH = 320;
				const MAX_HEIGHT = 240;
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

}

ControlAssetComponent.meta = {
	selector: '[control-asset]',
	inputs: ['control', 'label', 'disabled', 'accept'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge" [innerHTML]="'required' | label"></span>
			</div>
			<div class="group--picture">
				<div class="group--picture__info">
					<!-- <svg class="icon--image"><use xlink:href="#image"></use></svg> -->
					<span [innerHTML]="'browse' | label"></span>
				</div>
				<img [lazy]="control.value | asset" [size]="{ width: 320, height: 240 }" *if="control.value && control.value.type.name === 'image'" />
				<video [src]="control.value | asset" *if="control.value && control.value.type.name === 'video'"></video>
				<input type="file">
			</div>
			<div class="file-name" *if="control.value" [innerHTML]="control.value.file"></div>
			<!--
			<input type="text" class="control--text" [formControl]="control" [placeholder]="label" [disabled]="disabled" />
			-->
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
