import { Component, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AgoraStatus } from '../agora/agora.types';
import { DEBUG } from '../environment';
import { LanguageService } from '../language/language.service';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';

export default class LayoutComponent extends Component {

	get uiClass() {
		const uiClass = {};
		uiClass[this.state.role] = true;
		uiClass.chat = this.state.chat;
		return uiClass;
	}

	onInit() {
		this.state = {
			status: LocationService.get('status') || AgoraStatus.Connected,
			role: LocationService.get('role') || RoleType.Embed, // Publisher, Attendee, Streamer, Viewer, SmartDevice, SelfService, Embed
			membersCount: 3,
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
				console.log('fullscreen$', fullScreen);
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

	onToggleControl() {
		this.patchState({ control: !this.state.control, spying: false });
	}

	onToggleSpy(remoteId) {
		const spying = this.state.spying === remoteId ? null : remoteId;
		this.patchState({ spying, control: false });
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
