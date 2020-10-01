import { Component, getContext } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { delay, first, map, takeUntil } from 'rxjs/operators';
import { DEBUG, environment } from '../environment';
import LocationService from '../location/location.service';
import MessageService from '../message/message.service';
import ModalSrcService from '../modal/modal-src.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import StateService from '../state/state.service';
import StreamService from '../stream/stream.service';
import { RoleType } from '../user/user';
import { PanoramaGridView } from '../view/view';
import ViewService from '../view/view.service';
import VRService from '../world/vr.service';
import AgoraService from './agora.service';
import { AgoraStatus, MessageType, StreamQualities } from './agora.types';

export default class AgoraComponent extends Component {

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
		this.debug = DEBUG;
		this.state = {};
		this.data = null;
		this.views = null;
		this.view = null;
		this.form = null;
		this.local = null;
		this.remotes = [];
		const vrService = this.vrService = VRService.getService();
		vrService.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => this.pushChanges());
		ViewService.data$().pipe(
			first()
		).subscribe(data => {
			this.data = data;
			this.init();
			this.initForm();
		});
	}

	init() {
		let agora = null;
		const role = LocationService.get('role') || RoleType.Attendee;
		if (role !== RoleType.SelfService || DEBUG) {
			agora = this.agora = AgoraService.getSingleton();
		}
		if (!agora) {
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
		}
		StreamService.local$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(local => {
			// console.log('AgoraComponent.local', local);
			this.local = local;
			this.pushChanges();
		});
		StreamService.remotes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(remotes => {
			// console.log('AgoraComponent.remotes', remotes);
			this.remotes = remotes;
			this.pushChanges();
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.hosted = state.hosted;
			this.pushChanges();
		});
		MessageService.out$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			// console.log('AgoraComponent.message', message);
			switch (message.type) {
				case MessageType.RequestPeerInfo:
					message.type = MessageType.RequestPeerInfoResult;
					message.clientInfo = {
						role: StateService.state.role,
						name: StateService.state.name,
						uid: StateService.state.uid,
					};
					MessageService.sendBack(message);
					break;
				case MessageType.RequestControl:
					message.type = MessageType.RequestControlAccepted;
					MessageService.sendBack(message);
					StateService.patchState({ locked: true });
					// !!! control request permission not required
					// this.onRemoteControlRequest(message);
					break;
				case MessageType.RequestInfo:
					StateService.patchState({ spyed: true });
					break;
				case MessageType.RequestInfoResult:
					if (this.controls.view.value !== message.viewId) {
						this.controls.view.value = message.viewId;
						// console.log('AgoraComponent.RequestInfoResult', message.viewId);
					}
					break;
				case MessageType.NavToView:
					if (message.viewId) {
						if (this.controls.view.value !== message.viewId) {
							this.controls.view.value = message.viewId;
							if (message.gridIndex !== undefined) {
								const view = this.data.views.find(x => x.id === message.viewId);
								if (view instanceof PanoramaGridView) {
									view.index = message.gridIndex;
								}
							}
							// console.log('AgoraComponent.NavToView', message.viewId);
						}
					}
					break;
			}
		});
		MessageService.in$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			if (agora) {
				agora.sendMessage(message);
			}
		});
		if (agora && StateService.state.status === AgoraStatus.ShouldConnect) {
			this.connect();
		}
	}

	initForm() {
		const data = this.data;
		const views = this.views = data.views.filter(x => x.type.name !== 'waiting-room');
		const initialViewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : views[0].id;
		const form = this.form = new FormGroup({
			view: new FormControl(initialViewId, Validators.RequiredValidator()),
		});
		const controls = this.controls = form.controls;
		controls.view.options = views;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$),
			map(changes => {
				// console.log('AgoraComponent.form.changes$', changes, form.valid);
				const view = data.views.find(x => x.id === changes.view);
				this.view = null;
				this.pushChanges();
				return view;
			}),
			delay(1),
			map(view => {
				if (!this.state.hosted) {
					view = this.getWaitingRoom();
				} else {
					if (!DEBUG) {
						this.agora.navToView(view.id);
					}
				}
				this.view = view;
				this.pushChanges();
				LocationService.set('viewId', view.id);
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

	onLink(link) {
		if (StateService.state.name) {
			if (StateService.state.role === RoleType.Guest) {
				this.connect();
			} else {
				StateService.patchState({ link, status: AgoraStatus.Device });
			}
		} else {
			StateService.patchState({ link, status: AgoraStatus.Name });
		}
	}

	onName(name) {
		if (StateService.state.role === RoleType.Guest) {
			this.connect();
		} else {
			StateService.patchState({ name, status: AgoraStatus.Device });
		}
	}

	onEnter(preferences) {
		this.connect(preferences);
	}

	connect(preferences) {
		this.agora.connect$(preferences).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
	}

	disconnect() {
		if (!DEBUG) {
			this.agora.leaveChannel();
		} else {
			this.patchState({ connecting: false, connected: false });
		}
	}

	onSlideChange(index) {
		if (!DEBUG) {
			MessageService.send({
				type: MessageType.SlideChange,
				index
			});
		}
	}

	onNavTo(viewId) {
		if (this.controls.view.value !== viewId) {
			this.controls.view.value = viewId;
		}
	}

	onRemoteControlRequest(message) {
		ModalService.open$({ src: ModalSrcService.get('controlRequest'), data: null }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (!DEBUG) {
				if (event instanceof ModalResolveEvent) {
					message.type = MessageType.RequestControlAccepted;
					this.state.locked = true;
				} else {
					message.type = MessageType.RequestControlRejected;
					this.state.locked = false;
				}
				MessageService.sendBack(message);
				this.pushChanges();
			} else {
				if (event instanceof ModalResolveEvent) {
					this.patchState({ control: true, spying: false });
				} else {
					this.patchState({ control: false, spying: false });
				}
			}
		});
	}

	// !!! why locally?
	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	toggleCamera() {
		if (!DEBUG) {
			this.agora.toggleCamera();
		} else {
			this.patchState({ cameraMuted: !this.state.cameraMuted });
		}
	}

	toggleAudio() {
		if (!DEBUG) {
			this.agora.toggleAudio();
		} else {
			this.patchState({ audioMuted: !this.state.audioMuted });
		}
	}

	onToggleControl() {
		if (!DEBUG) {
			this.agora.toggleControl();
		} else if (this.state.control) {
			this.patchState({ control: false });
		} else {
			this.onRemoteControlRequest({});
		}
	}

	onToggleSpy(remoteId) {
		if (!DEBUG) {
			this.agora.toggleSpy(remoteId);
		} else {
			this.patchState({ spying: !this.state.spying, control: false });
		}
	}

	addToWishlist() {
		if (!this.view.liked) {
			this.view.liked = true;
			this.view.likes++;
			this.pushChanges();
		}
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

}

AgoraComponent.meta = {
	selector: '[agora-component]',
};
