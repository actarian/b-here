import { Component, getContext } from 'rxcomp';
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { DEBUG, environment } from '../environment';
import GtmService from '../gtm/gtm.service';
import LocationService from '../location/location.service';
import MessageService from '../message/message.service';
import ModalService from '../modal/modal.service';
import StateService from '../state/state.service';
import StreamService from '../stream/stream.service';
import TryInARModalComponent from '../try-in-ar/try-in-ar-modal.component';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { PanoramaGridView } from '../view/view';
import ViewService from '../view/view.service';
import VRService from '../world/vr.service';
import AgoraService from './agora.service';
import { AgoraStatus, MessageType } from './agora.types';

export default class AgoraComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.env = environment;
		this.platform = DeviceService.platform;
		this.state = {};
		this.hosted = null;
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
		this.resolveUser();
	}

	getLinkRole() {
		let linkRole = null;
		const match = (LocationService.get('link') || '').match(/\d{9}-(\d{4})-\d{13}/);
		if (match) {
			const index = parseInt(match[1]);
			linkRole = Object.keys(RoleType).reduce((p, c, i) => {
				return i === index ? RoleType[c] : p;
			}, null)
		}
		return linkRole;
	}

	resolveUser() {
		UserService.me$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(user => {
			const linkRole = this.getLinkRole();
			if (user && (!linkRole || linkRole === user.type)) {
				this.initWithUser(user);
			} else if (linkRole === RoleType.Publisher || linkRole === RoleType.Attendee) {
				window.location.href = environment.url.access;
			} else {
				this.initWithUser({ type: linkRole });
			}
		});
	}

	initWithUser(user) {
		console.log('AgoraComponent.initWithUser', user);
		const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null;
		const role = LocationService.get('role') || user.type;
		const name = LocationService.get('name') || userName;
		const link = LocationService.get('link') || null;
		const hosted = role === RoleType.Publisher ? true : false;
		const live = (DEBUG || role === RoleType.SelfService) ? false : true;
		const state = {
			user: user,
			role: role,
			name: name,
			link: link,
			channelName: environment.channelName,
			uid: null,
			status: 'idle',
			connecting: false,
			connected: false,
			locked: false,
			control: false,
			spyed: false,
			hosted: hosted,
			live: live,
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
			// console.log(state);
		});
		this.loadView();
	}

	loadView() {
		this.initAgora();
		ViewService.data$().pipe(
			switchMap(data => {
				this.data = data;
				this.views = data.views.filter(x => x.type.name !== 'waiting-room');
				return ViewService.hostedView$(data);
			}),
			takeUntil(this.unsubscribe$),
			/*
			tap(view => {
				this.view = null;
				this.pushChanges();
			}),
			delay(1),
			*/
			tap(view => {
				if (this.agora) {
					this.agora.navToView(view.id);
				}
				this.view = view;
				this.pushChanges();
			}),
		).subscribe(view => {
			console.log('AgoraComponent.hostedView$', view);
		});
	}

	initAgora() {
		let agora = null;
		if (DEBUG || this.state.role === RoleType.SelfService) {
			StateService.patchState({ status: AgoraStatus.Connected, hosted: true });
		} else {
			agora = this.agora = AgoraService.getSingleton();
			let status;
			if (!this.state.link) {
				status = AgoraStatus.Link;
			} else if (!this.state.name) {
				status = AgoraStatus.Name;
			} else if (this.state.role !== RoleType.Viewer) {
				status = AgoraStatus.Device;
			} else {
				status = AgoraStatus.ShouldConnect;
			}
			StateService.patchState({ status });
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
						control: StateService.state.control,
					};
					MessageService.sendBack(message);
					break;
				case MessageType.RequestControl:
					console.log('AgoraComponent', 'MessageType.RequestControlAccepted');
					message.type = MessageType.RequestControlAccepted;
					MessageService.sendBack(message);
					StateService.patchState({ locked: true });
					if (this.agora) {
						this.agora.sendControlRemoteRequestInfo(message.clientId);
					}
					// !!! control request permission not required
					// this.onRemoteControlRequest(message);
					break;
				// !!! moved to WorldComponent
				/*
				case MessageType.RequestInfo:
					if (StateService.state.role !== RoleType.Publisher) {
						StateService.patchState({ spyed: true });
					}
					break;
				case MessageType.RequestInfoResult:
					console.log('AgoraComponent.RequestInfoResult', ViewService.viewId, message.viewId);
					ViewService.viewId = message.viewId;
					// console.log('AgoraComponent.RequestInfoResult', message.viewId);
					break;
				*/
				case MessageType.NavToView:
					if (message.viewId) {
						if (ViewService.viewId !== message.viewId) {
							ViewService.viewId = message.viewId;
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

	onLink(link) {
		if (StateService.state.name) {
			if (StateService.state.role === RoleType.Viewer) {
				this.connect();
			} else {
				StateService.patchState({ link, status: AgoraStatus.Device });
			}
		} else {
			StateService.patchState({ link, status: AgoraStatus.Name });
		}
	}

	onName(name) {
		if (StateService.state.role === RoleType.Viewer) {
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
		// console.log('AgoraComponent.connect', this.state.role);
		if (this.state.role !== RoleType.SelfService) {
			const sharedMeetingId = this.state.link.replace(/-\d+-/, '-');
			const log = {
				meetingId: this.state.link,
				sharedMeetingId: sharedMeetingId,
				fullName: this.state.name,
				userType: this.state.role
			};
			// console.log('AgoraComponent.connect', log);
			UserService.log$(log).pipe(
				first(),
			).subscribe();
			GtmService.push({
				action: 'b-here-meeting',
				meetingId: this.state.link,
				sharedMeetingId: sharedMeetingId,
				userType: this.state.role
			});
		}
	}

	disconnect() {
		if (this.agora) {
			this.agora.leaveChannel().then(() => {
				// StateService.patchState({ status: AgoraStatus.Disconnected, connected: false });
				window.location.href = window.location.href;
			}, console.log);
		} else {
			this.patchState({ connecting: false, connected: false });
		}
	}

	onNavTo(viewId) {
		ViewService.viewId = viewId;
	}

	/*
	onRemoteControlRequest(message) {
		ModalService.open$({ src: environment.template.modal.controlRequest, data: null }).pipe(
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
	*/

	// !!! why locally?
	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	toggleCamera() {
		if (this.agora) {
			this.agora.toggleCamera();
		} else {
			this.patchState({ cameraMuted: !this.state.cameraMuted });
		}
	}

	toggleAudio() {
		if (this.agora) {
			this.agora.toggleAudio();
		} else {
			this.patchState({ audioMuted: !this.state.audioMuted });
		}
	}

	onToggleVolume() {
		const volumeMuted = !this.state.volumeMuted;
		StateService.patchState({ volumeMuted })
	}

	onToggleControl() {
		if (this.agora) {
			this.agora.toggleControl();
		} else if (this.state.control) {
			this.patchState({ control: false });
		}/* else {
			this.onRemoteControlRequest({});
		}
		*/
	}

	onToggleSpy(remoteId) {
		if (this.agora) {
			this.agora.toggleSpy(remoteId);
		} else {
			this.patchState({ spying: !this.state.spying, control: false });
		}
	}

	addLike() {
		ViewService.viewLike$(this.view).pipe(
			first(),
		).subscribe((view) => {
			if (view) {
				this.view.liked = true; // view.liked;
				this.view.likes = view.likes;
				this.pushChanges();
			}
		});
	}

	tryInAr() {
		if (this.platform === DevicePlatform.IOS || this.platform === DevicePlatform.Android) {
			TryInARModalComponent.openInAR(this.view);
		} else {
			ModalService.open$({ src: environment.template.modal.tryInAr, data: this.view }).pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(event => {
				// this.pushChanges();
			});
		}
	}

	/*
	onPrevent(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	*/
}

AgoraComponent.meta = {
	selector: '[agora-component]',
};
