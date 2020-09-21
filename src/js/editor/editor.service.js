import { map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapView, mapViewItem } from '../view/view';

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

}
