import { Component, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AgoraStatus, UIMode } from '../agora/agora.types';
import { DEBUG, environment } from '../environment';
import LabelPipe from '../label/label.pipe';
import { LanguageService } from '../language/language.service';
import LocationService from '../location/location.service';
import { MeetingUrl } from '../meeting/meeting-url';
import StateService from '../state/state.service';
import ToastService, { ToastPosition, ToastRejectEvent, ToastResolveEvent, ToastType } from '../toast/toast.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import VRService from '../world/vr.service';

export default class LayoutComponent extends Component {

	get meetingUrl() {
		if (!this.meetingUrl_) {
			this.meetingUrl_ = new MeetingUrl();
		}
		return this.meetingUrl_;
	}

	get isVirtualTourUser() {
		return [RoleType.Publisher, RoleType.Attendee, RoleType.Streamer, RoleType.Viewer].indexOf(this.state.role) !== -1;
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

	get showNavInfoToggler() {
		return environment.flags.hideNavInfo && this.state.mode !== UIMode.LiveMeeting;
	}

	get uiClass() {
		const uiClass = {};
		uiClass[this.state.role] = true;
		// uiClass[this.state.mode] = true;
		uiClass.chat = this.state.chat;
		uiClass.remotes = this.state.mode === UIMode.LiveMeeting;
		uiClass.remoteScreen = this.remoteScreen != null && !this.hasScreenViewItem;
		uiClass.media = !uiClass.remotes && this.media;
		uiClass.locked = this.locked;
		return uiClass;
	}

	get remoteClass() {
		return `group--remote--${Math.min(9, this.remotes.length)}`;
	}

	get controlled() {
		return (this.state.controlling && this.state.controlling !== this.state.uid);
	}

	get controlling() {
		return (this.state.controlling && this.state.controlling === this.state.uid);
	}

	get silencing() {
		return StateService.state.silencing;
	}

	get silenced() {
		return (StateService.state.silencing && StateService.state.role === RoleType.Streamer);
	}

	get spyed() {
		return (this.state.spying && this.state.spying === this.state.uid);
	}

	get spying() {
		return (this.state.spying && this.state.spying !== this.state.uid);
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
			window.dispatchEvent(new Event('resize'));
		}
	}

	onInit() {
		const meetingUrl = this.meetingUrl;
		const embedViewId = meetingUrl.embedViewId;
		this.state = {
			status: LocationService.get('status') || AgoraStatus.Connected,
			role: LocationService.get('role') || RoleType.Publisher, // Publisher, Attendee, Streamer, Viewer, SmartDevice, SelfService, Embed
			membersCount: 3,
			controlling: false,
			spying: false,
			silencing: false,
			hosted: true,
			chat: false,
			chatDirty: true,
			name: 'Jhon Appleseed',
			uid: '7341614597544882',
			showNavInfo: true,
		};
		this.state.live = (this.state.role === RoleType.SelfService || this.state.role === RoleType.Embed || DEBUG) ? false : true;
		this.state.navigable = embedViewId == null;
		this.state.mode = UserService.getMode(this.state.role);
		this.view = {
			likes: 41,
		};
		this.local = {};
		this.screen = null;
		this.remoteScreen_ = null;
		this.media = null;
		this.hasScreenViewItem = false;
		this.media = true;
		this.remotes = new Array(8).fill(0).map((x, i) => ({ id: i + 1, }));
		this.languageService = LanguageService;
		this.showLanguages = false;
		StateService.patchState(this.state);
		this.fullscreen$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
		const vrService = this.vrService = VRService.getService();
		console.log('LayoutComponent', this);
		// console.log(AgoraService.getUniqueUserId());

		setTimeout(() => {
			const type = ToastType.Dialog;
			const position = ToastPosition.BottomRight;
			switch (type) {
				case ToastType.Info:
					ToastService.open$({
						message: LabelPipe.transform('bhere_support_request_sent')
					}).pipe(
						takeUntil(this.unsubscribe$),
					).subscribe(event => {
						if (event instanceof ToastResolveEvent) {
							console.log('ToastResolveEvent', event);
						}
					});
					break;
				case ToastType.Alert:
					ToastService.open$({
						message: LabelPipe.transform('bhere_support_request_sent'),
						type: type, position: ToastPosition.BottomRight
					}).pipe(
						takeUntil(this.unsubscribe$),
					).subscribe(event => {
						if (event instanceof ToastResolveEvent) {
							console.log('ToastResolveEvent', event);
						} else if (event instanceof ToastRejectEvent) {
							console.log('ToastRejectEvent', event);
						}
					});
					break;
				case ToastType.Dialog:
					ToastService.open$({
						message: LabelPipe.transform('bhere_support_request_dialog'),
						acceptMessage: LabelPipe.transform('bhere_support_request_dialog_accept'),
						rejectMessage: LabelPipe.transform('bhere_support_request_dialog_reject'),
						type: type, position: ToastPosition.BottomRight
					}).pipe(
						takeUntil(this.unsubscribe$),
					).subscribe(event => {
						if (event instanceof ToastResolveEvent) {
							console.log('ToastResolveEvent', event);
						} else if (event instanceof ToastRejectEvent) {
							console.log('ToastRejectEvent', event);
						}
					});
					break;
			}
		}, 3000);
	}

	setLanguage(language) {
		this.languageService.setLanguage$(language).pipe(
			first(),
		).subscribe(_ => {
			this.showLanguages = false;
			this.pushChanges();
		});
	}

	toggleLanguages() {
		this.showLanguages = !this.showLanguages;
		this.pushChanges();
	}

	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.screen = this.state.screen || null;
		this.remoteScreen = this.screen;
		this.pushChanges();
	}

	toggleCamera() {
		this.patchState({ cameraMuted: !this.state.cameraMuted });
	}

	toggleAudio() {
		this.patchState({ audioMuted: !this.state.audioMuted });
	}

	toggleScreen() {
		this.patchState({ screen: !this.state.screen });
		window.dispatchEvent(new Event('resize'));
	}

	toggleVolume() {
		this.patchState({ volumeMuted: !this.state.volumeMuted });
	}

	toggleMode() {
		const mode = this.state.mode === UIMode.VirtualTour ? UIMode.LiveMeeting : UIMode.VirtualTour;
		this.patchState({ mode: mode });
		// this.pushChanges();
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
		// this.patchState({ fullScreen });
	}

	fullscreen$() {
		return fromEvent(document, 'fullscreenchange').pipe(
			tap(_ => {
				const fullScreen = document.fullscreenElement != null;
				// console.log('fullscreen$', fullScreen);
				this.patchState({ fullScreen });
			}),
		);
	}

	toggleChat() {
		this.patchState({ chat: !this.state.chat, chatDirty: false });
		window.dispatchEvent(new Event('resize'));
	}

	toggleNavInfo() {
		this.patchState({ showNavInfo: !this.state.showNavInfo });
	}

	onBack() {
		console.log('LayoutComponent.onBack');
	}

	onChatClose() {
		this.patchState({ chat: false });
		window.dispatchEvent(new Event('resize'));
	}

	onToggleControl(remoteId) {
		const controlling = this.state.controlling === remoteId ? null : remoteId;
		this.patchState({ controlling, spying: false });
	}

	onToggleSilence() {
		this.patchState({ silencing: !this.state.silencing });
	}

	onToggleSpy(remoteId) {
		const spying = this.state.spying === remoteId ? null : remoteId;
		this.patchState({ spying, controlling: false });
	}

	addLike() {
		this.view.liked = true; // view.liked;
		this.showLove(this.view);
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

	disconnect() {

	}
}

LayoutComponent.meta = {
	selector: '[layout-component]',
};
