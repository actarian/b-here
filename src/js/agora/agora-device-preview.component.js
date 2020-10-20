import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import AudioStreamService from '../audio/audio-stream.service';

export default class AgoraDevicePreviewComponent extends Component {

	get video() {
		return this.video_;
	}

	set video(video) {
		if (this.video_ !== video) {
			this.video_ = video;
			if (this.change) {
				this.change.next();
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
				this.initStream();
			}
		}
	}

	onInit() {
		this.isIOS = AgoraDevicePreviewComponent.isIOS();
		const { node } = getContext(this);
		const preview = this.preview = node.querySelector('video');
		this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
		preview.addEventListener('loadedmetadata', this.onLoadedMetadata);
		const audio = node.querySelector('.audio');
		if (!this.isIOS) {
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
		if (!this.isIOS) {
			AudioStreamService.dispose();
		}
	}

	initStream() {
		const preview = this.preview;
		if (!this.preview) {
			return;
		}
		// console.log(this.video_, this.audio_);
		if (this.video_ || this.audio_) {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({
					video: this.video_ ? { deviceId: this.video_ } : false,
					audio: this.audio_ ? { deviceId: this.audio_ } : false,
				}).then((stream) => {
					if (!this.isIOS) {
						if ('srcObject' in preview) {
							preview.srcObject = stream;
						} else {
							preview.src = window.URL.createObjectURL(stream);
						}
						this.analyzeData(stream);
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
			if (!this.isIOS) {
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

	static isIOS() {
		return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
	}

}

AgoraDevicePreviewComponent.meta = {
	selector: '[agora-device-preview]',
	outputs: ['stream', 'change'],
	inputs: ['video', 'audio']
};
