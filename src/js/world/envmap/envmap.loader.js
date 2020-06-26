import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import AgoraService from '../../agora/agora.service';
import { environment } from '../../environment';

export class EnvMapLoader {

	static get video() {
		let video = this.video_;
		if (!video) {
			video = this.video_ = document.createElement('video');
			video.loop = true;
			video.muted = true;
			video.playsInline = true;
			video.crossOrigin = 'anonymous';
		}
		return video;
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

	static load(item, renderer, callback) {
		const video = this.video;
		video.pause();
		if (item.envMapFile === 'publisherStream') {
			return this.loadPublisherStreamBackground(renderer, callback);
		} else if (item.envMapFile.indexOf('.hdr') !== -1) {
			return this.loadRgbeBackground(environment.getTexturePath(item.envMapFolder), item.envMapFile, renderer, callback);
		} else if (item.envMapFile.indexOf('.mp4') !== -1 || item.envMapFile.indexOf('.webm') !== -1) {
			return this.loadVideoBackground(environment.getTexturePath(item.envMapFolder), item.envMapFile, renderer, callback);
		} else if (item.envMapFile.indexOf('.m3u8') !== -1) {
			return this.loadHlslVideoBackground(item.envMapFile, renderer, callback);
		} else {
			return this.loadBackground(environment.getTexturePath(item.envMapFolder), item.envMapFile, renderer, callback);
		}
	}

	static loadBackground(path, file, renderer, callback) {
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		pmremGenerator.compileEquirectangularShader();
		const loader = new THREE.TextureLoader();
		loader
			.setPath(path)
			.load(file, (texture) => {
				const envMap = pmremGenerator.fromEquirectangular(texture).texture;
				// texture.dispose();
				pmremGenerator.dispose();
				if (typeof callback === 'function') {
					callback(envMap, texture, false);
				}
			});
		return loader;
	}

	static loadPublisherStreamBackground(renderer, callback) {
		const agora = AgoraService.getSingleton();
		if (!agora) {
			return;
		}
		const publisherStreamId = agora.publisherStreamId;
		if (!publisherStreamId) {
			return;
		}
		// const target = agora.state.role === RoleType.Publisher ? '.video--local' : '.video--remote';
		const target = `#stream-${publisherStreamId}`;
		const video = document.querySelector(`${target} video`);
		if (!video) {
			return;
		}
		const onPlaying = () => {
			const texture = this.texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			texture.format = THREE.RGBFormat;
			texture.needsUpdate = true;
			const cubeRenderTarget = this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
				generateMipmaps: true,
				// minFilter: THREE.LinearMipmapLinearFilter,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				mapping: THREE.UVMapping,
				format: THREE.RGBFormat
			}).fromEquirectangularTexture(renderer, texture);
			// texture.dispose();
			if (typeof callback === 'function') {
				callback(cubeRenderTarget.texture, texture, false);
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
	}

	static loadVideoBackground(path, file, renderer, callback) {
		const video = this.video;
		const onPlaying = () => {
			video.oncanplay = null;
			const texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			texture.format = THREE.RGBFormat;
			texture.needsUpdate = true;
			// const envMap = new THREE.VideoTexture(video);
			const cubeRenderTarget = this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
				generateMipmaps: true,
				// minFilter: THREE.LinearMipmapLinearFilter,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				mapping: THREE.UVMapping,
				format: THREE.RGBFormat
			}).fromEquirectangularTexture(renderer, texture);
			// texture.dispose();
			if (typeof callback === 'function') {
				callback(cubeRenderTarget.texture, texture, false);
			}
		};
		// video.addEventListener('playing', onPlaying);
		video.oncanplay = () => {
			console.log('EnvMapLoader.loadVideoBackground.oncanplay');
			onPlaying();
		};
		video.src = path + file;
		console.log(video.src);
		video.play().then(() => {
			console.log('EnvMapLoader.loadVideoBackground.play');
		}, error => {
			console.log('EnvMapLoader.loadVideoBackground.play.error', error);
		});
	}

	static loadHlslVideoBackground(src, renderer, callback) {
		const video = document.createElement('video');
		const onPlaying = () => {
			video.oncanplay = null;
			const texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			texture.format = THREE.RGBFormat;
			texture.needsUpdate = true;
			// const envMap = new THREE.VideoTexture(video);
			const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
				generateMipmaps: true,
				// minFilter: THREE.LinearMipmapLinearFilter,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				mapping: THREE.UVMapping,
				format: THREE.RGBFormat
			}).fromEquirectangularTexture(renderer, texture);
			// texture.dispose();
			if (typeof callback === 'function') {
				callback(cubeRenderTarget.texture, texture, false);
			}
		};
		video.oncanplay = () => {
			// console.log('videoReady', videoReady);
			onPlaying();
		};
		if (Hls.isSupported()) {
			var hls = new Hls();
			// bind them together
			hls.attachMedia(video);
			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				hls.loadSource(src);
				hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
					console.log('HlsDirective', data.levels);
					video.play();
				});
			});
		}
	}

	static loadRgbeBackground(path, file, renderer, callback) {
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		pmremGenerator.compileEquirectangularShader();
		const loader = new RGBELoader();
		loader
			.setDataType(THREE.UnsignedByteType)
			// .setDataType(THREE.FloatType)
			.setPath(path)
			.load(file, (texture) => {
				const envMap = pmremGenerator.fromEquirectangular(texture).texture;
				// texture.dispose();
				pmremGenerator.dispose();
				if (typeof callback === 'function') {
					callback(envMap, texture, true);
				}
			});
		return loader;
	}

}
