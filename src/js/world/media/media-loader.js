import { ReplaySubject } from 'rxjs';
// import * as THREE from 'three';
import { environment } from '../../environment';

export class MediaLoaderEvent {
	constructor(src, id) {
		this.src = src;
		this.id = id;
	}
}

export class MediaLoaderPlayEvent extends MediaLoaderEvent { }

export class MediaLoaderPauseEvent extends MediaLoaderEvent { }

export default class MediaLoader {

	static getLoader() {
		return MediaLoader.loader || (MediaLoader.loader = new THREE.TextureLoader());
	}

	static getPath(item) {
		return environment.getPath(item.asset.folder + item.asset.file);
	}

	static loadTexture(item, callback) {
		const path = MediaLoader.getPath(item);
		return MediaLoader.getLoader().load(path, callback);
	}

	static isVideo(item) {
		return item.asset && item.asset.file && (item.asset.file.indexOf('.mp4') !== -1 || item.asset.file.indexOf('.webm') !== -1);
	}

	static isPublisherStream(item) {
		return item.asset && item.asset.file === 'publisherStream';
	}

	static isNextAttendeeStream(item) {
		return item.asset && item.asset.file === 'nextAttendeeStream';
	}

	get isVideo() {
		return MediaLoader.isVideo(this.item);
	}

	get isPublisherStream() {
		return MediaLoader.isPublisherStream(this.item);
	}

	get isNextAttendeeStream() {
		return MediaLoader.isNextAttendeeStream(this.item);
	}

	get isPlayableVideo() {
		return this.isVideo && !this.item.asset.autoplay;
	}

	get isAutoplayVideo() {
		return this.isPublisherStream || this.isNextAttendeeStream || (this.isVideo && (this.item.asset.autoplay != null));
	}

	constructor(item) {
		this.item = item;
		this.toggle = this.toggle.bind(this);
	}

	load(callback) {
		const item = this.item;
		let texture;
		if ((this.isPublisherStream || this.isNextAttendeeStream) && item.streamId) {
			const streamId = item.streamId;
			const target = `#stream-${streamId}`;
			const video = document.querySelector(`${target} video`);
			if (!video) {
				return;
			}
			const onCanPlay = () => {
				video.oncanplay = null;
				texture = this.texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				texture.format = THREE.RGBFormat;
				// texture.image.width = video.videoWidth;
				// texture.image.height = video.videoHeight;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture, this);
				}
			};
			video.crossOrigin = 'anonymous';
			if (video.readyState >= video.HAVE_FUTURE_DATA) {
				onCanPlay();
			} else {
				video.oncanplay = onCanPlay;
			}
		} else if (this.isVideo) {
			// create the video element
			const video = this.video = document.createElement('video');
			video.preload = 'metadata';
			video.volume = 0.5;
			video.muted = true;
			video.playsinline = video.playsInline = true;
			if (item.asset && item.asset.autoplay) {
				video.loop = true;
			}
			video.crossOrigin = 'anonymous';
			const onCanPlay = () => {
				video.oncanplay = null;
				texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				texture.format = THREE.RGBFormat;
				// texture.image.width = video.videoWidth;
				// texture.image.height = video.videoHeight;
				texture.needsUpdate = true;
				if (!item.asset || !item.asset.autoplay) {
					video.pause();
				}
				if (typeof callback === 'function') {
					callback(texture, this);
				}
			};
			video.oncanplay = onCanPlay;
			video.src = MediaLoader.getPath(item);
			video.load(); // must call after setting/changing source
			this.play(true);
		} else if (item.asset) {
			MediaLoader.loadTexture(item, texture => {
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBFormat;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				if (typeof callback === 'function') {
					callback(texture, this);
				}
			});
		} else {
			callback(null, this);
		}
		return this;
	}

	play(silent) {
		// console.log('MediaLoader.play');
		this.video.play().then(() => {
			// console.log('MediaLoader.play.success', this.item.asset.file);
		}, error => {
			console.log('MediaLoader.play.error', this.item.asset.file, error);
		});
		if (!silent) {
			MediaLoader.events$.next(new MediaLoaderPlayEvent(this.video.src, this.item.id));
		}
	}

	pause(silent) {
		// console.log('MediaLoader.pause');
		this.video.muted = true;
		this.video.pause();
		if (!silent) {
			MediaLoader.events$.next(new MediaLoaderPauseEvent(this.video.src, this.item.id));
		}
	}

	toggle() {
		// console.log('MediaLoader.toggle', this.video);
		if (this.video.paused) {
			this.video.muted = false;
			this.play();
			return true;
		} else {
			this.pause();
			return false;
		}
	}

	dispose() {
		if (this.isVideo) {
			this.pause();
			delete this.video;
		}
	}

}

MediaLoader.events$ = new ReplaySubject(1);
