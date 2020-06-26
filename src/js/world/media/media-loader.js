import * as THREE from 'three';
import { environment } from '../../environment';

export default class MediaLoader {

	static getLoader() {
		return MediaLoader.loader || (MediaLoader.loader = new THREE.TextureLoader());
	}

	static getPath(item) {
		return environment.getTexturePath(item.folder + item.file);
	}

	static loadTexture(item, callback) {
		const path = MediaLoader.getPath(item);
		return MediaLoader.getLoader().load(path, callback);
	}

	static isVideo(item) {
		return item.file.indexOf('.mp4') !== -1 || item.file.indexOf('.webm') !== -1;
	}

	get isVideo() {
		return MediaLoader.isVideo(this.item);
	}

	get isPlayableVideo() {
		return this.isVideo && !this.item.autoplay;
	}

	get isAutoplayVideo() {
		return this.isVideo && this.item.autoplay;
	}

	constructor(item) {
		this.item = item;
		this.toggle = this.toggle.bind(this);
	}

	load(callback) {
		const item = this.item;
		let texture;
		if (MediaLoader.isVideo(item)) {
			// create the video element
			const video = this.video = document.createElement('video');
			video.preload = 'metadata';
			video.muted = true;
			video.playsinline = true;
			if (item.autoplay) {
				video.loop = true;
			}
			video.crossOrigin = 'anonymous';
			const onCanPlay = () => {
				video.oncanplay = null;
				const texture = new THREE.VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				texture.format = THREE.RGBFormat;
				texture.needsUpdate = true;
				if (!item.autoplay) {
					video.pause();
				}
				if (typeof callback === 'function') {
					callback(texture, this);
				}
			};
			video.oncanplay = onCanPlay;
			video.src = MediaLoader.getPath(item);
			video.load(); // must call after setting/changing source
			this.play();
		} else {
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
		}
		return this;
	}

	play() {
		// console.log('MediaLoader.play');
		this.video.play().then(() => {
			console.log('MediaLoader.play.success', this.item.file);
		}, error => {
			console.log('MediaLoader.play.error', this.item.file, error);
		});
	}

	pause() {
		// console.log('MediaLoader.pause');
		this.video.muted = true;
		this.video.pause();
	}

	toggle() {
		// console.log('MediaLoader.toggle', this.video);
		if (this.video.paused) {
			this.video.muted = false;
			this.play();
		} else {
			this.pause();
		}
	}

	dispose() {
		if (this.isVideo) {
			this.video.pause();
			this.video.muted = true;
			delete this.video;
		}
	}

}
