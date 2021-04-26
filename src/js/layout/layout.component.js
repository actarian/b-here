import { Component, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AgoraStatus, UIMode } from '../agora/agora.types';
import { DEBUG, environment } from '../environment';
import { LanguageService } from '../language/language.service';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';

export default class LayoutComponent extends Component {

	get isVirtualTourUser() {
		return [RoleType.Publisher, RoleType.Attendee, RoleType.Streamer, RoleType.Viewer].indexOf(this.state.role) !== -1;
	}

	get isEmbed() {
		const isEmbed = window.location.href.indexOf(environment.url.embed) !== -1;
		return isEmbed;
	}

	get isNavigable() {
		const embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
		const navigable = embedViewId == null;
		return navigable;
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

	get controlled() {
		return (this.state.controlling && this.state.controlling !== this.state.uid);
	}

	get controlling() {
		return (this.state.controlling && this.state.controlling === this.state.uid);
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
		this.state = {
			status: LocationService.get('status') || AgoraStatus.Connected,
			role: LocationService.get('role') || RoleType.Publisher, // Publisher, Attendee, Streamer, Viewer, SmartDevice, SelfService, Embed
			membersCount: 3,
			controlling: false,
			spying: false,
			hosted: true,
			chat: false,
			chatDirty: true,
			name: "Jhon Appleseed",
			uid: "7341614597544882"
		};
		this.state.live = (this.state.role === RoleType.SelfService || this.state.role === RoleType.Embed || DEBUG) ? false : true;
		const embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
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
		console.log('LayoutComponent', this);
		// console.log(AgoraService.getUniqueUserId());
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

	onChatClose() {
		this.patchState({ chat: false });
		window.dispatchEvent(new Event('resize'));
	}

	onToggleControl(remoteId) {
		const controlling = this.state.controlling === remoteId ? null : remoteId;
		this.patchState({ controlling, spying: false });
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
