import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../http/http.service';
import { mapViewItem } from '../../view/view';
import { mapNavmap } from './navmap';

export default class NavmapService {

	static active$ = new BehaviorSubject(false);
	static set active(active) {
		this.active$.next(active);
	}
	static get active() {
		return this.active$.getValue();
	}

	static navmapGet$() {
		return HttpService.get$(`/api/navmap`).pipe(
			map(data => {
				data.navmaps.map(navmap => mapNavmap(navmap));
				return data.navmaps;
			}),
		);
	}

	static navmapCreate$(navmap) {
		return HttpService.post$(`/api/navmap`, navmap).pipe(
			map(navmap => mapNavmap(navmap)),
		);
	}

	static navmapUpdate$(navmap) {
		return HttpService.put$(`/api/navmap/${navmap.id}`, navmap).pipe(
			map(x => mapNavmap(x)),
		);
	}

	static navmapDelete$(navmap) {
		return HttpService.delete$(`/api/navmap/${navmap.id}`);
	}

	static itemCreate$(navmap, item) {
		return HttpService.post$(`/api/navmap/${navmap.id}/item`, item).pipe(
			map(item => mapViewItem(item)),
		);
	}

	static itemUpdate$(navmap, item) {
		item = mapViewItem(item); // !!! ??
		return HttpService.put$(`/api/navmap/${navmap.id}/item/${item.id}`, item.payload).pipe(
			map(item => mapViewItem(item)),
		);
	}

	static itemDelete$(navmap, item) {
		return HttpService.delete$(`/api/navmap/${navmap.id}/item/${item.id}`);
	}
}
