import { map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapView } from '../view/view';

export default class ViewService {

	static data$() {
		return HttpService.get$('./api/data.json').pipe(
			map(data => {
				data.views = data.views.map(view => mapView(view));
				return data;
			}),
		);
	}

	static view$(viewId) {
		return this.data$().pipe(
			map(data => data.views.find(x => x.id === viewId))
		);
	}

}
