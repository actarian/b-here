import { Component, getContext } from 'rxcomp';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';

export default class LayoutComponent extends Component {

	get uiClass() {
		const uiClass = {};
		uiClass[this.state.role] = true;
		uiClass.chat = this.state.chat;
		return uiClass;
	}

	onInit() {
		this.env = environment;
		this.state = {
			status: LocationService.get('status') || 'connected',
			role: LocationService.get('role') || 'publisher',
			membersCount: 1,
			live: true,
			chat: false,
			chatDirty: true,
			name: "Jhon Appleseed",
			uid: "7341614597544882"
		};
		this.state.has3D = this.state.role !== RoleType.SmartDevice;
		this.view = {
			likes: 41,
		};
		this.local = {};
		this.screen = null;
		this.remotes = new Array(8).fill(0).map((x, i) => ({ id: i + 1, }));
		StateService.patchState(this.state);
		console.log('LayoutComponent', this);
		// console.log(AgoraService.getUniqueUserId());
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
		this.patchState({ fullScreen });
	}

	toggleChat() {
		this.patchState({ chat: !this.state.chat, chatDirty: false });
		window.dispatchEvent(new Event('resize'));
	}

	onChatClose() {
		this.patchState({ chat: false });
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
