import { isPlatformBrowser } from 'rxcomp';
import { BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, of, ReplaySubject } from "rxjs";
import { delayWhen, filter, first, map, switchMap, tap } from "rxjs/operators";
import EditorService from '../../editor/editor.service';
import { Asset, assetTypeFromPath } from '../../view/view';

export class AssetUploadItem {

	constructor(file) {
		this.file = file;
		this.name = file.name;
		this.type = assetTypeFromPath(file.name);
		this.progress = 0;
		this.size = file.size;
		this.uploading = false;
		this.paused = false;
		this.success = false;
		this.complete = false;
		this.error = null;
		this.preview = null;
	}

}

export class AssetEvent {
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}

export class AssetUploadStartEvent extends AssetEvent { }

export class AssetUploadCompleteEvent extends AssetEvent { }

export class AssetUploadAssetEvent extends AssetEvent { }

export default class AssetService {

	constructor() {
		this.concurrent$ = new BehaviorSubject(0);
		this.items$ = new BehaviorSubject([]);
		this.events$ = new ReplaySubject(1);
	}

	upload$() {
		const items = this.items$.getValue();
		const uploadItems = items.filter(item => !item.uploading);
		return combineLatest(uploadItems.map(item => this.uploadItem$(item)));
	}

	uploadItem$(item) {
		item.uploading = true;
		this.events$.next(new AssetUploadStartEvent({ item }));
		const files = [item.file];
		return of(files).pipe(
			delayWhen(() => this.concurrent$.pipe(
				filter(x => x < 4)
			)),
			tap(() => this.concurrent$.next(this.concurrent$.getValue() + 1)),
			first(),
			switchMap(files => EditorService.upload$(files)),
			switchMap((uploads) => {
				const upload = uploads[0];
				item.uploading = false;
				item.complete = true;
				const asset = Asset.fromUrl(upload.url);
				this.events$.next(new AssetUploadCompleteEvent({ item, asset }));
				return EditorService.assetCreate$(asset).pipe(
					tap(asset => {
						this.remove(item);
						this.events$.next(new AssetUploadAssetEvent({ item, asset }));
						this.concurrent$.next(this.concurrent$.getValue() - 1);
					}),
				);
			}),
		);
		/*
		return EditorService.upload$([item.file]).pipe(
			// tap(upload => console.log('upload', upload)),
			switchMap((uploads) => {
				const upload = uploads[0];
				item.uploading = false;
				item.complete = true;
				const asset = Asset.fromUrl(upload.url);
				this.events$.next(new AssetUploadCompleteEvent({ item, asset }));
				return EditorService.assetCreate$(asset).pipe(
					tap(asset => {
						this.remove(item);
						this.events$.next(new AssetUploadAssetEvent({ item, asset }));
					}),
				);
			}),
		);
		*/
	}

	addItems(files) {
		if (files && files.length) {
			// console.log('addItems', files);
			const items = this.items$.getValue();
			const newItems = Array.from(files).map(file => new AssetUploadItem(file));
			items.push(...newItems);
			this.items$.next(items);
		}
	}

	remove(item) {
		const items = this.items$.getValue();
		const index = items.indexOf(item);
		if (index !== -1) {
			items.splice(index, 1);
		}
		this.items$.next(items);
	}

	removeAll() {
		// !!!
		this.items$.next([]);
	}

	drop$(input, dropArea) {
		if (isPlatformBrowser && input) {
			dropArea = dropArea || input;
			const body = document.querySelector('body');
			return merge(fromEvent(body, 'drop'), fromEvent(body, 'dragover')).pipe(
				map((event) => {
					// console.log('AssetService.drop$', event);
					event.preventDefault();
					if (event.target === dropArea) {
						this.addItems(event.dataTransfer.files);
					}
					return this.items$;
				}),
			);
		} else {
			return EMPTY;
		}
	}

	change$(input) {
		if (isPlatformBrowser && input) {
			return fromEvent(input, 'change').pipe(
				switchMap((event) => {
					if (input.files.length) {
						this.addItems(input.files);
						input.value = '';
					}
					return this.items$;
				}),
			);
		} else {
			return EMPTY;
		}
	}

	files$(files) {
		return combineLatest(Array.from(files).map((file, i) => this.file$(file, i)));
	}

	file$(file, i) {
		return this.read$(file, i).pipe(
			switchMap(() => this.uploadFile$(file)),
		);
	}

	/*
	static files$(files) {
		const fileArray = Array.from(files);
		this.previews = fileArray.map(() => null);
		const uploads$ = fileArray.map((file, i) => this.read$(file, i).pipe(
			switchMap(() => this.uploadFile$(file)),
		));
		return combineLatest(uploads$);
	}
	*/

	read$(file, i) {
		const reader = new FileReader();
		const reader$ = fromEvent(reader, 'load').pipe(
			tap(event => {
				const blob = event.target.result;
				this.resize(blob, (resized) => {
					this.previews[i] = resized;
					// console.log('resized', resized);
					this.pushChanges();
				});
			}),
		);
		reader.readAsDataURL(file);
		return reader$;
	}

	uploadFile$(file) {
		return EditorService.upload$([file]).pipe(
			// tap(upload => console.log('upload', upload)),
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
		);
	}

	resize(blob, callback) {
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

	supported() {
		return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
		function supportFileAPI() {
			var input = document.createElement('input');
			input.type = 'file';
			return 'files' in input;
		}
		function supportAjaxUploadProgressEvents() {
			var xhr = new XMLHttpRequest();
			return !!(xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
		}
		function supportFormData() {
			return !!window.FormData;
		}
	}

}
