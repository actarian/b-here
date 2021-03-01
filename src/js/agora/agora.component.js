import { Component, getContext } from 'rxcomp';
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { DEBUG, environment } from '../environment';
import GtmService from '../gtm/gtm.service';
import LocalStorageService from '../local-storage/local-storage.service';
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

	get uiClass() {
		const uiClass = {};
		uiClass[this.state.role] = true;
		uiClass.chat = this.state.chat;
		return uiClass;
	}

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
		this.screen = null;
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
			first(),
		).subscribe(user => {
			this.initWithUser(user);
			// this.userGuard(user);
		});
	}

	userGuard(user) {
		const linkRole = this.getLinkRole();
		if (user && (!linkRole || user.type === linkRole)) {
			this.initWithUser(user);
		} else {
			this.initWithUser({ type: linkRole });
		}
	}

	userGuardRedirect(user) {
		const linkRole = this.getLinkRole();
		if (user && (!linkRole || linkRole === user.type)) {
			this.initWithUser(user);
		} else if (linkRole === RoleType.Publisher || linkRole === RoleType.Attendee) {
			window.location.href = environment.url.access;
		} else {
			this.initWithUser({ type: linkRole });
		}
	}

	setNextStatus() {
		let status = AgoraStatus.Idle;
		const state = StateService.state;
		if (state.role === RoleType.SmartDevice) {
			state.name = state.name || 'Smart Device';
		}
		if (!state.checklist) {
			status = AgoraStatus.Checklist;
		} else if (!state.link) {
			status = AgoraStatus.Link;
		} else if (!state.user.id && (state.role === RoleType.Publisher || state.role === RoleType.Attendee)) {
			status = AgoraStatus.Login;
		} else if (!state.name) {
			status = AgoraStatus.Name;
		} else if (state.role !== RoleType.Viewer && state.role !== RoleType.SmartDevice) {
			status = AgoraStatus.Device;
		} else {
			status = AgoraStatus.ShouldConnect;
		}
		StateService.patchState({ status });
		return status;
	}

	initWithUser(user) {
		console.log('initWithUser', user);
		const link = LocationService.get('link') || null;
		const role = this.getLinkRole() || (user ? user.type : null);
		user = user || { type: role };
		if (role !== user.type) {
			user = { type: role };
		}
		const has3D = role !== RoleType.SmartDevice;
		const name = LocationService.get('name') || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
		const checklist = LocalStorageService.get('checklist') || null;
		const hosted = role === RoleType.Publisher ? true : false;
		const live = (DEBUG || role === RoleType.SelfService) ? false : true;
		const state = {
			user: user,
			role: role,
			has3D: has3D,
			name: name,
			checklist: checklist,
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
		this.initAgora();
		this.viewObserver$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(view => {
			// console.log('AgoraComponent.viewObserver$', view);
		});
	}

	viewObserver$() {
		return ViewService.data$().pipe(
			switchMap(data => {
				this.data = data;
				this.views = data.views.filter(x => x.type.name !== 'waiting-room');
				return ViewService.hostedView$(data);
			}),
			/*
			tap(view => {
				this.view = null;
				this.pushChanges();
			}),
			delay(1),
			*/
			tap(view => {
				// !!! move navToView to user action?
				if (this.agora) {
					this.agora.navToView(view.id);
				}
				this.view = view;
				this.pushChanges();
			}),
		);
	}

	initAgora() {
		let agora = null;
		if (DEBUG || this.state.role === RoleType.SelfService) {
			StateService.patchState({ status: AgoraStatus.Connected, hosted: true });
		} else {
			agora = this.agora = AgoraService.getSingleton();
			const role = this.getLinkRole();
			const status = this.setNextStatus();
			// console.log('initAgora', status, role);
		}
		StreamService.local$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(local => {
			// console.log('AgoraComponent.local', local);
			this.local = local;
			this.pushChanges();
		});
		StreamService.screen$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(screen => {
			// console.log('AgoraComponent.screen', screen);
			this.screen = screen;
			this.pushChanges();
		});
		StreamService.orderedRemotes$().pipe(
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
						screenUid: StateService.state.screenUid,
						control: StateService.state.control,
					};
					MessageService.sendBack(message);
					break;
				case MessageType.RequestControl:
					// console.log('AgoraComponent', 'MessageType.RequestControlAccepted');
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
					this.onRemoteNavTo(message);
					break;
				case MessageType.AddLike:
					ViewService.setViewLike$(message).pipe(
						first(),
					).subscribe(view => this.showLove(view));
					break;
				case MessageType.ChatMessage:
					if (!StateService.state.chat) {
						StateService.patchState({ chatDirty: true });
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

	onChecked(checklist) {
		// console.log('AgoraComponent.onChecked', checklist);
		StateService.patchState({ checklist: true });
		this.setNextStatus();
	}

	onLink(link) {
		const role = this.getLinkRole();
		const has3D = role !== RoleType.SmartDevice;
		const user = StateService.state.user;
		if ((role === RoleType.Publisher || role === RoleType.Attendee) && (!user.id || user.type !== role)) {
			StateService.patchState({ link, role, has3D, status: AgoraStatus.Login });
		} else if (StateService.state.name) {
			if (role === RoleType.Viewer || role === RoleType.SmartDevice) {
				StateService.patchState({ link, role, has3D });
				this.connect();
			} else {
				StateService.patchState({ link, role, has3D, status: AgoraStatus.Device });
			}
		} else {
			StateService.patchState({ link, role, has3D, status: AgoraStatus.Name });
		}
	}

	onLogin(user) {
		const name = StateService.state.name || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
		if (name) {
			StateService.patchState({ user, name, status: AgoraStatus.Device });
		} else {
			StateService.patchState({ user, status: AgoraStatus.Name });
		}
	}

	onName(name) {
		if (StateService.state.role === RoleType.Viewer || StateService.state.role === RoleType.SmartDevice) {
			StateService.patchState({ name });
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

	onNavTo(navItem) {
		const viewId = navItem.viewId;
		const view = this.data.views.find(x => x.id === viewId);
		if (view) {
			ViewService.action = { viewId, keepOrientation: navItem.keepOrientation };
		}
	}

	onRemoteNavTo(message) {
		const viewId = message.viewId;
		const gridIndex = message.gridIndex;
		if (viewId && ViewService.viewId !== viewId) {
			const view = this.data.views.find(x => x.id === viewId);
			if (view) {
				ViewService.action = { viewId, keepOrientation: message.keepOrientation };
				if (gridIndex != null && view instanceof PanoramaGridView) {
					view.index = gridIndex;
				}
			}
			// console.log('AgoraComponent.onRemoteNavTo', viewId, gridIndex);
		}
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

	toggleScreen() {
		if (this.agora) {
			this.agora.toggleScreen();
		} else {
			this.patchState({ screen: !this.state.screen });
		}
	}

	toggleVolume() {
		const volumeMuted = !this.state.volumeMuted;
		StateService.patchState({ volumeMuted })
	}

	toggleChat() {
		StateService.patchState({ chat: !this.state.chat, chatDirty: false });
	}

	onChatClose() {
		this.patchState({ chat: false });
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
				this.showLove(view);
				// this.view.likes = view.likes;
				// this.pushChanges();
				MessageService.send({
					type: MessageType.AddLike,
					viewId: this.view.id,
					likes: this.view.likes,
				});
			}
		});
	}

	showLove(view) {
		if (view && this.view.id === view.id) {
			const skipTimeout = this.view.showLove;
			this.view.likes = view.likes;
			this.view.showLove = true;
			this.pushChanges();
			if (!skipTimeout) {
				setTimeout(() => {
					this.view.showLove = false;
					this.pushChanges();
				}, 3100);
			}
		}
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
