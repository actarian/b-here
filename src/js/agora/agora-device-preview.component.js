import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import AudioStreamService from '../audio/audio-stream.service';
import { DevicePlatform, DeviceService } from '../device/device.service';
import StateService from '../state/state.service';
import { getStreamQuality } from './agora.types';

export default class AgoraDevicePreviewComponent extends Component {

	get video() {
		return this.video_;
	}

	set video(video) {
		if (this.video_ !== video) {
			this.video_ = video;
			if (this.change) {
				this.change.next();
				this.init();
				this.initStream();
			}
		}
	}

	get audio() {
		return this.audio_;
	}

	set audio(audio) {
		if (this.audio_ !== audio) {
			this.audio_ = audio;
			if (this.change) {
				this.change.next();
				this.init();
				this.initStream();
			}
		}
	}

	get hasPreview() {
		return this.platform !== DevicePlatform.IOS && this.platform !== DevicePlatform.VRHeadset;
	}

	onInit() {
		this.init();
	}

	init() {
		if (this.initialized_) {
			return;
		}
		this.initialized_ = true;
		this.platform = DeviceService.platform;
		const { node } = getContext(this);
		this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
		const preview = this.preview = node.querySelector('video');
		preview.addEventListener('loadedmetadata', this.onLoadedMetadata);
		const audio = node.querySelector('.audio');
		if (this.hasPreview) {
			const bars = this.bars = new Array(32).fill(0).map(x => {
				const bar = document.createElement('div');
				bar.classList.add('bar');
				audio.appendChild(bar);
				return bar;
			});
		}
	}

	onDestroy() {
		const preview = this.preview;
		preview.removeEventListener('loadedmetadata', this.onLoadedMetadata);
		if (this.hasPreview) {
			AudioStreamService.dispose();
		}
	}

	initStream() {
		const preview = this.preview;
		if (!this.preview) {
			return;
		}
		// console.log(this.video_, this.audio_);
		const { node } = getContext(this);
		if (this.video_ || this.audio_) {
			node.classList.add('ready');
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				const state = StateService.state;
				const quality = getStreamQuality(state);
				const options = {
					video: this.video_ ? {
						deviceId: this.video_,
						width: { ideal: quality.resolution.width },
						height: { ideal: quality.resolution.height },
						frameRate: { ideal: quality.frameRate.min, max: quality.frameRate.max },
					} : false,
					audio: this.audio_ ? { deviceId: this.audio_ } : false,
				};
				if (this.platform === DevicePlatform.IOS) {
					options.video.facingMode = 'user';
				}
				// console.log('AgoraDevicePreviewComponent.initStream.getUserMedia', options);
				navigator.mediaDevices.getUserMedia(options).then((stream) => {
					if (this.hasPreview) {
						if ('srcObject' in preview) {
							preview.srcObject = stream;
						} else {
							preview.src = window.URL.createObjectURL(stream);
						}
						if (this.audio_) {
							this.analyzeData(stream);
						}
						this.loadingStream_ = stream;
					} else {
						this.stream.next(stream);
					}
				}).catch((error) => {
					console.log('AgoraDevicePreviewComponent.initStream.error', error.name, error.message);
					this.stream.next(null);
				});
			}
		} else {
			node.classList.remove('ready');
			if (this.hasPreview) {
				if ('srcObject' in preview) {
					preview.srcObject = null;
				} else {
					preview.src = null;
				}
				this.analyzeData(null);
			}
			this.stream.next(null);
		}
	}

	onLoadedMetadata(event) {
		// console.log('AgoraDevicePreview.onLoadedMetadata', event);
		const { node } = getContext(this);
		node.classList.add('loaded');
		this.preview.play();
		this.stream.next(this.loadingStream_);
	}

	analyzeData(stream) {
		if (this.frequencySubscription) {
			this.frequencySubscription.unsubscribe();
		}
		// console.log('AgoraDevicePreviewComponent.analyzeData', stream);
		if (stream) {
			this.frequencySubscription = AudioStreamService.frequency$(stream, 64).pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(frequency => {
				// 32 data points
				// console.log(frequency);
				const spacing = 100 / 32;
				const bars = this.bars;
				bars.forEach((bar, i) => {
					const pow = Math.min(100, (5 + frequency[i])) / 100;
					bar.style.left = i * spacing + '%';
					bar.style.transform = `scale(1,${pow})`;
					bar.style.opacity = pow;
				});
			});
		}
	}
}

AgoraDevicePreviewComponent.meta = {
	selector: '[agora-device-preview]',
	outputs: ['stream', 'change'],
	inputs: ['video', 'audio']
};
