import { ReplaySubject } from 'rxjs';
// import * as THREE from 'three';
import { assetIsStream, AssetType } from '../../asset/asset';
import { environment } from '../../environment';
import StateService from '../../state/state.service';
import { RoleType } from '../../user/user';

export class MediaLoaderEvent {
	constructor(loader) {
		this.loader = loader;
	}
}

export class MediaLoaderPlayEvent extends MediaLoaderEvent { }

export class MediaLoaderPauseEvent extends MediaLoaderEvent { }

export class MediaLoaderDisposeEvent extends MediaLoaderEvent { }

export class MediaLoaderTimeUpdateEvent extends MediaLoaderEvent { }

export class MediaLoaderTimeSetEvent extends MediaLoaderEvent { }

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

	static isStream(item) {
		return assetIsStream(item.asset);
	}

	static isMutedStream(item) {
		let isMutedStream = false;
		switch (item.asset.type.name) {
			case AssetType.PublisherStream.name:
				isMutedStream = StateService.state.role === RoleType.Publisher;
				break;
			case AssetType.AttendeeStream.name:
				isMutedStream = StateService.state.role === RoleType.Attendee;
				break;
			case AssetType.PublisherScreen.name:
				isMutedStream = true;
				break;
			case AssetType.AttendeeScreen.name:
				isMutedStream = true;
				break;
			case AssetType.SmartDeviceStream.name:
				isMutedStream = StateService.state.role === RoleType.SmartDevice;
				break;
			default:
		}
		// console.log('isMutedStream', isMutedStream, item.asset.type.name, AssetType.PublisherStream.name, StateService.state.role, RoleType.Publisher);
		return isMutedStream;
	}

	static isPublisherStream(item) {
		return item.asset && item.asset.type.name === AssetType.PublisherStream.name;
	}

	static isAttendeeStream(item) {
		return item.asset && item.asset.type.name === AssetType.AttendeeStream.name;
	}

	static isSmartDeviceStream(item) {
		return item.asset && item.asset.type.name === AssetType.SmartDeviceStream.name;
	}

	static isPublisherScreen(item) {
		return item.asset && item.asset.type.name === AssetType.PublisherScreen.name;
	}

	static isAttendeeScreen(item) {
		return item.asset && item.asset.type.name === AssetType.AttendeeScreen.name;
	}

	get isVideo() {
		return MediaLoader.isVideo(this.item);
	}

	get isStream() {
		return MediaLoader.isStream(this.item);
	}

	get isMutedStream() {
		return MediaLoader.isMutedStream(this.item);
	}

	get isPublisherStream() {
		return MediaLoader.isPublisherStream(this.item);
	}

	get isAttendeeStream() {
		return MediaLoader.isAttendeeStream(this.item);
	}

	get isSmartDeviceStream() {
		return MediaLoader.isSmartDeviceStream(this.item);
	}

	get isPublisherScreen() {
		return MediaLoader.isPublisherScreen(this.item);
	}

	get isAttendeeScreen() {
		return MediaLoader.isAttendeeScreen(this.item);
	}

	get isPlayableVideo() {
		return this.isVideo; // && !this.item.asset.autoplay;
	}

	get isAutoplayVideo() {
		return this.isStream; // || (this.isVideo && (this.item.asset.autoplay != null));
	}

	get muted() {
		return this.muted_;
	}

	set muted(muted) {
		this.muted_ = muted;
		// console.log('MediaLoader.muted', muted, this.video);
		if (this.video && this.isVideo) {
			this.video.muted = muted === true;
		}
	}

	constructor(item) {
		this.item = item;
		this.toggle = this.toggle.bind(this);
		this.muted_ = false;
		this.subscription = StateService.state$.subscribe(state => this.muted = state.volumeMuted);
	}

	load(callback) {
		const item = this.item;
		let texture;
		// console.log('MediaLoader.load', item, this.isStream);
		if (this.isStream && item.streamId) {
			const streamId = item.streamId;
			const video = document.querySelector(`#stream-${streamId} video`); // document.querySelector(`#stream-remote-${streamId} video`) || document.querySelector(`#stream-local-${streamId} video`);
			if (!video) {
				return;
			}
			const onCanPlay = () => {
				if (this.disposed) {
					return;
				}
				video.removeEventListener('canplay', onCanPlay);
				texture = this.texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBAFormat;
				// texture.image.width = video.videoWidth;
				// texture.image.height = video.videoHeight;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture, this);
				}
			};
			const isMutedStream = this.isMutedStream;
			video.crossOrigin = 'anonymous';
			video.volume = isMutedStream ? 0 : 1;
			video.muted = isMutedStream;
			if (video.readyState >= video.HAVE_FUTURE_DATA) {
				onCanPlay();
			} else {
				video.addEventListener('canplay', onCanPlay);
			}
		} else if (this.isVideo) {
			// create the video element
			const autoplay = (item.asset && item.asset.autoplay) || false;
			const loop = (item.asset && item.asset.loop) || false;
			const video = this.video = document.createElement('video');
			video.crossOrigin = 'anonymous';
			video.preload = 'metadata';
			video.volume = 0.8;
			video.muted = autoplay;
			video.playsInline = true;
			video.loop = loop;
			const onCanPlay = () => {
				if (this.disposed) {
					return;
				}
				// console.log('MediaLoader', 'onCanPlay');
				video.oncanplay = null;
				texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.encoding = THREE.sRGBEncoding;
				// texture.format = THREE.RGBAFormat;
				// texture.image.width = video.videoWidth;
				// texture.image.height = video.videoHeight;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture, this);
				}
				if (autoplay) {
					this.play(item.silent);
				} else {
					video.pause();
				}
			};
			const onTimeUpdate = () => {
				if (this.disposed) {
					return;
				}
				MediaLoader.events$.next(new MediaLoaderTimeUpdateEvent(this));
			};
			const onEnded = () => {
				if (this.disposed) {
					return;
				}
				if (!loop) {
					MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
				}
			};
			video.oncanplay = onCanPlay;
			video.ontimeupdate = onTimeUpdate;
			video.onended = onEnded;
			video.src = MediaLoader.getPath(item);
			video.load(); // must call after setting/changing source
		} else if (item.asset) {
			MediaLoader.loadTexture(item, (texture) => {
				if (this.disposed) {
					return;
				}
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBAFormat;
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

	get progress() {
		if (this.video) {
			return this.video.currentTime / this.video.duration;
		} else {
			return 0;
		}
	}
	set progress(progress) {
		if (this.video) {
			const currentTime = this.video.duration * progress;
			if (this.video.seekable.length > progress && this.video.currentTime !== currentTime) {
				// console.log('MediaLoader', 'progress', progress, 'currentTime', currentTime, 'duration', this.video.duration, 'seekable', this.video.seekable);
				this.video.currentTime = currentTime;
				MediaLoader.events$.next(new MediaLoaderTimeSetEvent(this));
			}
		}
	}

	play(silent) {
		// console.log('MediaLoader.play');
		if (this.video) {
			this.video.muted = this.muted_;
			this.video.play().then(() => {
				// console.log('MediaLoader.play.success', this.item.asset.file);
				if (!silent) {
					MediaLoader.events$.next(new MediaLoaderPlayEvent(this));
				}
			}, error => {
				console.log('MediaLoader.play.error', this.item.asset.file, error);
			});
		}
	}

	pause(silent) {
		// console.log('MediaLoader.pause');
		if (this.video && this.isVideo) {
			this.video.muted = true;
			this.video.pause();
			if (!silent) {
				MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
			}
		}
	}

	toggle() {
		// console.log('MediaLoader.toggle', this.video);
		if (this.video && this.isVideo) {
			if (this.video.paused) {
				this.video.muted = this.muted_;
				this.play();
				return true;
			} else {
				this.pause();
				return false;
			}
		}
	}

	dispose() {
		// console.log('MediaLoader.dispose');
		this.subscription.unsubscribe();
		this.pause(true);
		if (this.isVideo && this.video) {
			this.video.ontimeupdate = null;
			this.video.onended = null;
			MediaLoader.events$.next(new MediaLoaderDisposeEvent(this));
		}
		this.disposed = true;
		delete this.video;
	}

}

MediaLoader.events$ = new ReplaySubject(1);
