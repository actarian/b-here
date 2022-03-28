import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import StateService from '../state/state.service';
import { AgoraMuteAudioEvent, AgoraMuteVideoEvent, AgoraUnmuteAudioEvent, AgoraUnmuteVideoEvent, MessageType } from './agora.types';

export default class AgoraStreamComponent extends Component {

	set videoMuted(videoMuted) {
		if (this.videoMuted_ !== videoMuted) {
			this.videoMuted_ = videoMuted;
			const { node } = getContext(this);
			videoMuted ? node.classList.add('video--muted') : node.classList.remove('video--muted');
		}
	}

	set audioMuted(audioMuted) {
		if (this.audioMuted_ !== audioMuted) {
			this.audioMuted_ = audioMuted;
			const { node } = getContext(this);
			audioMuted ? node.classList.add('audio--muted') : node.classList.remove('audio--muted');
		}
	}

	get streamId() {
		return this.streamId_;
	}

	set streamId(streamId) {
		this.streamId_ = streamId;
	}

	get stream() {
		return this.stream_;
	}

	set stream(stream) {
		if (this.stream_ !== stream) {
			// console.log('AgoraStreamComponent set stream', stream);
			const { node } = getContext(this);
			const player = this.player = node.querySelector('.agora-stream__player');
			while (player.childElementCount > 0) {
				player.removeChild(player.firstElementChild);
			}
			// player.textContent = '';
			// !!!
			if (this.stream_ && this.stream_.isPlaying() && this.stream_.player.div.parentNode === player) {
				console.log('AgoraStreamComponent stopping stream', this.stream_.getId(), 'on', this.stream_.player.div.parentNode);
				this.stream_.stop();
			}
			this.stream_ = stream;
			if (stream) {
				this.videoMuted = stream.userMuteVideo;
				this.audioMuted = stream.userMuteAudio;
			}
			const streamId = stream ? stream.getId() : null;
			this.streamId = streamId;
			// console.log('AgoraStreamComponent streamId', streamId);
			if (streamId) {
				// const name = `stream-${node.getAttribute('type')}-${streamId}`;
				const name = `stream-${streamId}`;
				player.setAttribute('id', name);
				const self = this;
				if (stream.isPlaying()) {
					player.appendChild(stream.player.div);
				} else {
					this.shouldUseResumeGesture = false;
					stream.play(name, { fit: 'cover' }, (error) => {
						if (error && error.status !== 'aborted') {
							// The playback fails, probably due to browser policy. You can resume the playback by user gesture.
							self.shouldUseResumeGesture = true;
							self.pushChanges();
						}
					});
				}
			} else {
				player.removeAttribute('id');
			}
		}
	}

	set vrContainer(vrContainer) {
		if (this.vrContainer_ !== vrContainer) {
			this.vrContainer_ = vrContainer;
			if (vrContainer) {
				this.stream_.vrContainer = vrContainer;
				this.player.appendChild(vrContainer);
			} else if (this.stream_.vrContainer && this.stream_.vrContainer.parentNode) {
				this.stream_.vrContainer.parentNode.removeChild(this.stream_.vrContainer);
				this.stream_.vrContainer = null;
			}
		}
	}

	get videoNode() {
		let videoNode = this.videoNode_;
		if (!videoNode) {
			const player = getContext(this).node.querySelector('.agora-stream__player');
			videoNode = document.createElement('video');
			this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
			videoNode.addEventListener('loadedmetadata', this.onLoadedMetadata);
			player.appendChild(videoNode);
			this.videoNode_ = videoNode;
		}
		return videoNode;
	}

	onInit() {
		this.videoMuted = false;
		this.audioMuted = false;
		this.shouldUseResumeGesture = false;
		this.state = {};
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.pushChanges();
			// console.log('AgoraStreamComponent.StateService.state$', this.streamId, state);
		});
		MessageService.out$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			// console.log('AgoraStreamComponent.MessageService.out$', this.streamId, message);
			switch (message.type) {
				case MessageType.AgoraEvent:
					const event = message.event;
					// console.log('AgoraStreamComponent.AgoraEvent', message.event);
					if (this.streamId && event.streamId === this.streamId) {
						if (event instanceof AgoraMuteVideoEvent) {
							this.videoMuted = true;
						}
						if (event instanceof AgoraUnmuteVideoEvent) {
							this.videoMuted = false;
						}
						if (event instanceof AgoraMuteAudioEvent) {
							this.audioMuted = true;
						}
						if (event instanceof AgoraUnmuteAudioEvent) {
							this.audioMuted = false;
						}
					}
					break;
				case MessageType.VRStarted:
					// console.log('AgoraStreamComponent.VRStarted', this.streamId, message.clientId, message.container);
					if (this.streamId === message.clientId) {
						this.vrContainer = message.container;
					}
					break;
				case MessageType.VREnded:
					// console.log('AgoraStreamComponent.VREnded', this.streamId, message.clientId);
					if (this.streamId === message.clientId) {
						this.vrContainer = null;
					}
					break;
			}
		});
	}

	setMediaStream(mediaStream) {
		const videoNode = this.videoNode;
		if ('srcObject' in videoNode) {
			videoNode.srcObject = mediaStream;
		} else {
			videoNode.src = mediaStream ? window.URL.createObjectURL(mediaStream) : null;
		}
	}

	onLoadedMetadata(event) {
		// console.log('AgoraStreamComponent.onLoadedMetadata', event);
		this.videoNode.play().then(success => {
			// console.log('AgoraStreamComponent.play.success', success);
		}, error => {
			console.log('AgoraStreamComponent.play.error', error);
		});
	}

	onToggleControl($event) {
		this.toggleControl.next($event);
	}

	onToggleSpy($event) {
		this.toggleSpy.next($event);
	}
}

AgoraStreamComponent.meta = {
	selector: '[agora-stream]',
	outputs: ['toggleControl', 'toggleSpy'],
	inputs: ['stream'],
};
