import { Component, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import NavmapService from '../editor/navmap/navmap.service';
import PathService from '../editor/path/path.service';
import { DEBUG, environment } from '../environment';
import GtmService from '../gtm/gtm.service';
import LabelPipe from '../label/label.pipe';
import LocationService from '../location/location.service';
import { MeetingId } from '../meeting/meeting-id';
import { MeetingUrl } from '../meeting/meeting-url';
import MessageService from '../message/message.service';
import ModalService from '../modal/modal.service';
import StateService from '../state/state.service';
import StreamService from '../stream/stream.service';
import ToastService, { ToastPosition, ToastResolveEvent, ToastType } from '../toast/toast.service';
import TryInARModalComponent from '../try-in-ar/try-in-ar-modal.component';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { PanoramaGridView, ViewType } from '../view/view';
import ViewService from '../view/view.service';
import { WebhookService } from '../webhook/webhook.service';
import { WishlistService } from '../wishlist/wishlist.service';
import MediaLoader, { MediaLoaderDisposeEvent, MediaLoaderPauseEvent, MediaLoaderPlayEvent } from '../world/media/media-loader';
import ModelNavComponent from '../world/model/model-nav.component';
import VRService from '../world/vr.service';
import { AgoraChecklistService } from './agora-checklist.service';
import AgoraService from './agora.service';
import { AgoraStatus, MessageType, UIMode } from './agora.types';

export default class AgoraComponent extends Component {

	get meetingUrl() {
		if (!this.meetingUrl_) {
			this.meetingUrl_ = new MeetingUrl();
		}
		return this.meetingUrl_;
	}

	get isVirtualTourUser() {
		return [RoleType.Publisher, RoleType.Attendee, RoleType.Streamer, RoleType.Viewer].indexOf(StateService.state.role) !== -1;
	}

	get isEmbed() {
		const isEmbed = window.location.href.indexOf(environment.url.embed) !== -1;
		return isEmbed;
	}

	get isNavigable() {
		const embedViewId = this.meetingUrl.embedViewId;
		const navigable = embedViewId == null;
		return navigable;
	}

	get isBackButtonVisible() {
		return this.view && (this.view.type.name === ViewType.Media.name || this.view.type.name === ViewType.Model.name);
	}

	get isSelfServiceProposition() {
		return StateService.state.role === RoleType.SelfService && environment.flags.selfServiceProposition;
	}

	get isSelfServiceSupport() {
		return StateService.state.role === RoleType.Publisher && environment.flags.selfServiceProposition && this.meetingUrl.support;
	}

	get showNavInfoToggler() {
		return environment.flags.hideNavInfo && this.state.mode !== UIMode.LiveMeeting && this.view && ModelNavComponent.hasNavInfo(this.view);
	}

	get uiClass() {
		const uiClass = {};
		uiClass[this.state.role] = true;
		// uiClass[this.state.mode] = true;
		uiClass.chat = this.state.chat;
		uiClass.remotes = this.state.mode === UIMode.LiveMeeting;
		uiClass.remoteScreen = this.remoteScreen != null && !this.hasScreenViewItem;
		uiClass.locked = this.locked;
		// uiClass.media = !uiClass.remotes && this.media;
		return uiClass;
	}

	get remoteClass() {
		return `group--remote--${Math.min(9, this.remotes.length)}`;
	}

	get controlled() {
		return (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid);
	}

	get controlling() {
		return (StateService.state.controlling && StateService.state.controlling === StateService.state.uid);
	}

	get silencing() {
		return StateService.state.silencing;
	}

	get silenced() {
		return (StateService.state.silencing && StateService.state.role === RoleType.Streamer);
	}

	get spyed() {
		return (StateService.state.spying && StateService.state.spying === StateService.state.uid);
	}

	get spying() {
		return (StateService.state.spying && StateService.state.spying !== StateService.state.uid);
	}

	get locked() {
		return this.controlled || this.spying;
	}

	get remoteScreen() {
		return this.remoteScreen_;
	}
	set remoteScreen(remoteScreen) {
		if (this.remoteScreen_ !== remoteScreen) {
			this.remoteScreen_ = remoteScreen;
			setTimeout(() => {
				window.dispatchEvent(new Event('resize'));
			}, 1);
		}
	}

	get pathViews() {
		return ViewService.pathViews;
	}

	onInit() {
		console.log('onInit');
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.platform = DeviceService.platform;
		this.state = {};
		this.hosted = null;
		this.view = null;
		this.previousView = null;
		this.form = null;
		this.local = null;
		this.screen = null;
		this.remoteScreen_ = null;
		this.navmaps = [];
		this.navmap = null;
		// this.media = null;
		this.hasScreenViewItem = false;
		this.remotes = [];
		const vrService = this.vrService = VRService.getService();
		vrService.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => this.pushChanges());
		this.resolveUser();
	}

	getName(user) {
		return StateService.state.name || MeetingUrl.getName(user);
	}

	getLinkRole() {
		let linkRole = null;
		// console.log('getLinkRole', window.location, environment.url.selfServiceTour);
		if (window.location.pathname === environment.url.selfServiceTour) {
			linkRole = RoleType.SelfService;
			return linkRole;
		}
		/*
		const meetingUrl = this.meetingUrl;
		const meetingId = meetingUrl.meetingId;
		if (meetingId) {
			linkRole = meetingId.role;
		}
		*/
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
		if (this.isEmbed) {
			UserService.temporaryUser$(RoleType.Embed).pipe(
				first(),
			).subscribe(user => {
				this.initWithUser(user);
			});
		} else {
			UserService.me$().pipe(
				first(),
			).subscribe(user => {
				this.initWithUser(user);
				// this.userGuard(user);
			});
		}
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

	getPathId() {
		let pathId = LocationService.get('pathId') || null;
		if (pathId) {
			console.log('AgoraComponent.getPathId', pathId);
			return parseInt(pathId);
		}
		const link = LocationService.get('link') || null;
		if (link) {
			const meetingId = new MeetingId(link);
			pathId = meetingId.pathId;
		}
		console.log('AgoraComponent.getPathId', pathId);
		return pathId;
	}

	initWithUser(user) {
		// console.log('initWithUser', user);
		// const meetingUrl = this.meetingUrl;
		// const link = meetingUrl.link;
		const link = LocationService.get('link') || null;
		const pathId = this.getPathId();
		const role = this.getLinkRole() || (user ? user.type : null);
		switch (role) {
			case RoleType.SelfService:
				if (!user || (user.type !== RoleType.SelfService && user.type !== RoleType.Publisher)) {
					window.location.href = environment.url.access;
					return;
				} else {
					// forcing role type to RoleType.SelfService
					user = Object.assign({}, user, { type: RoleType.SelfService });
				}
				break;
			default:
				user = user || { type: role };
				if (role !== user.type) {
					user = { type: role };
				}
		}
		// console.log('initWithUser', role, user);
		const mode = UserService.getMode(role);
		const name = LocationService.get('name') || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null);
		// const name = meetingUrl.name || this.getName(user);
		const checklist = null;
		const hosted = role === RoleType.Publisher ? true : false;
		const live = (role === RoleType.SelfService || role === RoleType.Embed || DEBUG) ? false : true;
		const navigable = this.isNavigable;
		const state = {
			user: user,
			role: role,
			mode: mode,
			name: name,
			checklist: checklist,
			pathId: pathId,
			link: link,
			channelName: environment.channelName,
			uid: null,
			status: AgoraStatus.Idle,
			connecting: false,
			connected: false,
			controlling: false,
			spying: false,
			silencing: false,
			hosted: hosted,
			live: live,
			navigable: navigable,
			cameraMuted: false,
			audioMuted: false,
			showNavInfo: true,
		};
		StateService.state = state;
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.hosted = state.hosted;
			this.pushChanges();
			// console.log(state);
			this.locked ? document.body.classList.add('locked') : document.body.classList.remove('locked');
		});
		this.initAgora();
	}

	viewObserver$() {
		return ViewService.data$().pipe(
			switchMap(data => {
				console.log('AgoraComponent.viewObserver$', 'pathId', StateService.state.pathId);
				return PathService.getCurrentPath$(StateService.state.pathId).pipe(
					switchMap(path => {
						return ViewService.hostedView$(data, path);
					}),
				);
			}),
			/*
			tap(view => {
				this.view = null;
				this.pushChanges();
			}),
			delay(1),
			*/
			map((view) => {
				// console.log('AgoraComponent.viewObserver$', view);
				// !!! move navToView to user action?
				if (this.agora) {
					this.agora.navToView(view.id, view.keepOrientation, view.useLastOrientation);
				}
				this.previousView = this.view;
				this.view = view;
				this.setNavmap(view);
				this.hasScreenViewItem = view.items.find(x => MediaLoader.isPublisherScreen(x) || MediaLoader.isAttendeeScreen(x)) != null;
				this.pushChanges();
				return view;
			}),
		);
	}

	load(callback) {
		this.loadNavmaps();
		this.viewObserver$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(view => {
			// console.log('AgoraComponent.viewObserver$', view);
			if (typeof callback === 'function') {
				callback();
				callback = null;
			}
		});
	}

	loadNavmaps() {
		if (environment.flags.navmaps) {
			NavmapService.navmapGet$().pipe(
				first(),
			).subscribe(navmaps => {
				this.navmaps = navmaps;
			});
		}
	}

	setNavmap(view) {
		const navmaps = this.navmaps;
		const navmap = (navmaps || []).find(x => (x.items || []).find(i => i.viewId === view.id) != null) || null;
		// console.log('AgoraComponent.setNavmap', navmap);
		this.navmap = navmap;
	}

	toggleNavmap() {
		StateService.patchState({ showNavmap: !StateService.state.showNavmap });
	}

	onNavmapItem(item) {
		StateService.patchState({ showNavmap: false });
		this.onNavTo(item);
	}

	loadAndConnect(preferences) {
		this.load(() => {
			this.connect(preferences);
		});
	}

	initAgora() {
		let agora = null;
		if (this.state.role === RoleType.SelfService || this.state.role === RoleType.Embed || DEBUG) {
			this.load(() => {
				StateService.patchState({ status: AgoraStatus.Connected, hosted: true });
			});
			this.checkSelfServiceProposition();
			this.checkSelfServiceAudio();
		} else {
			AgoraChecklistService.isChecked$().pipe(
				first(),
			).subscribe(checked => {
				StateService.patchState({ checklist: checked });
				agora = this.agora = AgoraService.getSingleton();
				const role = this.getLinkRole();
				const status = this.setNextStatus();
				// console.log('initAgora', status, role);
			});
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
			if (this.screen === this.remoteScreen) {
				this.remoteScreen = null;
			}
			this.screen = screen;
			this.remoteScreen = screen || this.remoteScreen;
			this.pushChanges();
		});
		StreamService.orderedRemotes$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(remotes => {
			this.remotes = [];
			this.remoteScreen = this.screen;
			remotes.forEach(x => {
				if (x.clientInfo && x.clientInfo.screenUid === x.getId()) {
					this.remoteScreen = x;
				} else {
					this.remotes.push(x);
				}
			});
			// console.log('AgoraComponent.remotes', this.remotes, this.remoteScreen, remotes.map(x => `${x.clientInfo ? x.clientInfo.uid : 'null'}-${x.clientInfo ? x.clientInfo.screenUid : 'null'}`).join(','));
			this.pushChanges();
		});
		/*
		MediaLoader.events$.pipe(
			tap(event => {
				if (event instanceof MediaLoaderPlayEvent) {
					this.media = event.loader;
					// this.pushChanges();
				} else if (event instanceof MediaLoaderDisposeEvent) {
					if (this.media === event.loader) {
						this.media = null;
						// this.pushChanges();
					}
				}
				// console.log('AgoraComponent.MediaLoader.events$', event);
			}),
			takeUntil(this.unsubscribe$)
		).subscribe();
		*/
		MessageService.out$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			// console.log('AgoraComponent.message', message);
			switch (message.type) {
				case MessageType.ChannelMembers:
					if (this.isSelfServiceSupport) {
						const members = message.members;
						// console.log('AgoraComponent.MessageService.out$.ChannelMembers', members, members.length);
						if (members.length > 0) {
							ToastService.open$({
								message: LabelPipe.transform('bhere_support_request_sent'),
								type: ToastType.Alert, position: ToastPosition.BottomRight
							});
							MessageService.send({ type: MessageType.SupportRequest });
						} else {
							ToastService.open$({
								message: LabelPipe.transform('bhere_support_request_leaved'),
								type: ToastType.Alert, position: ToastPosition.BottomRight
							});
						}
					}
					break;
				case MessageType.SupportRequest:
					if (this.isSelfServiceProposition) {
						this.openSupportRequestDialog(message.clientInfo);
					}
					break;
				case MessageType.RequestPeerInfo:
					// console.log('AgoraComponent.MessageService.out$.RequestPeerInfo', message);
					message.type = MessageType.RequestPeerInfoResult;
					message.clientInfo = {
						role: StateService.state.role,
						name: StateService.state.name,
						uid: StateService.state.uid,
						screenUid: StateService.state.screenUid,
						controllingId: StateService.state.controlling,
						mode: StateService.state.mode,
					};
					MessageService.sendBack(message);
					/*
					if (this.isSelfServiceSupport) {
						this.meetingUrl.support = false; // !!! spostare su ChannelMembers
						ToastService.open$({
							message: LabelPipe.transform('bhere_support_request_sent'),
							type: ToastType.Alert, position: ToastPosition.BottomRight
						});
					}
					*/
					break;
				/*
			case MessageType.RequestPeerInfoResult:
				if (this.isSelfServiceProposition && message.clientInfo.role === RoleType.Publisher) {
					this.openSupportRequestDialog(message.clientInfo);
				}
				break;
				*/
				case MessageType.SupportRequestAccepted:
					ToastService.open$({
						message: LabelPipe.transform('bhere_support_request_accepted'),
						type: ToastType.Alert, position: ToastPosition.BottomRight
					});
					break;
				case MessageType.SupportRequestRejected:
					ToastService.open$({
						message: LabelPipe.transform('bhere_support_request_rejected'),
						type: ToastType.Alert, position: ToastPosition.BottomRight
					});
					break;
				case MessageType.RequestControl:
					// console.log('AgoraComponent', 'MessageType.RequestControlAccepted');
					message.type = MessageType.RequestControlAccepted;
					MessageService.sendBack(message);
					StateService.patchState({ controlling: message.controllingId });
					if (this.agora) {
						this.agora.sendControlRemoteRequestInfo(message.controllingId);
					}
					break;
				case MessageType.RemoteSilencing:
					StateService.patchState({ silencing: message.silencing });
					this.setAudio(message.silencing);
					break;
				case MessageType.NavToView:
					this.onRemoteNavTo(message);
					break;
				case MessageType.Mode:
					StateService.patchState({ mode: message.mode });
					window.dispatchEvent(new Event('resize'));
					break;
				case MessageType.NavInfo:
					this.hidePanels();
					StateService.patchState({ showNavInfo: message.showNavInfo });
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
			if (this.agora) {
				this.agora.sendMessage(message);
			}
		});
		this.fullscreen$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		if (this.agora && StateService.state.status === AgoraStatus.ShouldConnect) {
			this.loadAndConnect();
		}
	}

	onChecked(checklist) {
		// console.log('AgoraComponent.onChecked', checklist);
		StateService.patchState({ checklist: true });
		this.setNextStatus();
	}

	onLink(link) {
		const meetingId = new MeetingId(link);
		const pathId = meetingId.pathId;
		const role = this.getLinkRole();
		const mode = UserService.getMode(role);
		const user = StateService.state.user;
		if ((role === RoleType.Publisher || role === RoleType.Attendee) && (!user.id || user.type !== role)) {
			StateService.patchState({ link, pathId, role, mode, status: AgoraStatus.Login });
		} else if (StateService.state.name) {
			if (role === RoleType.Viewer || role === RoleType.SmartDevice) {
				StateService.patchState({ link, pathId, role, mode });
				this.loadAndConnect();
			} else {
				StateService.patchState({ link, pathId, role, mode, status: AgoraStatus.Device });
			}
		} else {
			StateService.patchState({ link, pathId, role, mode, status: AgoraStatus.Name });
		}
	}

	onLogin(user) {
		const name = this.getName(user);
		if (name) {
			StateService.patchState({ user, name, status: AgoraStatus.Device });
		} else {
			StateService.patchState({ user, status: AgoraStatus.Name });
		}
	}

	onName(name) {
		if (StateService.state.role === RoleType.Viewer || StateService.state.role === RoleType.SmartDevice) {
			StateService.patchState({ name });
			this.loadAndConnect();
		} else {
			StateService.patchState({ name, status: AgoraStatus.Device });
		}
	}

	onEnter(preferences) {
		this.loadAndConnect(preferences);
	}

	connect(preferences) {
		// console.log('AgoraComponent.connect', preferences);
		this.agora.connect$(preferences).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		// console.log('AgoraComponent.connect', this.state.role);
		if (this.state.role === RoleType.SelfService) {
			GtmService.push({
				action: 'b-here-tour',
				userType: this.state.role
			});
		} else if (this.state.role === RoleType.Embed) {
			GtmService.push({
				action: 'b-here-embed',
				userType: this.state.role
			});
		} else {
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
				// window.location.href = window.location.href;
				// window.location.replace(window.location.href);
				window.location.reload();
			}, console.log);
		} else {
			this.patchState({ connecting: false, connected: false });
		}
	}

	onNavTo(item) {
		const viewId = item.viewId;
		const view = this.pathViews.find(x => x.id === viewId);
		if (view) {
			// console.log('AgoraComponent.onNavTo', item, view);
			ViewService.action = { viewId, keepOrientation: item.keepOrientation, useLastOrientation: item.useLastOrientation };
			this.onHandleHook(view, item);
		}
	}

	onNavLink(item) {
		// console.log('AgoraComponent.onNavLink', item);
		ModalService.open$({ iframe: item.link.href }).pipe(
			first(),
		).subscribe(event => {
			MessageService.send({
				type: MessageType.NavLinkClose,
				itemId: item.id,
			});
		});
	}

	onRemoteNavTo(message) {
		const viewId = message.viewId;
		const gridIndex = message.gridIndex;
		if (viewId && ViewService.viewId !== viewId) {
			const view = this.pathViews.find(x => x.id === viewId);
			if (view) {
				// console.log('AgoraComponent.onRemoteNavTo', message, view);
				ViewService.action = { viewId, keepOrientation: message.keepOrientation, useLastOrientation: message.useLastOrientation };
				if (gridIndex != null && view instanceof PanoramaGridView) {
					view.index = gridIndex;
				}
			}
			// console.log('AgoraComponent.onRemoteNavTo', viewId, gridIndex);
		}
	}

	onHandleHook(view, item) {
		switch (item.hook) {
			case 'ToggleWishlist':
				const payload = { viewId: view.id, itemId: item.id };
				WishlistService.toggle$(payload).pipe(
					switchMap(items => {
						payload.added = WishlistService.has(payload);
						return WebhookService.send$(item.hook, payload, item.extra);
					}),
					first(),
				).subscribe(response => {
					console.log('AgoraComponent.onHandleHook', response);
					item.added = payload.added;
					this.pushChanges();
				});
				break;
		}
	}

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

	setAudio(audioMuted) {
		if (this.agora) {
			this.agora.setAudio(audioMuted);
		} else {
			this.patchState({ audioMuted });
		}
	}

	toggleScreen() {
		if (this.agora) {
			this.agora.toggleScreen();
		} else {
			this.patchState({ screen: !this.state.screen });
		}
		window.dispatchEvent(new Event('resize'));
	}

	toggleVolume() {
		const volumeMuted = !this.state.volumeMuted;
		StateService.patchState({ volumeMuted });
		const selfServiceAudio = this.selfServiceAudio;
		if (selfServiceAudio) {
			selfServiceAudio.volume = volumeMuted ? 0 : 0.5;
		}
	}

	toggleMode() {
		if (this.agora && StateService.state.role === RoleType.Publisher) {
			this.agora.toggleMode();
		} else {
			const mode = this.state.mode === UIMode.VirtualTour ? UIMode.LiveMeeting : UIMode.VirtualTour;
			StateService.patchState({ mode });
			// this.patchState({ mode });
		}
		window.dispatchEvent(new Event('resize'));
	}

	toggleFullScreen() {
		const { node } = getContext(this);
		const fullScreen = !this.state.fullScreen;
		if (fullScreen) {
			if (node.requestFullscreen) {
				node.requestFullscreen();
			} else if (node.webkitRequestFullscreen) {
				node.webkitRequestFullscreen();
			} else if (node.msRequestFullscreen) {
				node.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
		// StateService.patchState({ fullScreen });
	}

	fullscreen$() {
		return fromEvent(document, 'fullscreenchange').pipe(
			tap(_ => {
				const fullScreen = document.fullscreenElement != null;
				// console.log('fullscreen$', fullScreen);
				StateService.patchState({ fullScreen });
			}),
		);
	}

	toggleChat() {
		StateService.patchState({ chat: !StateService.state.chat, chatDirty: false });
		window.dispatchEvent(new Event('resize'));
	}

	onChatClose() {
		StateService.patchState({ chat: false });
		window.dispatchEvent(new Event('resize'));
	}

	toggleNavInfo() {
		this.hidePanels();
		if (this.agora) {
			this.agora.toggleNavInfo();
		} else {
			this.patchState({ showNavInfo: !this.state.showNavInfo });
		}
	}

	onBack() {
		// console.log('AgoraCompoent.onBack');
		if (this.previousView && this.view && this.previousView.id !== this.view.id) {
			ViewService.action = { viewId: this.previousView.id, useLastOrientation: true };
		}
	}

	hidePanels() {
		this.view.items.forEach(item => item.showPanel = false);
	}

	onToggleControl(remoteId) {
		if (this.agora) {
			this.agora.toggleControl(remoteId);
		} else {
			const controlling = this.state.controlling === remoteId ? null : remoteId;
			this.patchState({ controlling, spying: false });
		}
	}

	onToggleSilence() {
		if (this.agora) {
			this.agora.toggleSilence();
		} else {
			this.patchState({ silencing: !this.state.silencing });
		}
	}

	onToggleSpy(remoteId) {
		if (this.agora) {
			this.agora.toggleSpy(remoteId);
		} else {
			const spying = this.state.spying === remoteId ? null : remoteId;
			this.patchState({ spying, controlling: false });
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
				first(),
			).subscribe(event => {
				// this.pushChanges();
			});
		}
	}

	checkSelfServiceProposition() {
		// self service proposition
		const isSelfServiceProposition = this.isSelfServiceProposition;
		// console.log('AgoraComponent.initAgora', isSelfServiceProposition);
		if (isSelfServiceProposition) {
			AgoraChecklistService.check$().pipe(
				first(),
			).subscribe(event => {
				const meetingId = new MeetingId({ pathId: StateService.state.pathId });
				const meetingIdRoles = meetingId.toRoles();
				const meetingUrl = new MeetingUrl({ link: meetingIdRoles.id, support: true });
				const href = meetingUrl.toGuidedTourUrl();
				// console.log('AgoraComponent.initAgora.isSelfServiceProposition', href);
				UserService.selfServiceSupportRequest$(StateService.state.user, meetingIdRoles.id, href).pipe(
					first(),
				).subscribe(_ => {
					const name = this.getName(StateService.state.user);
					StateService.patchState({ checklist: true, link: meetingIdRoles.idSelfService, name });
					this.agora = AgoraService.getSingleton();
					this.connect();
				});
			}, error => {
				console.log('AgoraComponent.initAgora.isSelfServiceProposition.error', error, name);
				/*
				UserService.selfServiceTourSupportFailedRequest$(StateService.state.user).pipe(
					first(),
				).subscribe();
				*/
			});
		}
	}

	checkSelfServiceAudio() {
		if (StateService.state.role === RoleType.SelfService && environment.selfServiceAudio) {
			const selfServiceAudio = document.createElement('audio');
			selfServiceAudio.setAttribute('playsinline', 'true');
			selfServiceAudio.setAttribute('autoplay', 'true');
			selfServiceAudio.setAttribute('loop', 'true');
			selfServiceAudio.volume = 0.5;
			selfServiceAudio.src = environment.selfServiceAudio;
			const { node } = getContext(this);
			node.parentNode.appendChild(selfServiceAudio);
			this.selfServiceAudio = selfServiceAudio;
			MediaLoader.events$.pipe(
				tap(event => {
					// console.log('AgoraComponent.checkSelfServiceAudio MediaLoader.event$', event);
					if (event instanceof MediaLoaderPlayEvent) {
						selfServiceAudio.pause();
						// selfServiceAudio.volume = 0;
					} else if (event instanceof MediaLoaderPauseEvent || event instanceof MediaLoaderDisposeEvent) {
						selfServiceAudio.play();
						// selfServiceAudio.volume = 0.5;
					}
				}),
				takeUntil(this.unsubscribe$),
			).subscribe();
		}
	}

	openSupportRequestDialog(clientInfo) {
		ToastService.open$({
			message: LabelPipe.transform('bhere_support_request_dialog'),
			acceptMessage: LabelPipe.transform('bhere_support_request_dialog_accept'),
			rejectMessage: LabelPipe.transform('bhere_support_request_dialog_reject'),
			type: ToastType.Dialog, position: ToastPosition.BottomRight
		}).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ToastResolveEvent) {
				MessageService.send({ type: MessageType.SupportRequestAccepted });
				const name = StateService.state.name;
				const meetingId = new MeetingId(StateService.state.link);
				meetingId.role = RoleType.Streamer;
				const meetingUrl = new MeetingUrl({ link: meetingId.toString(), name });
				const href = meetingUrl.toGuidedTourUrl();
				setTimeout(() => {
					window.location.href = href;
				}, 1000);
			} else {
				MessageService.send({ type: MessageType.SupportRequestRejected });
			}
		});
		/*
		ModalService.open$({ src: environment.template.modal.supportRequest, data: clientInfo }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				MessageService.send({ type: MessageType.SupportRequestAccepted });
				const name = StateService.state.name;
				const meetingId = new MeetingId(StateService.state.link);
				meetingId.role = RoleType.Streamer;
				const meetingUrl = new MeetingUrl({ link: meetingId.toString(), name });
				const href = meetingUrl.toGuidedTourUrl();
				setTimeout(() => {
					window.location.href = href;
				}, 1000);
			} else {
				MessageService.send({ type: MessageType.SupportRequestRejected });
			}
		});
		*/
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
	template: /* html */`
	<div class="page">
		<!-- background -->
		<div class="background" [class]="{ 'background--image': ('background.image' | env), 'background--video': ('background.video' | env) }" *if="state.status != 'connected'">
			<img [src]="'background.image' | env" *if="'background.image' | env" />
			<video [src]="'background.video' | env" *if="'background.video' | env" oncanplay="this.muted = true; this.classList.add('ready');" playsinline autoplay muted loop></video>
		</div>
		<!-- Status Checklist -->
		<div class="ui ui--info ui--info-centered" *if="state.status == 'checklist'" [agora-checklist] (checked)="onChecked($event)"></div>
		<!-- Status Link -->
		<div class="ui ui--info ui--info-centered" *if="state.status == 'link'" [agora-link] (link)="onLink($event)"></div>
		<!-- Status Login -->
		<div class="ui ui--info ui--info-centered" *if="state.status == 'login'" [agora-login] (login)="onLogin($event)"></div>
		<!-- Status Name -->
		<div class="ui ui--info ui--info-centered" *if="state.status == 'name' || (state.status == 'disconnected' && state.role === 'viewer')" [agora-name] (name)="onName($event)"></div>
		<!-- Status Device -->
		<div class="ui ui--info" *if="state.status == 'device' || (state.status == 'disconnected' && state.role !== 'viewer')" [agora-device] (enter)="onEnter($event)"></div>
		${CHUNK_VIRTUAL_TOUR}
		${CHUNK_SMART_DEVICE}
		${CHUNK_SELF_SERVICE_TOUR}
		${CHUNK_EMBED}
		${CHUNK_LOGO}
		${CHUNK_CREDITS}
		${CHUNK_LANGUAGE}
	</div>
	`
};

const CHUNK_VIRTUAL_TOUR = /* html */`
<!-- Virtual Tour -->
<div class="ui virtual-tour" [class]="uiClass" *if="state.status == 'connected' && isVirtualTourUser">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="views" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	${CHUNK_REMOTE}
	<div class="group--header">
		${CHUNK_SERVICE}
		${CHUNK_LOCAL}
	</div>
	<div class="group--footer">
		${CHUNK_CONTROLS}
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
	${CHUNK_MEMBERS}
	${CHUNK_CHAT}
	${CHUNK_LOCK}
	${CHUNK_NAVMAP}
</div>
`;

const CHUNK_SMART_DEVICE = /* html */`
<!-- Smart Device -->
<div class="ui remotes" [class]="uiClass" *if="state.status == 'connected' && state.role == 'smart-device'">
	<div class="ui__body"></div>
	<!-- remote sidebar -->
	<div class="group--remote" [class]="'group--remote--' + remotes.length" *if="state.live">
		<div class="agora-stream" (toggleSpy)="onToggleSpy($event)" agora-stream [stream]="remote" type="remote" *for="let remote of remotes">
			<div class="agora-stream__player"></div>
			<div class="agora-stream__info">
				<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
				<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
				<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			</div>
		</div>
	</div>
	<!-- remote screen -->
	<div class="group--remote-screen" *if="remoteScreen && !hasScreenViewItem">
		<div class="agora-stream" agora-stream [stream]="remoteScreen" type="remote">
			<div class="agora-stream__player"></div>
			<div class="agora-stream__info">
				<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			</div>
		</div>
	</div>
	<div class="group--header">
		${CHUNK_LOCAL_SMART_DEVICE}
	</div>
	<div class="group--footer">
		${CHUNK_CONTROLS_SMART_DEVICE}
	</div>
	${CHUNK_MEMBERS_SMART_DEVICE}
</div>
`;

const CHUNK_SELF_SERVICE_TOUR = /* html */`
<!-- Self Service Tour -->
<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'self-service-tour'">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="views" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	<div class="group--header">
		${CHUNK_SERVICE}
	</div>
	<div class="group--footer">
		<div class="group--spacer"></div>
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
	${CHUNK_NAVMAP}
</div>
`;

const CHUNK_EMBED = /* html */`
<!-- Embed -->
<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'embed'">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="views" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	<div class="group--header">
		${CHUNK_SERVICE}
	</div>
	<div class="group--footer">
		<div class="group--spacer"></div>
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
</div>
`;

const CHUNK_REMOTE = /* html */`
<!-- remote sidebar -->
<div class="group--remote" [class]="'group--remote--' + remotes.length" *if="state.live">
	<div class="agora-stream" (toggleControl)="onToggleControl($event)" (toggleSpy)="onToggleSpy($event)" agora-stream [stream]="remote" type="remote" *for="let remote of remotes">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info" [class]="{ spyed: state.spying == streamId, controlling: state.controlling == streamId }">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
			<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			<button type="button" class="btn--control" [title]="'title_control' | label" (click)="onToggleControl(streamId)" *if="state.role === 'publisher'">
				<svg class="control" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
			</button>
			<button type="button" class="btn--spy" [title]="'title_spy' | label" (click)="onToggleSpy(streamId)" *if="state.role === 'publisher'">
				<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#spy"></use></svg>
			</button>
		</div>
	</div>
	<div class="group--members" *if="state.mode == 'virtual-tour'">
		<div class="members">
			<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
			<span class="members__count" [innerHTML]="state.membersCount"></span>
		</div>
		<div class="credits">
			<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
				<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
			</a>
		</div>
	</div>
</div>
<!-- remote screen -->
<div class="group--remote-screen" *if="remoteScreen">
	<div class="agora-stream" agora-stream [stream]="remoteScreen" type="remote">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
		</div>
	</div>
</div>
`;

const CHUNK_SERVICE = /* html */`
<!-- service -->
<div class="group--service">
	<button type="button" class="btn--back" [title]="'title_back' | label" (click)="onBack($event)" *if="isBackButtonVisible">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#arrow-prev"></use></svg>
	</button>
	<button type="button" class="btn--view-mode" [title]="'title_view_mode' | label" (click)="toggleMode($event)" *if="state.mode != 'embed'">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.mode == 'virtual-tour'"><use xlink:href="#live-meeting"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.mode == 'live-meeting'"><use xlink:href="#virtual-tour"></use></svg>
	</button>
	<button type="button" class="btn--volume" [title]="'title_volume' | label" [class]="{ muted: state.volumeMuted }" (click)="toggleVolume($event)">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.volumeMuted"><use xlink:href="#volume-on"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.volumeMuted"><use xlink:href="#volume-off"></use></svg>
	</button>
	<button type="button" class="btn--fullscreen" [title]="'title_fullscreen' | label" [class]="{ muted: state.fullScreen }" (click)="toggleFullScreen($event)">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.fullScreen"><use xlink:href="#fullscreen-on"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.fullScreen"><use xlink:href="#fullscreen-off"></use></svg>
	</button>
	<button type="button" class="btn--navmap" [title]="'title_navmap' | label" [class]="{ active: state.showNavmap }" (click)="toggleNavmap($event)" *if="navmap && state.mode != 'live-meeting'">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#navmap"></use></svg>
	</button>
</div>
`;

const CHUNK_LOCAL = /* html */`
<!-- local streams -->
<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
	<button type="button" class="btn--silence" [title]="'title_silence' | label" [class]="{ active: state.silencing }" (click)="onToggleSilence()" *if="state.role === 'publisher'">
		<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
	</button>
	<button type="button" class="btn--control" [title]="'title_control' | label" [class]="{ active: state.controlling == state.uid }" (click)="onToggleControl(state.uid)" *if="state.role == 'publisher'">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
	</button>
	<div class="agora-stream" *if="!local"></div>
	<div class="agora-stream" agora-stream [stream]="local" type="local" *if="local">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
		</div>
	</div>
	<div class="agora-stream agora-stream--screen" agora-stream [stream]="screen" type="local" *if="screen && hasScreenViewItem">
		<div class="agora-stream__player"></div>
	</div>
</div>
`;

const CHUNK_LOCAL_SMART_DEVICE = /* html */`
<!-- local streams -->
<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
	<div class="agora-stream" agora-stream [stream]="local" type="local" *if="local">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
		</div>
	</div>
</div>
`;

const CHUNK_CONTROLS = /* html */`
<!-- controls -->
<div class="group--controls" *if="state.live">
	<div class="group--actions">
		<button type="button" class="btn--call" [title]="'title_disconnect' | label" (click)="disconnect()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#call"></use></svg>
		</button>
		<button type="button" class="btn--cam" [title]="'title_mute_camera' | label" [class]="{ muted: state.cameraMuted, disabled: !local }" (click)="toggleCamera()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam"></use></svg>
		</button>
		<button type="button" class="btn--mic" [title]="'title_mute_mic' | label" [class]="{ muted: state.audioMuted, disabled: !local || silenced }" (click)="toggleAudio()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic"></use></svg>
		</button>
		<button type="button" class="btn--screen" [title]="'title_share_screen' | label" [class]="{ active: screen }" (click)="toggleScreen()" *if="state.role == 'publisher' || state.role == 'attendee' || controlling">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#screen"></use></svg>
		</button>
		<button type="button" class="btn--chat" [title]="'title_chat' | label" [class]="{ active: state.chatDirty }" (click)="toggleChat()" *if="('chat' | flag)">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#chat"></use></svg>
		</button>
		<button type="button" class="btn--navinfo" [title]="'title_navinfo' | label" [class]="{ active: state.showNavInfo }" (click)="toggleNavInfo()" *if="('hideNavInfo' | flag)">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#navinfo"></use></svg>
		</button>
	</div>
</div>
`;

const CHUNK_CONTROLS_SMART_DEVICE = /* html */`
<!-- controls -->
<div class="group--controls" *if="state.live">
	<div class="group--actions">
		<button type="button" class="btn--call" [title]="'title_disconnect' | label" (click)="disconnect()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#call"></use></svg>
		</button>
		<button type="button" class="btn--cam" [title]="'title_mute_camera' | label" [class]="{ muted: state.cameraMuted, disabled: !local }" (click)="toggleCamera()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam"></use></svg>
		</button>
		<button type="button" class="btn--mic" [title]="'title_mute_mic' | label" [class]="{ muted: state.audioMuted, disabled: !local || silenced }" (click)="toggleAudio()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic"></use></svg>
		</button>
	</div>
</div>
`;

const CHUNK_MEMBERS = /* html */`
<!-- members -->
<div class="group--members" *if="state.mode == 'live-meeting'">
	<div class="members">
		<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
		<span class="members__count" [innerHTML]="state.membersCount"></span>
	</div>
	<div class="credits">
		<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
			<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
		</a>
	</div>
</div>
`;

const CHUNK_MEMBERS_SMART_DEVICE = /* html */`
<!-- members -->
<div class="group--members">
	<div class="members">
		<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
		<span class="members__count" [innerHTML]="state.membersCount"></span>
	</div>
	<div class="credits">
		<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
			<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
		</a>
	</div>
</div>
`;

const CHUNK_MEDIA = /* html */`
<!-- media -->
<div class="group--media" media-player>
	<button type="button" class="btn--play" [title]="'title_play' | label" (click)="onPlay()" *if="!playing">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#play"></use></svg>
	</button>
	<button type="button" class="btn--pause" [title]="'title_pause' | label" (click)="onPause()" *if="playing">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#pause"></use></svg>
	</button>
	<div class="track" (click)="onTrack($event)">
		<div class="track__progress" [style]="{ transform: 'scale(' + this.progress + ', 1)'}"></div>
	</div>
</div>
`;

const CHUNK_AR_VR = /* html */`
<!-- ar-vr -->
<div class="group--ar-vr">
	<button type="button" class="btn--ar" [title]="'title_ar' | label" [href]="view?.ar" (click)="tryInAr()" *if="view?.ar">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#ar"></use></svg> <span>Try in AR</span>
	</button>
	<button type="button" class="btn--vr" [title]="'title_vr' | label" [class]="{ disabled: vrService.isDisabled() }" (click)="vrService.toggleVR()">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#vr"></use></svg> <span [innerHTML]="vrService.getLabel()"></span>
	</button>
</div>
`;

const CHUNK_LIKE = /* html */`
<!-- like -->
<div class="group--heart" *if="view && ('like' | flag)">
	<svg class="love" [class]="{ active: view.showLove }" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#heart"></use></svg>
	<button type="button" class="btn--heart" [class]="{ active: view.showLove }" (click)="addLike($event)">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#heart"></use></svg>
		<span class="badge" [innerHTML]="view.likes" *if="view.likes"></span>
	</button>
</div>
<div class="group--spacer" *if="!view || !('like' | flag)"></div>
`;

const CHUNK_CHAT = /* html */`
<!-- chat -->
<div class="group--chat" *if="state.chat" agora-chat (close)="onChatClose()"></div>
`;

const CHUNK_LOCK = /* html */`
<!-- lock -->
<div class="ui__lock" [class]="{ spying: spying }" *if="locked || controlling"></div>
`;

const CHUNK_NAVMAP = /* html */`
<!-- navmap -->
<div class="group--navmap" *if="navmap && state.showNavmap && state.mode != 'live-meeting'">
	<img draggable="false" [src]="navmap.asset | asset" *if="navmap.asset" />
	<div class="navmap__item" [style]="{ left: item.position[0] * 100 + '%', top: item.position[1] * 100 + '%' }" (click)="onNavmapItem(item)" *for="let item of navmap.items">
		<img draggable="false" [src]="'textures/ui/nav-point.png' | asset" />
		<div class="title" [innerHTML]="item.title"></div>
	</div>
</div>
`;

const CHUNK_LOGO = /* html */`
<!-- logo -->
<a class="btn--logo" [href]="'index' | slug" *if="state.status != 'connected'">
	<img [src]="'logo' | env" *if="'logo' | env" />
	<svg viewBox="0 0 270 98" *if="!('logo' | env)"><use xlink:href="#b-here"></use></svg>
</a>
`;

const CHUNK_CREDITS = /* html */`
<!-- credits -->
<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener" *if="state.status != 'connected'">
	<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
</a>
`;

const CHUNK_LANGUAGE = /* html */`
<!-- language -->
<div class="group--language" language (set)="pushChanges()" *if="state.status != 'connected'"></div>
`;
