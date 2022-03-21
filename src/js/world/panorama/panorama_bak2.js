// import * as THREE from 'three';
import { Asset, AssetType } from '../../asset/asset';
import StateService from '../../state/state.service';
import { PanoramaGridView, ViewType } from '../../view/view';
import { Geometry } from '../geometry/geometry';
import InteractiveMesh from '../interactive/interactive.mesh';
import { VideoTexture } from '../video-texture';
import { PanoramaLoader } from './panorama-loader';

const VERTEX_SHADER = `
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	vNormal = normal;
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
varying vec3 vNormal;
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTween;
uniform bool uRgbe;
uniform sampler2D uTexture;

vec3 ACESFilmicToneMapping_( vec3 color ) {
	return color;
	// color *= 1.8;
	// return saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );
}

vec4 getColor(vec2 p) {
	return texture2D(uTexture, p);
}

vec3 encodeColor(vec4 color) {
	return ACESFilmicToneMapping_(RGBEToLinear(color).rgb);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 Blur(vec2 st, vec4 color) {
	const float directions = 16.0;
	const float quality = 3.0;
	float size = 16.0;
	const float PI2 = 6.28318530718;
	const float qq = 1.0;
	const float q = 1.0 / quality;
	vec2 radius = size / uResolution.xy;
	for (float d = 0.0; d < PI2; d += PI2 / directions) {
		for (float i = q; i <= qq; i += q) {
			vec2 dUv = vec2(cos(d), sin(d)) * radius * i;
			color += getColor(st + dUv);
        }
	}
	return color /= quality * directions - 15.0 + rand(st) * 4.0;
}

void main() {
	vec4 color = texture2D(uTexture, vUv);
	// color = Blur(vUv, color);
	if (false && uRgbe) {
		color = vec4(encodeColor(color) * uTween + rand(vUv) * 0.01, 1.0);
	} else {
		color = vec4(color.rgb * uTween + rand(vUv) * 0.01, 1.0);
	}
	gl_FragColor = color;
}
`;
export default class Panorama {

	constructor() {
		this.muted_ = false;
		this.subscription = StateService.state$.subscribe(state => PanoramaLoader.muted = state.volumeMuted);
		this.tween = 0;
		this.create();
	}

	create() {
		const geometry = Geometry.panoramaGeometry;
		geometry.scale(-1, 1, 1);
		geometry.rotateY(Math.PI);
		const material = new THREE.ShaderMaterial({
			depthWrite: false,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			uniforms: {
				uTexture: { type: 't', value: null },
				uResolution: { value: new THREE.Vector2() },
				uTween: { value: 0 },
				uRgbe: { value: false },
			},
			extensions: {
				fragDepth: true,
			},
		});
		const mesh = this.mesh = new InteractiveMesh(geometry, material);
		mesh.name = '[panorama]';
	}

	change(view, renderer, callback, onexit) {
		const item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
		const material = this.mesh.material;
		this.load(item, renderer, (texture, envMap, rgbe) => {
			if (typeof onexit === 'function') {
				onexit(view);
			}
			material.uniforms.uTween.value = 1;
			material.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
		});
	}

	crossfade(item, renderer, callback) {
		const material = this.mesh.material;
		this.load(item, renderer, (envMap, texture, rgbe) => {
			material.uniforms.uTween.value = 1;
			material.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
		});
	}

	load(item, renderer, callback) {
		const asset = item.type.name === ViewType.Media.name ? Asset.defaultMediaAsset : item.asset;
		if (!asset) {
			return;
		}
		if (asset.type.name === AssetType.Model.name) {
			if (typeof callback === 'function') {
				callback(null);
			}
			return;
		}
		this.currentAsset = asset.folder + asset.file;
		const material = this.mesh.material;
		PanoramaLoader.load(asset, renderer, (texture, rgbe) => {
			if (asset.folder + asset.file !== this.currentAsset) {
				texture.dispose();
				return;
			}
			if (material.uniforms.uTexture.value) {
				material.uniforms.uTexture.value.dispose();
				material.uniforms.uTexture.value = null;
			}
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.mapping = THREE.UVMapping;
			texture.needsUpdate = true;
			material.uniforms.uTexture.value = texture;
			material.uniforms.uResolution.value = new THREE.Vector2(texture.width, texture.height);
			material.uniforms.uTween.value = 0;
			material.uniforms.uRgbe.value = rgbe;
			material.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
		});
	}

	loadVideo(src) {
		const video = document.createElement('video');
		video.src = src;
		video.volume = 0.8;
		video.muted = true;
		video.playsInline = true;
		video.crossOrigin = 'anonymous';
		video.play();
		this.setVideo(video);
	}

	setVideo(video) {
		if (video) {
			const onPlaying = () => {
				const texture = new VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				texture.format = THREE.RGBAFormat;
				texture.needsUpdate = true;
				const material = this.mesh.material;
				material.map = texture;
				material.uniforms.uTexture.value = texture;
				material.uniforms.uResolution.value = new THREE.Vector2(texture.width, texture.height);
				material.needsUpdate = true;
			};
			video.crossOrigin = 'anonymous';
			video.oncanplay = () => {
				onPlaying();
			};
		}
	}

	dispose() {
		this.subscription.unsubscribe();
	}
}
