import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { AssetType } from '../asset/asset';
import { environment } from '../environment';
import HttpService from '../http/http.service';
import { LanguageService } from '../language/language.service';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { mapView, ViewItemType } from '../view/view';

export default class ViewService {

	// action: { viewId:number, keepOrientation:boolean };
	static action$_ = new BehaviorSubject(null);
	static set action(action) {
		this.action$_.next(action);
	}
	static get action() {
		return this.action$_.getValue();
	}

	// static viewId$_ = new BehaviorSubject(null);
	static set viewId(viewId) {
		this.action$_.next({ viewId, keepOrientation: false });
	}
	static get viewId() {
		const action = this.action$_.getValue();
		return action ? action.viewId : null;
	}

	static data$() {
		if (!this.data$_) {
			const dataUrl = (environment.flags.production ? '/api/view' : './api/data.json') + '?lang=' + LanguageService.selectedLanguage;
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

	static view$(data, editor) {
		const views = editor ? data.views : data.views.filter(x => x.type.name !== 'waiting-room');
		const viewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : null;
		const embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
		const firstViewId = views.length ? views[0].id : null;
		const initialViewId = embedViewId || viewId || firstViewId;
		this.action$_.next({ viewId: initialViewId });
		return this.action$_.pipe(
			distinctUntilChanged((a, b) => a.viewId === b.viewId),
			map(action => {
				const view = data.views.find(view => view.id === action.viewId);
				if (view) {
					view.keepOrientation = action.keepOrientation || false;
				}
				// console.log('ViewService.view$', action.viewId, action.keepOrientation);
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
					const prefetchAssets = ViewService.getPrefetchAssets(view, data);
					view.prefetchAssets = prefetchAssets;
				}
			}),
		);
	}

	static editorView$(data) {
		const waitingRoom = this.getWaitingRoom(data);
		return this.view$(data, true).pipe(
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

	static setViewLike$(message) {
		return this.viewById$(message.viewId).pipe(
			tap(view => {
				if (view) {
					view.likes = message.likes;
				}
			})
		);
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

	static getPrefetchAssets(view, data) {
		const assets = view.items
			// filter nav items
			.filter(x => x.type.name === ViewItemType.Nav.name && x.viewId != null)
			// map to view
			.map(x => data.views.find(v => v.id === x.viewId))
			// filter view with image
			.filter(v => v && v.asset && v.asset.type.name === AssetType.Image.name)
			// map to asset
			.map(v => environment.getPath(v.asset.folder + v.asset.file));
		// console.log('ViewService.getPrefetchAssets', assets);
		return assets;
	}
}
