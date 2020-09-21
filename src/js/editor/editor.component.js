import { Component, getContext } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { Subject } from 'rxjs';
import { delay, first, map, takeUntil } from 'rxjs/operators';
import { AgoraStatus, RoleType, StreamQualities } from '../agora/agora.types';
import { BASE_HREF, DEBUG, EDITOR, environment, STATIC } from '../environment';
import LocationService from '../location/location.service';
import ModalSrcService from '../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import StateService from '../state/state.service';
import ToastService from '../toast/toast.service';
import VRService from '../world/vr.service';
import EditorService from './editor.service';

const CONTROL_REQUEST = STATIC ? BASE_HREF + 'modals/control-request-modal.html' : `/viewdoc.cshtml?co_id=${environment.views.controlRequestModal}`;
const TRY_IN_AR = STATIC ? BASE_HREF + 'modals/try-in-ar-modal.html' : `/viewdoc.cshtml?co_id=${environment.views.tryInArModal}`;

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
		// const views = this.views = data.views.filter(x => x.type !== 'waiting-room');
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
		return this.data && this.data.views.find(x => x.type === 'waiting-room') || {
			id: 'waiting-room',
			type: 'waiting-room',
			name: 'Waiting Room',
			likes: 40,
			liked: false,
			asset: {
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
		ModalService.open$({ src: CONTROL_REQUEST, data: null }).pipe(
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
		ModalService.open$({ src: TRY_IN_AR, data: this.view }).pipe(
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
		}, error => console.log('EditorComponent.onDragEnd.itemUpdate$.error', error));
	}

	onOpenModal(modal, data) {
		ModalService.open$({ src: ModalSrcService.get(modal.type, modal.value), data }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				console.log('onMenuSelect.resolve', event);
				switch (modal.value) {
					case 'nav':
						const item = event.data;
						const items = this.view.items || [];
						items.push(item);
						Object.assign(this.view, { items });
						this.pushChanges();
						break;
					default:
				}
			}
			this.pushChanges();
		});
	}

	onMenuSelect(event) {
		console.log('onMenuSelect', event);
		switch (event.value) {
			case 'nav':
			case 'plane':
			case 'curved-plane':
				this.onViewHitted((position) => {
					this.onOpenModal(event, { view: this.view, position });
				});
				ToastService.open$({ message: 'Click a point on the view' });
				break;
			default:
				this.onOpenModal(event, { view: this.view });
		}
	}

}

EditorComponent.meta = {
	selector: '[editor-component]',
};
