import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../environment';
import HttpService from '../http/http.service';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { mapView } from '../view/view';

export default class ViewService {

	static viewId$_ = new BehaviorSubject(null);
	static set viewId(viewId) {
		this.viewId$_.next(viewId);
	}
	static get viewId() {
		return this.viewId$_.getValue();
	}

	static data$() {
		if (!this.data$_) {
			const dataUrl = environment.flags.production ? '/api/view' : './api/data.json';
			this.data$_ = HttpService.get$(dataUrl).pipe(
				map(data => {
					data.views = data.views.map(view => mapView(view));
					return data;
				}),
				// tap(data => console.log('ViewService.data$', data)),
				shareReplay(1),
			);
		}
		return this.data$_;
	}

	static view$(data) {
		const views = data.views.filter(x => x.type.name !== 'waiting-room');
		const initialViewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : (views.length ? views[0].id : null);
		this.viewId$_.next(initialViewId);
		return this.viewId$_.pipe(
			distinctUntilChanged(),
			map(viewId => {
				const view = data.views.find(view => view.id === viewId);
				return view || this.getWaitingRoom(data);
			}),
		);
	}

	static hostedView$(data) {
		const waitingRoom = this.getWaitingRoom(data);
		return combineLatest([this.view$(data), this.hosted$()]).pipe(
			map(datas => {
				const view = datas[0];
				const hosted = datas[1];
				return hosted ? view : waitingRoom;
			}),
			tap(view => {
				if (view.id !== waitingRoom.id) {
					LocationService.set('viewId', view.id);
				}
			}),
		);
	}

	static editorView$(data) {
		const waitingRoom = this.getWaitingRoom(data);
		return this.view$(data).pipe(
			tap(view => {
				if (view.id !== waitingRoom.id) {
					LocationService.set('viewId', view.id);
				}
			}),
		);
	}

	static hosted$() {
		return StateService.state$.pipe(
			map(state => state.hosted),
			distinctUntilChanged(),
		);
	}

	static viewById$(viewId) {
		return this.data$().pipe(
			map(data => data.views.find(x => x.id === viewId))
		);
	}

	static viewLike$(view) {
		if (!view.liked) {
			view.liked = true;
			if (environment.flags.production) {
				return HttpService.get$(`/api/view/${view.id}/like`);
			} else {
				view.likes = view.likes || 0;
				view.likes++;
				return of(view);
			}
		} else {
			return of(null);
		}
	}

	static getWaitingRoom(data) {
		return data && data.views.find(x => x.type.name === 'waiting-room') || {
			id: 'waiting-room',
			type: { id: 1, name: 'waiting-room' },
			name: 'Waiting Room',
			likes: 0,
			liked: false,
			asset: {
				type: { id: 1, name: 'image' },
				folder: '/textures/waiting-room/',
				file: 'waiting-room.jpg',
			},
			items: [],
			orientation: {
				latitude: 0,
				longitude: 0
			}
		};
	}

}
