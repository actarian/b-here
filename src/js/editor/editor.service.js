import { map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapView } from '../view/view';

export default class EditorService {
	static data$() {
		return HttpService.get$('./api/editor.json').pipe(
			map(data => {
				data.views = data.views.map(view => mapView(view));
				return data;
			}),
		);
	}
	static viewCreate$(data) {
		return HttpService.post$('/api/view', data).pipe(
			map(view => mapView(view)),
		);
	}
}
