import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { Subject } from 'rxjs';
import { delay, first, map, takeUntil } from 'rxjs/operators';
import { AgoraStatus } from '../agora/agora.types';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import StateService from '../state/state.service';
import ToastService from '../toast/toast.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { ViewItemType, ViewType } from '../view/view';
import VRService from '../world/vr.service';
import EditorService from './editor.service';

export default class EditorComponent extends Component {

	get hosted() {
		return this.hosted_;
	}

	set hosted(hosted) {
		if (this.hosted_ !== hosted) {
			this.hosted_ = hosted;
			if (this.data && this.controls) {
				if (hosted) {
					const view = this.data.views.find(x => x.id === this.controls.view.value);
					this.view = view;
				} else {
					this.view = this.getWaitingRoom();
				}
			}
		}
	}

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.aside = false;
		this.state = {};
		this.data = null;
		this.views = null;
		this.view = null;
		this.form = null;
		this.local = null;
		this.remotes = [];
		this.viewHit = new Subject();
		const vrService = this.vrService = VRService.getService();
		vrService.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => this.pushChanges());
		this.resolveUser();
	}

	resolveUser() {
		UserService.me$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(user => {
			if (user && user.type === RoleType.Publisher) {
				this.user = user;
				this.initState();
			} else {
				window.location.href = environment.url.access;
			}
		});
	}

	initState() {
		const user = this.user;
		const role = user.type;
		const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null;
		const state = {
			user: user,
			role: role,
			name: name,
			link: null,
			channelName: environment.channelName,
			uid: null,
			status: AgoraStatus.Connected,
			connecting: false,
			connected: true,
			locked: false,
			control: false,
			spyed: false,
			hosted: true,
			live: false,
			cameraMuted: false,
			audioMuted: false,
		};
		StateService.state = state;
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.hosted = state.hosted;
			this.pushChanges();
		});
		this.loadData();
	}

	loadData() {
		EditorService.data$().pipe(
			first()
		).subscribe(data => {
			this.data = data;
			this.initForm();
		});
	}

	initForm() {
		const data = this.data;
		// const views = this.views = data.views.filter(x => x.type.name !== 'waiting-room');
		const views = this.views = data.views.slice();
		const initialViewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : views[0].id;
		const form = this.form = new FormGroup({
			view: new FormControl(initialViewId, Validators.RequiredValidator()),
		});
		const controls = this.controls = form.controls;
		controls.view.options = views;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$),
			map(changes => {
				// console.log('EditorComponent.form.changes$', changes, form.valid);
				const view = data.views.find(x => x.id === changes.view);
				this.view = null;
				this.pushChanges();
				return view;
			}),
			delay(1),
			map(view => {
				const waitingRoom = this.getWaitingRoom();
				this.view = view;
				this.pushChanges();
				if (view.id !== waitingRoom.id) {
					LocationService.set('viewId', view.id);
				}
			}),
		).subscribe(console.log);
	}

	getWaitingRoom() {
		return this.data && this.data.views.find(x => x.type.name === 'waiting-room') || {
			id: 'waiting-room',
			type: { id: 1, name: 'waiting-room' },
			name: 'Waiting Room',
			likes: 40,
			liked: false,
			asset: {
				type: { id: 1, name: 'image' },
				folder: 'waiting-room/',
				file: 'waiting-room-02.jpg',
			},
			items: [],
			orientation: {
				latitude: 0,
				longitude: 0
			}
		};
	}

	onNavTo(viewId) {
		const view = this.data.views.find(x => x.id === viewId);
		if (view) {
			if (this.controls.view.value !== viewId) {
				this.controls.view.value = viewId;
			}
		}
	}

	onRemoteControlRequest(message) {
		ModalService.open$({ src: environment.template.modal.controlRequest, data: null }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.patchState({ control: true, spying: false });
			} else {
				this.patchState({ control: false, spying: false });
			}
		});
	}

	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	tryInAr() {
		ModalService.open$({ src: environment.template.modal.tryInAr, data: this.view }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			// this.pushChanges();
		});
	}

	/*
	onPrevent(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	*/

	replaceUrl() {
		if ('history' in window) {
			const params = new URLSearchParams(window.location.search);
			const debug = params.get('debug') || null;
			const editor = params.get('editor') || null;
			const role = params.get('role') || null;
			const link = params.get('link') || null;
			const name = params.get('name') || null;
			const url = `${window.location.origin}${window.location.pathname}?link=${link}${name ? `&name=${name}` : ''}${role ? `&role=${role}` : ''}${debug ? `&debug` : ''}${editor ? `&editor` : ''}`;
			// console.log('AgoraNameComponent.url', url);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
	}

	onToggleAside() {
		this.aside = !this.aside;
		this.pushChanges();
		window.dispatchEvent(new Event('resize'));
	}

	// editor

	onViewHit(event) {
		console.log('onViewHit');
		this.viewHit.next(event);
	}

	onViewHitted(callback) {
		if (this.viewHitSubscription) {
			this.viewHitSubscription.unsubscribe();
			this.viewHitSubscription = null;
		}
		if (typeof callback === 'function') {
			this.viewHitSubscription = this.viewHit.pipe(
				first(),
			).subscribe(position => callback(position))
		}
	}

	onDragEnd(event) {
		EditorService.inferItemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			console.log('EditorComponent.onDragEnd.inferItemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onDragEnd.inferItemUpdate$.error', error));
	}

	onResizeEnd(event) {
		console.log('EditorComponent.onResizeEnd');
		/*
		EditorService.inferItemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			console.log('EditorComponent.onResizeEnd.inferItemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onResizeEnd.inferItemUpdate$.error', error));
		*/
	}

	onWorldSelect(event) {
		this.view.items.forEach(item => item.showPanel = false);
		this.view.items.forEach(item => item.selected = item === event.item);
		this.view.selected = this.view.items.find(item => item.selected) === undefined;
		this.pushChanges();
	}

	onOpenModal(modal, data) {
		ModalService.open$({ src: environment.template.modal[modal.type][modal.value], data }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				console.log('EditorComponent.onOpenModal.resolve', event);
				switch (modal.value) {
					case ViewItemType.Nav.name:
					case ViewItemType.Plane.name:
					case ViewItemType.CurvedPlane.name:
						const tile = EditorService.getTile(this.view);
						if (tile) {
							const navs = tile.navs || [];
							navs.push(event.data);
							Object.assign(tile, { navs });
							this.view.updateCurrentItems();
						} else {
							const items = this.view.items || [];
							items.push(event.data);
							Object.assign(this.view, { items });
						}
						this.pushChanges();
						break;
					case ViewType.Panorama.name:
					case ViewType.PanoramaGrid.name:
						this.data.views.push(event.data);
						this.controls.view.value = event.data.id;
						this.pushChanges();
						break;
					default:
				}
			}
			this.pushChanges();
		});
	}

	onAsideSelect(event) {
		console.log('onAsideSelect', event);
		if (event.value) {
			switch (event.value) {
				case ViewItemType.Nav.name:
				case ViewItemType.Plane.name:
				case ViewItemType.CurvedPlane.name:
					this.onViewHitted((position) => {
						this.onOpenModal(event, { view: this.view, position });
					});
					ToastService.open$({ message: 'Click a point on the view' });
					break;
				default:
					this.onOpenModal(event, { view: this.view });
			}
		} else if (event.view && (event.item || event.item === null)) {
			event.view.selected = false;
			event.view.items.forEach(item => item.selected = item === event.item);
			this.pushChanges();
		} else if (event.view && (event.tile || event.tile === null)) {
			event.view.selected = false;
			event.view.tiles.forEach(tile => tile.selected = tile === event.tile);
			/*
			// if tile selected
			// send ChangeTile message to world component
			this.orbit.walk(event.position, (headingLongitude, headingLatitude) => {
				const item = this.view.getTile(event.indices.x, event.indices.y);
				if (item) {
					this.panorama.crossfade(item, this.renderer, (envMap, texture, rgbe) => {
						// this.scene.background = envMap;
						this.scene.environment = envMap;
						this.orbit.walkComplete(headingLongitude, headingLatitude);
						// this.render();
						// this.pushChanges();
					});
				}
			});
			*/
			this.pushChanges();
		} else if (event.view || event.view === null) {
			this.view.selected = (this.view === event.view);
			this.view.items.forEach(item => item.selected = false);
			const currentTile = EditorService.getTile(this.view);
			if (currentTile) {
				this.view.tiles.forEach(tile => tile.selected = tile === currentTile);
			}
			this.pushChanges();
		}
	}

	onAsideUpdate(event) {
		console.log('onAsideUpdate', event);
		if (event.item && event.view) {
			EditorService.inferItemUpdate$(event.view, event.item).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideUpdate.inferItemUpdate$.success', response);
				EditorService.inferItemUpdateResult$(event.view, event.item);
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideUpdate.inferItemUpdate$.error', error));
		} else if (event.tile && event.view) {
			/*
			EditorService.tileUpdate$...
			*/
		} else if (event.view) {
			EditorService.viewUpdate$(event.view).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideUpdate.viewUpdate$.success', response);
				const assetDidChange = this.view.asset.id !== event.view.asset.id;
				Object.assign(this.view, event.view);
				if (assetDidChange) {
					this.controls.view.value = event.view.id;
				} else {
					this.pushChanges();
				}
			}, error => console.log('EditorComponent.onAsideUpdate.viewUpdate$.error', error));
		}
	}

	onAsideDelete(event) {
		console.log('onAsideDelete', event);
		if (event.item && event.view) {
			EditorService.inferItemDelete$(event.view, event.item).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideDelete.inferItemDelete$.success', response);
				EditorService.inferItemDeleteResult$(event.view, event.item);
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.inferItemDelete$.error', error));
		} else if (event.view) {
			EditorService.viewDelete$(event.view).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideDelete.viewDelete$.success', response);
				const index = this.data.views.indexOf(event.view);
				if (index !== -1) {
					this.data.views.splice(index, 1);
				}
				this.views = this.data.views.slice();
				this.controls.view.value = this.views[0].id;
				// this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.viewDelete$.error', error));
		}
	}

}

EditorComponent.meta = {
	selector: '[editor-component]',
};
