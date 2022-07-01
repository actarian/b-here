import { Component, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CHUNK_AR_VR, CHUNK_BACKGROUND, CHUNK_CHAT, CHUNK_CONTROLS, CHUNK_LIKE, CHUNK_LOCK, CHUNK_MEDIA, CHUNK_NAVMAP } from '../agora/agora.component.chunks';
import { AgoraStatus, UIMode } from '../agora/agora.types';
import { DEBUG, environment } from '../environment';
import { LabelPipe } from '../label/label.pipe';
import { LanguageService } from '../language/language.service';
import LocationService from '../location/location.service';
import { MeetingUrl } from '../meeting/meeting-url';
import { RouterOutletStructure } from '../router/router-outlet.structure';
import StateService from '../state/state.service';
import ToastService, { ToastPosition, ToastRejectEvent, ToastResolveEvent, ToastType } from '../toast/toast.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { ViewType } from '../view/view';
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
		if (this.route) {
			return this.route.params.mode === 'embed';
		}
	}

	get isSelfServiceTour() {
		if (this.route) {
			return this.route.params.mode === 'selfServiceTour';
		}
	}

	get isNavigable() {
		const embedViewId = this.meetingUrl.embedViewId;
		const navigable = embedViewId == null;
		return navigable;
	}

	get isBackButtonVisible() {
		return this.view && (this.view.type.name === ViewType.Media.name || this.view.type.name === ViewType.Model.name);
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
			type: {
				id: 2,
				name: 'panorama'
			}
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
	hosts: { host: RouterOutletStructure },
	template: /* html */`
	<div class="page page--agora">
		${CHUNK_BACKGROUND}
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
		<!-- Virtual Tour -->
		<div class="ui virtual-tour" [class]="uiClass" *if="state.status == 'connected' && isVirtualTourUser">
			<!-- world -->
			<div class="ui__body">
				<div class="world"></div>
			</div>
			<!-- remote sidebar -->
			<div class="group--remote" [class]="remoteClass" *if="state.live">
				<div class="agora-stream" *for="let remote of remotes">
					<div class="agora-stream__player"></div>
					<div class="agora-stream__info" [class]="{ spyed: state.spying == remote.id, controlling: state.controlling == remote.id }">
						<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
						<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
						<div class="id">name</div>
						<button type="button" class="btn--control" [title]="'title_control' | label" (click)="onToggleControl(remote.id)" *if="state.role === 'publisher'">
							<svg class="control" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
						</button>
						<button type="button" class="btn--spy" [title]="'title_spy' | label" (click)="onToggleSpy(remote.id)" *if="state.role === 'publisher'">
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
				<div class="agora-stream">
					<div class="agora-stream__player"></div>
					<div class="agora-stream__info">
						<div class="id">name</div>
					</div>
				</div>
			</div>
			<div class="group--header">
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
				<!-- local streams -->
				<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
					<button type="button" class="btn--silence" [title]="'title_silence' | label" [class]="{ active: state.silencing }" (click)="onToggleSilence()" *if="state.role === 'publisher'">
						<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
					</button>
					<button type="button" class="btn--control" [title]="'title_control' | label" [class]="{ active: state.controlling == state.uid }" (click)="onToggleControl(state.uid)" *if="state.role == 'publisher'">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
					</button>
					<div class="agora-stream" *if="!local"></div>
					<div class="agora-stream" *if="local">
						<div class="agora-stream__player"></div>
						<div class="agora-stream__info">
							<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
							<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
						</div>
					</div>
					<div class="agora-stream agora-stream--screen" *if="screen">
						<div class="agora-stream__player"></div>
					</div>
				</div>
			</div>
			<div class="group--footer">
				${CHUNK_CONTROLS}
				${CHUNK_MEDIA}
				${CHUNK_AR_VR}
				${CHUNK_LIKE}
			</div>
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
			${CHUNK_CHAT}
			${CHUNK_LOCK}
			${CHUNK_NAVMAP}
		</div>
		<!-- Smart Device -->
		<div class="ui remotes" [class]="uiClass" *if="state.status == 'connected' && state.role == 'smart-device'">
			<!-- world -->
			<div class="ui__body">
			</div>
			<!-- remote sidebar -->
			<div class="group--remote" [class]="remoteClass" *if="state.live">
				<div class="agora-stream" *for="let remote of remotes">
					<div class="agora-stream__player"></div>
					<div class="agora-stream__info">
						<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
						<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
						<div class="id">name</div>
						<button type="button" class="btn--spy" [title]="'title_spy' | label" *if="state.role === 'publisher'" (click)="onToggleSpy(remote.id)">
							<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#spy"></use></svg>
						</button>
					</div>
				</div>
			</div>
			<!-- remote screen -->
			<div class="group--remote-screen" *if="remoteScreen">
				<div class="agora-stream">
					<div class="agora-stream__player"></div>
					<div class="agora-stream__info">
						<div class="id">name</div>
					</div>
				</div>
			</div>
			<!-- local streams -->
			<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
				<div class="agora-stream" *if="local">
					<div class="agora-stream__player"></div>
					<div class="agora-stream__info">
						<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
						<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
					</div>
				</div>
			</div>
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
					<button type="button" class="btn--screen" [title]="'title_share_screen' | label" [class]="{ active: screen }" (click)="toggleScreen()" *if="('screenShare' | flag) && (state.role == 'publisher' || state.role == 'attendee' || controlling)">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#screen"></use></svg>
					</button>
					<button type="button" class="btn--chat" [title]="'title_chat' | label" [class]="{ active: state.chatDirty }" (click)="toggleChat()" *if="('chat' | flag)">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#chat"></use></svg>
					</button>
					<button type="button" class="btn--navinfo" [title]="'title_navinfo' | label" [class]="{ active: state.showNavInfo }" (click)="toggleNavInfo()" *if="showNavInfoToggler">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#navinfo"></use></svg>
					</button>
				</div>
			</div>
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
		</div>
		<!-- Self Service Tour -->
		<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'self-service-tour'">
			<!-- world -->
			<div class="ui__body">
				<div class="world"></div>
			</div>
			<!-- service -->
			<div class="group--service">
				<button type="button" class="btn--volume" [title]="'title_volume' | label" [class]="{ muted: state.volumeMuted }" (click)="toggleVolume($event)">
					<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.volumeMuted"><use xlink:href="#volume-on"></use></svg>
					<svg width="24" height="24" viewBox="0 0 24 24" *if="state.volumeMuted"><use xlink:href="#volume-off"></use></svg>
				</button>
				<button type="button" class="btn--fullscreen" [title]="'title_fullscreen' | label" [class]="{ muted: state.fullScreen }" (click)="toggleFullScreen($event)">
					<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.fullScreen"><use xlink:href="#fullscreen-on"></use></svg>
					<svg width="24" height="24" viewBox="0 0 24 24" *if="state.fullScreen"><use xlink:href="#fullscreen-off"></use></svg>
				</button>
			</div>
			${CHUNK_AR_VR}
			${CHUNK_LIKE}
		</div>
		<!-- Embed -->
		<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'embed'">
			<!-- world -->
			<div class="ui__body">
				<div class="world"></div>
			</div>
			<!-- service -->
			<div class="group--service">
				<button type="button" class="btn--volume" [title]="'title_volume' | label" [class]="{ muted: state.volumeMuted }" (click)="toggleVolume($event)">
					<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.volumeMuted"><use xlink:href="#volume-on"></use></svg>
					<svg width="24" height="24" viewBox="0 0 24 24" *if="state.volumeMuted"><use xlink:href="#volume-off"></use></svg>
				</button>
				<button type="button" class="btn--fullscreen" [title]="'title_fullscreen' | label" [class]="{ muted: state.fullScreen }" (click)="toggleFullScreen($event)">
					<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.fullScreen"><use xlink:href="#fullscreen-on"></use></svg>
					<svg width="24" height="24" viewBox="0 0 24 24" *if="state.fullScreen"><use xlink:href="#fullscreen-off"></use></svg>
				</button>
			</div>
			${CHUNK_AR_VR}
			${CHUNK_LIKE}
		</div>
		<a class="btn--logo" [routerLink]="':lang.access' | route" *if="state.status != 'connected'">
			<img [src]="'logo' | env" *if="'logo' | env" />
			<svg viewBox="0 0 270 98" *if="!('logo' | env)"><use xlink:href="#b-here"></use></svg>
		</a>
		<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener" *if="state.status != 'connected'">
			<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
		</a>
		<div class="group--language" language *if="state.status != 'connected'"></div>
	</div>
	`
};
