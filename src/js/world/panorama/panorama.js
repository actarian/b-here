// import * as THREE from 'three';
import { AssetType } from '../../asset/asset';
import StateService from '../../state/state.service';
import { PanoramaGridView } from '../../view/view';
import { EnvMapLoader } from '../envmap/envmap.loader';
import InteractiveMesh from '../interactive/interactive.mesh';
import { VideoTexture } from '../video-texture';

export const PANORAMA_RADIUS = 101;

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
	color *= 1.8;
	return saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );
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
	if (uRgbe) {
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
		this.subscription = StateService.state$.subscribe(state => EnvMapLoader.muted = state.volumeMuted);
		this.tween = 0;
		this.create();
	}

	create() {
		const geometry = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 60, 40);
		geometry.scale(-1, 1, 1);
		geometry.rotateY(Math.PI);
		const material = new THREE.ShaderMaterial({
			// depthTest: false,
			depthWrite: false,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			uniforms: {
				uTexture: { type: "t", value: null },
				uResolution: { value: new THREE.Vector2() },
				uTween: { value: 0 },
				uRgbe: { value: false },
			},
			extensions: {
				fragDepth: true,
			},
		});
		/*
		const material = new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: 0,
		});
		*/
		const mesh = this.mesh = new InteractiveMesh(geometry, material);
		// mesh.renderOrder = environment.renderOrder.panorama;
		mesh.name = '[panorama]';
	}

	/*
	swap(view, renderer, callback, onexit) {
		const item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
		const material = this.mesh.material;
		if (this.tween > 0) {
			gsap.to(this, {
				duration: 0.5,
				tween: 0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.uniforms.uTween.value = this.tween;
					material.needsUpdate = true;
				},
				onComplete: () => {
					if (typeof onexit === 'function') {
						onexit(view);
					}
					this.load(item, renderer, (envMap, texture, rgbe) => {
						gsap.to(this, {
							duration: 0.5,
							tween: 1,
							ease: Power2.easeInOut,
							onUpdate: () => {
								material.uniforms.uTween.value = this.tween;
								material.needsUpdate = true;
							}
						});
						if (typeof callback === 'function') {
							callback(envMap, texture, rgbe);
						}
					});
				}
			});
		} else {
			if (typeof onexit === 'function') {
				onexit(view);
			}
			this.load(item, renderer, (envMap, texture, rgbe) => {
				gsap.to(this, {
					duration: 0.5,
					tween: 1,
					ease: Power2.easeInOut,
					onUpdate: () => {
						material.uniforms.uTween.value = this.tween;
						material.needsUpdate = true;
					}
				});
				if (typeof callback === 'function') {
					callback(envMap, texture, rgbe);
				}
			});
		}
	}
	*/

	change(view, renderer, callback, onexit) {
		const item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
		const material = this.mesh.material;
		// setTimeout(() => {
		this.load(item, renderer, (envMap, texture, rgbe) => {
			// setTimeout(() => {
			if (typeof onexit === 'function') {
				onexit(view);
			}
			material.uniforms.uTween.value = 1;
			material.needsUpdate = true;
			setTimeout(function() {
				if (typeof callback === 'function') {
					callback(envMap, texture, rgbe);
				}
			}, 100); // !!! delay
			/*
			gsap.to(this, {
				duration: 0.5,
				tween: 1,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.uniforms.uTween.value = this.tween;
					material.needsUpdate = true;
				},
				onComplete: () => {
					setTimeout(function () {
						if (typeof callback === 'function') {
							callback(envMap, texture, rgbe);
						}
					}, 100); // !!! delay
				},
			});
			*/
			// }, 100); // !!! delay
		});
		// }, 300); // !!! delay
	}

	crossfade(item, renderer, callback) {
		const material = this.mesh.material;
		this.load(item, renderer, (envMap, texture, rgbe) => {
			material.uniforms.uTween.value = 1;
			material.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(envMap, texture, rgbe);
			}
		});
	}

	load(item, renderer, callback) {
		if (!item.asset) {
			return;
		}
		if (item.asset.type.name === AssetType.Model.name) {
			if (typeof callback === 'function') {
				callback(null, null, null);
				// console.log('Panorama', item.asset.type);
			}
			return;
		}
		this.currentAsset = item.asset.folder + item.asset.file;
		const material = this.mesh.material;
		EnvMapLoader.load(item, renderer, (envMap, texture, rgbe, video, pmremGenerator) => {
			if (item.asset.folder + item.asset.file !== this.currentAsset) {
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
			// material.map = texture;
			material.uniforms.uTexture.value = texture;
			material.uniforms.uResolution.value = new THREE.Vector2(texture.width, texture.height);
			material.uniforms.uTween.value = 0;
			material.uniforms.uRgbe.value = rgbe;
			material.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(envMap, texture, rgbe);
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
		// console.log('Panorama.setVideo', video);
		if (video) {
			const onPlaying = () => {
				const texture = new VideoTexture(video);
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.mapping = THREE.UVMapping;
				texture.format = THREE.RGBFormat;
				texture.needsUpdate = true;
				const material = this.mesh.material;
				material.map = texture;
				material.uniforms.uTexture.value = texture;
				material.uniforms.uResolution.value = new THREE.Vector2(texture.width, texture.height);
				material.needsUpdate = true;
			};
			// video.addEventListener('canplay', onPlaying);
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
