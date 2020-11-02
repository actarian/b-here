import { fromEvent, merge, of } from "rxjs";
import { filter, map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapAsset } from './asset';

export class AssetService {

	static assetCreate$(asset) {
		return HttpService.post$(`/api/asset`, asset).pipe(
			map(asset => mapAsset(asset)),
		);
	}

	static assetUpdate$(asset) {
		return HttpService.put$(`/api/asset/${asset.id}`, asset).pipe(
			map(asset => mapAsset(asset)),
		);
	}

	static assetDelete$(asset) {
		if (asset && asset.id) {
			return HttpService.delete$(`/api/asset/${asset.id}`).pipe(
				map(() => null),
			);
		} else {
			return of(null);
		}
	}

	static upload$(files) {
		const formData = new FormData();
		files.forEach(file => formData.append('file', file, file.name));
		const xhr = new XMLHttpRequest();
		const events$ = merge(
			fromEvent(xhr.upload, 'loadstart'),
			fromEvent(xhr.upload, 'progress'),
			fromEvent(xhr.upload, 'load'),
			fromEvent(xhr, 'readystatechange'),
		).pipe(
			map(event => {
				switch (event.type) {
					case 'readystatechange':
						if (xhr.readyState === 4) {
							return JSON.parse(xhr.responseText);
						} else {
							return null;
						}
						break;
					default:
						return null;
				}
			}),
			filter(event => event !== null)
		);
		xhr.open('POST', `/api/upload/`, true);
		xhr.send(formData);
		return events$;
	}

}
