import { Component } from 'rxcomp';
import { environment } from '../environment';

export default class LayoutComponent extends Component {

	onInit() {
		this.env = environment;
		this.state = {
			status: 'connected',
			role: 'publisher',
			membersCount: 1,
			live: true,
		};
		this.view = {
			likes: 41,
		};
		this.local = {};
		this.screen = {};
		this.remotes = new Array(8).fill(0).map((x, i) => ({ id: i + 1, }));
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
