import { fromEvent } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
// import * as THREE from 'three';
// import { RGBELoader } from '../loaders/RGBELoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AssetType } from '../../asset/asset';
import { environment } from '../../environment';
import ImageService, { ImageServiceEvent } from '../../image/image.service';
import LoaderService from '../../loader/loader.service';
import StreamService from '../../stream/stream.service';
import MediaLoader, { MediaLoaderDisposeEvent, MediaLoaderPauseEvent, MediaLoaderPlayEvent, MediaLoaderTimeSetEvent, MediaLoaderTimeUpdateEvent } from '../media/media-loader';
import MediaMesh from '../media/media-mesh';

export class PanoramaLoader {

	static get video() {
		return this.video_;
	}

	static set video(video) {
		if (this.video_) {
			this.video_.muted = true;
			this.video_.pause();
			if (this.video_.parentNode) {
				this.video_.parentNode.removeChild(this.video_);
			}
			this.video_ = null;
		}
		if (video) {
			const video = this.video_ = document.createElement('video');
			video.loop = true;
			video.playsInline = true;
			video.crossOrigin = 'anonymous';
			// document.querySelector('body').appendChild(video);
		}
	}

	static get muted() {
		return this.muted_;
	}

	static set muted(muted) {
		this.muted_ = muted;
		// console.log('PanoramaLoader.muted', muted, this.video);
		if (this.video) {
			this.video.muted = muted === true;
		}
	}

	static set cubeRenderTarget(cubeRenderTarget) {
		if (this.cubeRenderTarget_) {
			this.cubeRenderTarget_.texture.dispose();
			this.cubeRenderTarget_.dispose();
		}
		this.cubeRenderTarget_ = cubeRenderTarget;
	}

	static set texture(texture) {
		if (this.texture_) {
			this.texture_.dispose();
		}
		this.texture_ = texture;
	}

	static load(asset, renderer, callback) {
		MediaLoader.events$.next(new MediaLoaderDisposeEvent(this));
		this.video = null;
		if (!asset) {
			return;
		}
		// console.log('PanoramaLoader.load', asset.type.name, AssetType);
		if (asset.type.name === AssetType.PublisherStream.name) {
			return this.loadPublisherStreamBackground(renderer, callback);
		} else if (asset.type.name === AssetType.AttendeeStream.name) {
			return this.loadAttendeeStreamBackground(renderer, callback);
			/*} else if (assetIsStream(asset)) {
				return this.loadStreamBackground(renderer, callback, asset);
				*/
		} else if (asset.file.indexOf('.mp4') !== -1 || asset.file.indexOf('.webm') !== -1) {
			return this.loadVideoBackground(environment.getPath(asset.folder), asset.file, renderer, callback);
		} else if (asset.file.indexOf('.m3u8') !== -1) {
			return this.loadHlslVideoBackground(asset.file, renderer, callback);
		} else if (asset.file.indexOf('.hdr') !== -1) {
			return this.loadRgbeBackground(environment.getPath(asset.folder), asset.file, renderer, callback);
		} else {
			return this.loadBackgroundImageService(environment.getPath(asset.folder), asset.file, renderer, callback);
		}
	}

	static loadBackgroundImageService(folder, file, renderer, callback) {
		const progressRef = LoaderService.getRef();
		const image = new Image();
		ImageService.events$(folder + file).pipe(
			tap(event => {
				if (event.type === ImageServiceEvent.Progress) {
					LoaderService.setProgress(progressRef, event.data.loaded, event.data.total);
				}
			}),
			filter(event => event.type === ImageServiceEvent.Complete),
			switchMap(event => {
				const load = fromEvent(image, 'load');
				image.crossOrigin = 'anonymous';
				image.src = event.data;
				return load;
			}),
			takeWhile(event => event.type !== ImageServiceEvent.Complete, true),
		).subscribe(event => {
			const texture = new THREE.Texture(image);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			// console.log('texture', texture, THREE.RGBAFormat, THREE.LinearEncoding);
			// texture.format = THREE.RGBAFormat;
			// texture.encoding = THREE.LinearEncoding;
			texture.toneMapped = false;
			texture.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
				URL.revokeObjectURL(event.data);
			}
			LoaderService.setProgress(progressRef, 1);
		});
	}

	static loadBackground(folder, file, renderer, callback) {
		const progressRef = LoaderService.getRef();
		const loader = new THREE.TextureLoader();
		loader.setPath(folder).load(file, (texture) => {
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			// texture.format = THREE.RGBAFormat;
			// texture.encoding = THREE.LinearEncoding;
			texture.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
			LoaderService.setProgress(progressRef, 1);
		}, (request) => {
			LoaderService.setProgress(progressRef, request.loaded, request.total);
		});
		return loader;
	}

	static loadRgbeBackground(folder, file, renderer, callback) {
		const progressRef = LoaderService.getRef();
		const loader = new RGBELoader();
		loader.setDataType(THREE.UnsignedByteType).setPath(folder).load(file, (texture) => {
			if (typeof callback === 'function') {
				callback(texture, true);
			}
			LoaderService.setProgress(progressRef, 1);
		}, (request) => {
			LoaderService.setProgress(progressRef, request.loaded, request.total);
		});
		return loader;
	}

	static loadHlslVideoBackground(src, renderer, callback) {
		const progressRef = LoaderService.getRef();
		const video = document.createElement('video');
		const onPlaying = () => {
			video.oncanplay = null;
			const texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			// texture.format = THREE.RGBAFormat;
			// texture.encoding = THREE.LinearEncoding;
			texture.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
			LoaderService.setProgress(progressRef, 1);
		};
		video.oncanplay = () => {
			// console.log('videoReady', videoReady);
			onPlaying();
		};
		if (Hls.isSupported()) {
			var hls = new Hls();
			hls.attachMedia(video);
			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				hls.loadSource(src);
				hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
					video.play();
				});
			});
		}
	}

	// !!! implementing medialoader interface
	// static get progress
	// static set progress
	// static play
	// static pause

	static get progress() {
		const video = this.video;
		if (video) {
			return video.currentTime / video.duration;
		} else {
			return 0;
		}
	}
	static set progress(progress) {
		const video = this.video;
		if (video) {
			const currentTime = video.duration * progress;
			if (video.seekable.length > progress && video.currentTime !== currentTime) {
				// console.log('PanoramaLoader', 'progress', progress, 'currentTime', currentTime, 'duration', this.video.duration, 'seekable', this.video.seekable);
				video.currentTime = currentTime;
				MediaLoader.events$.next(new MediaLoaderTimeSetEvent(this));
			}
		}
	}
	static play(silent) {
		// console.log('PanoramaLoader.play');
		const video = this.video;
		if (video) {
			video.muted = this.muted_;
			video.play().then(() => {
				// console.log('PanoramaLoader.play.success', this.video.src);
				if (!silent) {
					MediaLoader.events$.next(new MediaLoaderPlayEvent(this));
				}
			}, error => {
				console.log('PanoramaLoader.play.error', video.src, error);
			});
		}
	}
	static pause(silent) {
		// console.log('PanoramaLoader.pause');
		const video = this.video;
		if (video) {
			video.muted = true;
			video.pause();
			if (!silent) {
				MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
			}
		}
	}

	static loadVideoBackground(folder, file, renderer, callback) {
		const progressRef = LoaderService.getRef();
		this.video = true;
		const video = this.video;
		const loop = true;
		const autoplay = true;
		const onCanPlay = () => {
			// console.log('PanoramaLoader', 'onPlaying');
			video.oncanplay = null;
			const texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			// texture.format = THREE.RGBAFormat;
			// texture.encoding = THREE.LinearEncoding;
			texture.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
			// console.log('loadVideoBackground.loaded');
			LoaderService.setProgress(progressRef, 1);
			if (autoplay) {
				this.play();
			} else {
				video.pause();
			}
		}
		const onTimeUpdate = () => {
			MediaLoader.events$.next(new MediaLoaderTimeUpdateEvent(this));
		};
		const onEnded = () => {
			if (!loop) {
				MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
			}
		};
		video.oncanplay = onCanPlay;
		video.ontimeupdate = onTimeUpdate;
		video.onended = onEnded;
		video.crossOrigin = 'anonymous';
		video.src = folder + file;
		video.load();
	}

	static loadPublisherStreamBackground(renderer, callback) {
		const onPublisherStreamId = (publisherStreamId) => {
			const video = document.querySelector(`#stream-${publisherStreamId} video`);
			if (!video) {
				return;
			}
			const onPlaying = () => {
				const texture = this.texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBAFormat;
				// texture.encoding = THREE.LinearEncoding;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture);
				}
			};
			video.crossOrigin = 'anonymous';
			if (video.readyState >= video.HAVE_FUTURE_DATA) {
				onPlaying();
			} else {
				video.oncanplay = () => {
					onPlaying();
				};
			}
		};
		StreamService.getPublisherStreamId$().pipe(
			first(),
		).subscribe(publisherStreamId => onPublisherStreamId(publisherStreamId));
	}

	static loadAttendeeStreamBackground(renderer, callback) {
		const onAttendeeStreamId = (attendeeStreamId) => {
			const video = document.querySelector(`#stream-${attendeeStreamId} video`);
			if (!video) {
				return;
			}
			const onPlaying = () => {
				const texture = this.texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBAFormat;
				// texture.encoding = THREE.LinearEncoding;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture);
				}
			};
			video.crossOrigin = 'anonymous';
			if (video.readyState >= video.HAVE_FUTURE_DATA) {
				onPlaying();
			} else {
				video.oncanplay = () => {
					onPlaying();
				};
			}
		};
		StreamService.getAttendeeStreamId$().pipe(
			first(),
		).subscribe(attendeeStreamId => onAttendeeStreamId(attendeeStreamId));
	}

	static loadStreamBackground(renderer, callback, asset) {
		const onStreamId = (streamId) => {
			const video = document.querySelector(`#stream-${streamId} video`);
			if (!video) {
				return;
			}
			const onPlaying = () => {
				const texture = this.texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				// texture.format = THREE.RGBAFormat;
				// texture.encoding = THREE.LinearEncoding;
				texture.needsUpdate = true;
				if (typeof callback === 'function') {
					callback(texture);
				}
			};
			video.crossOrigin = 'anonymous';
			if (video.readyState >= video.HAVE_FUTURE_DATA) {
				onPlaying();
			} else {
				video.oncanplay = () => {
					onPlaying();
				};
			}
		};
		PanoramaLoader.getStreamId$(asset).pipe(
			takeUntil(MediaLoader.events$.pipe(
				filter(event => event instanceof MediaLoaderDisposeEvent)
			)),
		).subscribe((streamId) => {
			onStreamId(streamId);
		});
	}

	static getStreamId$(asset) {
		const assetType = asset.type;
		return StreamService.streams$.pipe(
			map((streams) => {
				// console.log('streams', streams);
				let stream;
				let i = 0;
				const matchType = MediaMesh.getTypeMatcher(assetType);
				streams.forEach(x => {
					// console.log('streams', matchType(x), x, asset);
					if (matchType(x)) {
						if (i === asset.index) {
							stream = x;
						}
						i++;
					}
				});
				if (stream) {
					return stream.getId();
				} else {
					return null;
				}
			}),
		);
	}

}
