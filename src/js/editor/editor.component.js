import { Component, getContext } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { Subject } from 'rxjs';
import { delay, first, map, takeUntil } from 'rxjs/operators';
import { AgoraStatus, RoleType, StreamQualities } from '../agora/agora.types';
import { DEBUG, EDITOR, environment } from '../environment';
import LocationService from '../location/location.service';
import ModalSrcService from '../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import StateService from '../state/state.service';
import ToastService from '../toast/toast.service';
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
		this.debug = DEBUG;
		this.editor = EDITOR;
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
		EditorService.data$().pipe(
			first()
		).subscribe(data => {
			this.data = data;
			const role = LocationService.get('role') || RoleType.Publisher;
			const link = LocationService.get('link') || null;
			const name = LocationService.get('name') || null;
			StateService.state = {
				role: role,
				link: link,
				name: name,
				channelName: environment.channelName,
				publisherId: role === RoleType.Publisher ? environment.publisherId : null,
				uid: null,
				status: AgoraStatus.Connected,
				connecting: false,
				connected: true,
				locked: false,
				control: false,
				spyed: false,
				hosted: role === RoleType.Publisher ? true : false,
				cameraMuted: false,
				audioMuted: false,
				devices: [],
				quality: role === RoleType.Publisher ? StreamQualities[0] : StreamQualities[StreamQualities.length - 1],
			};
			this.initForm();
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.hosted = state.hosted;
			this.pushChanges();
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
				/*
				if (!this.state.hosted) {
					view = this.getWaitingRoom();
				} else {
					if (!DEBUG) {
						this.agora.navToView(view.id);
					}
				}
				*/
				// collect items publisherStream & nextAttendeeStream ?
				this.view = view;
				this.pushChanges();
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
		ModalService.open$({ src: ModalSrcService.get('controlRequest'), data: null }).pipe(
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
		ModalService.open$({ src: ModalSrcService.get('tryInAr'), data: this.view }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			// this.pushChanges();
		});
	}

	onPrevent(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}

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
		EditorService.itemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			console.log('EditorComponent.onDragEnd.itemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onDragEnd.itemUpdate$.error', error));
	}

	onResizeEnd(event) {
		console.log('EditorComponent.onResizeEnd');
		/*
		EditorService.itemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			console.log('EditorComponent.onResizeEnd.itemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onResizeEnd.itemUpdate$.error', error));
		*/
	}

	onWorldSelect(event) {
		this.view.selected = false;
		this.view.items.forEach(item => item.selected = item === event.item);
		this.pushChanges();
	}

	onOpenModal(modal, data) {
		ModalService.open$({ src: ModalSrcService.get(modal.type, modal.value), data }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				console.log('EditorComponent.onOpenModal.resolve', event);
				switch (modal.value) {
					case ViewItemType.Nav.name:
					case ViewItemType.Plane.name:
					case ViewItemType.CurvedPlane.name:
						const items = this.view.items || [];
						items.push(event.data);
						Object.assign(this.view, { items });
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
		// console.log('onAsideSelect', event);
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
			this.pushChanges();
		} else if (event.view || event.view === null) {
			this.view.selected = (this.view === event.view);
			this.view.items.forEach(item => item.selected = false);
			this.pushChanges();
		}
	}

	onAsideUpdate(event) {
		console.log('onAsideUpdate', event);
		if (event.item && event.view) {
			EditorService.itemUpdate$(event.view, event.item).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideUpdate.itemUpdate$.success', response);
				const item = event.view.items.find(item => item.id === event.item.id);
				if (item) {
					Object.assign(item, event.item);
				}
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideUpdate.itemUpdate$.error', error));
		} else if (event.view) {
			EditorService.viewUpdate$(event.view).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideUpdate.viewUpdate$.success', response);
				Object.assign(this.view, event.view);
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideUpdate.viewUpdate$.error', error));
		}
	}

	onAsideDelete(event) {
		console.log('onAsideDelete', event);
		if (event.item && event.view) {
			EditorService.itemDelete$(event.view, event.item).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideDelete.itemDelete$.success', response);
				const index = event.view.items.indexOf(event.item);
				if (index !== -1) {
					event.view.items.splice(index, 1);
				}
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.itemDelete$.error', error));
		} else if (event.view) {
			EditorService.viewDelete$(event.view).pipe(
				first(),
			).subscribe(response => {
				console.log('EditorComponent.onAsideDelete.viewDelete$.success', response);
				const index = this.views.indexOf(event.view);
				if (index !== -1) {
					this.views.splice(index, 1);
				}
				this.controls.view.value = this.data.views[0].id;
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.viewDelete$.error', error));
		}
	}

}

EditorComponent.meta = {
	selector: '[editor-component]',
};