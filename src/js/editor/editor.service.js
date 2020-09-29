import { fromEvent, merge } from "rxjs";
import { filter, map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapAsset, mapView, mapViewItem } from '../view/view';

export default class EditorService {
	static data$() {
		return HttpService.get$(`/api/view`).pipe(
			map(data => {
				data.views = data.views.map(view => mapView(view));
				return data;
			}),
		);
	}

	static viewCreate$(view) {
		return HttpService.post$(`/api/view`, view).pipe(
			map(view => mapView(view)),
		);
	}
	static viewUpdate$(view) {
		return HttpService.put$(`/api/view/${view.id}`, view.payload).pipe(
			map(view => mapView(view)),
		);
	}
	static viewDelete$(view) {
		return HttpService.delete$(`/api/view/${view.id}`);
	}

	static itemCreate$(view, item) {
		return HttpService.post$(`/api/view/${view.id}/item`, item).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static itemUpdate$(view, item) {
		return HttpService.put$(`/api/view/${view.id}/item/${item.id}`, item.payload).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static itemDelete$(view, item) {
		return HttpService.delete$(`/api/view/${view.id}/item/${item.id}`);
	}

	static assetCreate$(asset) {
		return HttpService.post$(`/api/asset`, asset).pipe(
			map(asset => mapAsset(asset)),
		);
	}
	static assetDelete$(asset) {
		return HttpService.delete$(`/api/asset/${asset.id}`);
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
		xhr.open('POST', `/api/upload2/`, true);
		xhr.send(formData);
		return events$;
	}

}
