import { Component, getContext } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import { BASE_HREF, DEBUG, environment } from '../environment';
import LocationService from '../location/location.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import ViewService, { PanoramaGridView } from '../view/view.service';
import VRService from '../world/vr.service';
import AgoraService, { AgoraStatus, MessageType, RoleType, StreamQualities } from './agora.service';

const CONTROL_REQUEST = BASE_HREF + 'control-request-modal.html';
const TRY_IN_AR = BASE_HREF + 'try-in-ar-modal.html';

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
		const agora = this.agora = AgoraService.getSingleton();
		if (agora) {
			agora.message$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(message => {
				// console.log('AgoraComponent.message', message);
				switch (message.type) {
					case MessageType.RequestPeerInfo:
						if (message.streamId === agora.state.uid) {
							message.type = MessageType.RequestPeerInfoResult;
							message.clientInfo = {
								role: agora.state.role,
								name: agora.state.name,
								uid: agora.state.uid,
							};
							agora.sendMessage(message);
						}
						break;
					case MessageType.RequestControl:
						message.type = MessageType.RequestControlAccepted;
						agora.sendMessage(message);
						agora.patchState({ locked: true });
						// !!! control request permission not required
						// this.onRemoteControlRequest(message);
						break;
					case MessageType.RequestInfo:
						if (message.clientId === agora.state.uid) {
							agora.patchState({ spyed: true });
						}
						break;
					case MessageType.RequestInfoResult:
						if (agora.state.role === RoleType.Publisher && this.controls.view.value !== message.viewId) {
							this.controls.view.value = message.viewId;
							// console.log('AgoraComponent.RequestInfoResult', message.viewId);
						}
						break;
					case MessageType.NavToView:
						if ((agora.state.locked || (agora.state.spying && message.clientId === agora.state.spying)) && message.viewId) {
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
			agora.state$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(state => {
				// console.log('AgoraComponent.state', state);
				this.state = state;
				this.hosted = state.hosted;
				this.pushChanges();
			});
			agora.local$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(local => {
				// console.log('AgoraComponent.local', local);
				this.local = local;
				this.pushChanges();
			});
			agora.remotes$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(remotes => {
				// console.log('AgoraComponent.remotes', remotes);
				this.remotes = remotes;
				this.pushChanges();
			});
		} else {
			const role = LocationService.get('role') || RoleType.Attendee;
			const link = LocationService.get('link') || null;
			const name = LocationService.get('name') || null;
			this.state = {
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
	}

	initForm() {
		const data = this.data;
		const views = this.views = data.views.filter(x => x.type !== 'waiting-room');
		const form = this.form = new FormGroup({
			view: new FormControl(views[0].id, Validators.RequiredValidator()),
		});
		const controls = this.controls = form.controls;
		controls.view.options = views;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraComponent.form.changes$', changes, form.valid);
			const view = data.views.find(x => x.id === changes.view);
			this.view = null;
			this.pushChanges();
			setTimeout(() => {
				if (this.state.hosted) {
					this.view = view;
					// !!!
					if (!DEBUG) {
						this.agora.navToView(view.id);
					}
				} else {
					// !!! waiting room
					this.view = this.getWaitingRoom();
				}
				this.pushChanges();
			}, 1);
		});
	}

	getWaitingRoom() {
		return this.data && this.data.views.find(x => x.type === 'waiting-room') || {
			id: 'waiting-room',
			type: 'waiting-room',
			name: 'Waiting Room',
			likes: 40,
			liked: false,
			envMapFolder: 'waiting-room/',
			envMapFile: 'waiting-room-02.jpg',
			items: [],
			orientation: {
				latitude: 0,
				longitude: 0
			}
		};
	}

	onLink(link) {
		if (this.agora.state.name) {
			this.agora.patchState({ link, status: AgoraStatus.Device });
		} else {
			this.agora.patchState({ link, status: AgoraStatus.Name });
		}
	}

	onName(name) {
		this.agora.patchState({ name, status: AgoraStatus.Device });
	}

	onEnter(preferences) {
		this.connect(preferences);
	}

	connect(preferences) {
		this.agora.connect$(preferences).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((state) => {
			console.log('AgoraComponent.connect.state', state);
			// this.state = Object.assign(this.state, state);
			// this.pushChanges();
		});
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
			this.agora.sendMessage({
				type: MessageType.SlideChange,
				clientId: this.agora.state.uid,
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
		ModalService.open$({ src: CONTROL_REQUEST, data: null }).pipe(
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
				this.agora.sendMessage(message);
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

	// onView() { const context = getContext(this); }

	// onChanges() {}

	// onDestroy() {}

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

	onToggleSpy(clientId) {
		if (!DEBUG) {
			this.agora.toggleSpy(clientId);
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

}

AgoraComponent.meta = {
	selector: '[agora-component]',
};
