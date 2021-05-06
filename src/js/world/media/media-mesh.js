import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import * as THREE from 'three';
import { assetIsStream, AssetType } from '../../asset/asset';
import { environment } from '../../environment';
import StreamService from '../../stream/stream.service';
import { RoleType } from '../../user/user';
import InteractiveMesh from '../interactive/interactive.mesh';
import { Texture } from '../texture/texture';
import MediaLoader, { MediaLoaderPauseEvent, MediaLoaderPlayEvent, MediaLoaderTimeSetEvent } from './media-loader';
import MediaPlayMesh from './media-play-mesh';
import MediaZoomMesh from './media-zoom-mesh';

const VERTEX_SHADER = `
varying vec2 vUvShader;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
	vUvShader = uv;

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}
`;

const FRAGMENT_SHADER = `
#define USE_MAP

varying vec2 vUvShader;
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// uniform sampler2D map;
uniform sampler2D playMap;
uniform vec2 mapResolution;
uniform vec2 playMapResolution;
uniform float mapTween;
uniform float playMapTween;
uniform vec3 playMapColor;
uniform bool isVideo;

void main() {
	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4(vec3(1.0), opacity);

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	// main
	vec4 mapRgba = texture2D(map, vUvShader);
	mapRgba = mapTexelToLinear(mapRgba);
	if (isVideo) {
		vec4 playMapRgba = texture2D(playMap, vUvShader);
		playMapRgba = mapTexelToLinear(playMapRgba);
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2) + (playMapRgba.rgb * mapTween * playMapRgba.a), opacity);
	} else {
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity);
	}

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
		vec4 lightMapRgba = texture2D(lightMap, vUv2);
		reflectedLight.indirectDiffuse += lightMapTexelToLinear(lightMapRgba).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3(1.0);
	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	gl_FragColor = vec4(outgoingLight, diffuseColor.a);

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
`;

const FRAGMENT_CHROMA_KEY_SHADER = `
#define USE_MAP
#define threshold 0.55
#define padding 0.05

varying vec2 vUvShader;
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// uniform sampler2D map;
uniform sampler2D playMap;
uniform vec2 mapResolution;
uniform vec2 playMapResolution;
uniform float mapTween;
uniform float playMapTween;
uniform vec3 playMapColor;
uniform vec3 chromaKeyColor;
uniform bool isVideo;

void main() {
	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4(vec3(1.0), opacity);

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	// main
	vec4 mapRgba = texture2D(map, vUvShader);
	mapRgba = mapTexelToLinear(mapRgba);
	vec4 chromaKey = vec4(chromaKeyColor, 1.0);
    vec3 chromaKeyDiff = mapRgba.rgb - chromaKey.rgb;
    float chromaKeyValue = smoothstep(threshold - padding, threshold + padding, dot(chromaKeyDiff, chromaKeyDiff));
	/*
	if (isVideo) {
		vec4 playMapRgba = texture2D(playMap, vUvShader);
		playMapRgba = mapTexelToLinear(playMapRgba);
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2) + (playMapRgba.rgb * mapTween * playMapRgba.a), opacity * chromaKeyValue);
	} else {
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);
	}
	*/
	diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
		vec4 lightMapRgba = texture2D(lightMap, vUv2);
		reflectedLight.indirectDiffuse += lightMapTexelToLinear(lightMapRgba).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3(1.0);
	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	gl_FragColor = vec4(outgoingLight, diffuseColor.a);

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
`;

export default class MediaMesh extends InteractiveMesh {

	static getMaterial(useChromaKey) {
		const material = new THREE.ShaderMaterial({
			depthTest: true, // !!!
			depthWrite: true,
			transparent: true,
			// side: THREE.DoubleSide,
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: useChromaKey ? FRAGMENT_CHROMA_KEY_SHADER : FRAGMENT_SHADER,
			uniforms: {
				map: { type: "t", value: Texture.defaultTexture },
				mapResolution: { value: new THREE.Vector2() },
				mapTween: { value: 1 },
				color: { value: new THREE.Color('#FFFFFF') },
				playMap: { type: "t", value: Texture.defaultTexture },
				playMapResolution: { value: new THREE.Vector2() },
				playMapTween: { value: 0 },
				playMapColor: { value: new THREE.Color('#000000') },
				opacity: { value: 0 },
				isVideo: { value: false },
			},
			extensions: {
				fragDepth: true,
			},
		});
		return material;
	}

	static getChromaKeyMaterial(chromaKeyColor = [0.0, 1.0, 0.0]) {
		const material = new THREE.ShaderMaterial({
			depthTest: true, // !!!
			depthWrite: true,
			transparent: true,
			// side: THREE.DoubleSide,
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_CHROMA_KEY_SHADER,
			uniforms: {
				map: { type: "t", value: Texture.defaultTexture },
				mapResolution: { value: new THREE.Vector2() },
				mapTween: { value: 1 },
				color: { value: new THREE.Color('#FFFFFF') },
				playMap: { type: "t", value: Texture.defaultTexture },
				playMapResolution: { value: new THREE.Vector2() },
				playMapTween: { value: 0 },
				playMapColor: { value: new THREE.Color('#000000') },
				opacity: { value: 0 },
				isVideo: { value: false },
			},
			extensions: {
				fragDepth: true,
			},
		});
		return material;
	}

	static isPublisherStream(stream) {
		return stream.clientInfo && stream.clientInfo.role === RoleType.Publisher && stream.clientInfo.uid === stream.getId();
	}
	static isAttendeeStream(stream) {
		return stream.clientInfo && stream.clientInfo.role === RoleType.Attendee && stream.clientInfo.uid === stream.getId();
	}
	static isSmartDeviceStream(stream) {
		return stream.clientInfo && stream.clientInfo.role === RoleType.SmartDevice && stream.clientInfo.uid === stream.getId();
	}
	static isPublisherScreen(stream) {
		return stream.clientInfo && stream.clientInfo.role === RoleType.Publisher && stream.clientInfo.screenUid === stream.getId();
	}
	static isAttendeeScreen(stream) {
		return stream.clientInfo && stream.clientInfo.role === RoleType.Attendee && stream.clientInfo.screenUid === stream.getId();
	}
	static getTypeMatcher(assetType) {
		let matcher;
		switch (assetType.name) {
			case AssetType.PublisherStream.name:
				matcher = this.isPublisherStream;
				break;
			case AssetType.AttendeeStream.name:
				matcher = this.isAttendeeStream;
				break;
			case AssetType.SmartDeviceStream.name:
				matcher = this.isSmartDeviceStream;
				break;
			case AssetType.PublisherScreen.name:
				matcher = this.isPublisherScreen;
				break;
			case AssetType.AttendeeScreen.name:
				matcher = this.isAttendeeScreen;
				break;
			default:
				matcher = (stream) => { return false; }
		}
		return matcher;
	}

	static getStreamId$(item) {
		if (!item.asset) {
			return of(null);
		}
		const assetType = item.asset.type;
		const file = item.asset.file;
		if (assetIsStream(item.asset)) {
			return StreamService.streams$.pipe(
				map((streams) => {
					let stream;
					let i = 0;
					const matchType = this.getTypeMatcher(assetType);
					streams.forEach(x => {
						if (matchType(x)) {
							if (i === item.asset.index) {
								stream = x;
							}
							i++;
						}
					});
					// console.log('MediaMesh.getStreamId$', assetType.name, stream, streams);
					if (stream) {
						return stream.getId();
					} else {
						return null;
					}
				}),
			);
		} else {
			return of(file);
		}
	}

	static getMaterialByItem(item) {
		let material;
		if (item.asset && item.asset.chromaKeyColor) {
			material = MediaMesh.getChromaKeyMaterial(item.asset.chromaKeyColor);
		} else if (item.asset) {
			material = new THREE.MeshBasicMaterial({ color: 0x888888 }); // MediaMesh.getMaterial();
		} else {
			material = new THREE.MeshBasicMaterial({ color: 0x888888 });
		}
		return material;
	}

	static getUniformsByItem(item) {
		let uniforms = null;
		if (item.asset) {
			uniforms = {
				mapTween: 1,
				playMapTween: 0,
				opacity: 0,
			};
		}
		return uniforms;
	}

	get editing() {
		return this.editing_;
	}
	set editing(editing) {
		if (this.editing_ !== editing) {
			this.editing_ = editing;
			if (this.zoomBtn && editing) {
				this.zoomBtn.zoomed = false;
			}
		}
	}

	constructor(item, items, geometry, host) {
		const material = MediaMesh.getMaterialByItem(item);
		super(geometry, material);
		// this.renderOrder = environment.renderOrder.plane;
		this.item = item;
		this.items = items;
		this.host = host;
		this.uniforms = MediaMesh.getUniformsByItem(item);
		const mediaLoader = this.mediaLoader = new MediaLoader(item);
		this.onOver = this.onOver.bind(this);
		this.onOut = this.onOut.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onZoomed = this.onZoomed.bind(this);
		this.addZoomBtn();
		this.addPlayBtn();
		this.userData.render = (time, tick) => {
			this.render(this, time, tick);
		};
	}

	load(callback) {
		this.remove(this.playBtn);
		this.remove(this.zoomBtn);
		if (!this.item.asset) {
			this.onAppear();
			if (typeof callback === 'function') {
				callback(this);
			}
			return;
		}
		const material = this.material;
		const mediaLoader = this.mediaLoader;
		mediaLoader.load((map) => {
			// console.log('MediaMesh.map', map);
			if (map) {
				material.map = map; // !!! Enables USE_MAP
				if (material.uniforms) {
					material.uniforms.map.value = map;
					// material.uniforms.mapResolution.value.x = map.image.width;
					// material.uniforms.mapResolution.value.y = map.image.height;
					material.uniforms.mapResolution.value = new THREE.Vector2(map.image.width || map.image.videoWidth, map.image.height || map.image.videoHeight);
					material.needsUpdate = true;
					if (mediaLoader.isPlayableVideo) {
						this.makePlayMap(map, (playMap) => {
							// console.log('MediaMesh.playMap', playMap);
							playMap.minFilter = THREE.LinearFilter;
							playMap.magFilter = THREE.LinearFilter;
							playMap.mapping = THREE.UVMapping;
							// playMap.format = THREE.RGBFormat;
							playMap.wrapS = THREE.RepeatWrapping;
							playMap.wrapT = THREE.RepeatWrapping;
							material.uniforms.playMap.value = playMap;
							// material.uniforms.playMapResolution.value.x = playMap.image.width;
							// material.uniforms.playMapResolution.value.y = playMap.image.height;
							material.uniforms.playMapResolution.value = new THREE.Vector2(playMap.image.width, playMap.image.height);
							// console.log(material.uniforms.playMapResolution.value, playMap);
							material.needsUpdate = true;
						});
					}
				}
			}
			this.onAppear();
			if (mediaLoader.isPlayableVideo) {
				if (material.uniforms) {
					material.uniforms.isVideo.value = true;
				}
				this.on('over', this.onOver);
				this.on('out', this.onOut);
				this.on('down', this.onToggle);
				this.add(this.playBtn);
			}
			this.add(this.zoomBtn);
			if (typeof callback === 'function') {
				callback(this);
			}
		});
	}

	makePlayMap(map, callback) {
		const aw = map.image.width || map.image.videoWidth;
		const ah = map.image.height || map.image.videoHeight;
		const ar = aw / ah;
		const scale = 0.32;
		const canvas = document.createElement('canvas');
		// document.querySelector('body').appendChild(canvas);
		canvas.width = aw;
		canvas.height = ah;
		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';
		const image = new Image();
		image.onload = function() {
			const bw = image.width;
			const bh = image.height;
			const br = bw / bh;
			let w;
			let h;
			if (ar > br) {
				w = ah * scale;
				h = w / br;
			} else {
				h = aw * scale;
				w = h * br;
			}
			ctx.drawImage(image, aw / 2 - w / 2, ah / 2 - h / 2, w, h);
			const playMap = new THREE.CanvasTexture(canvas);
			if (typeof callback === 'function') {
				callback(playMap);
			}
		}
		image.crossOrigin = 'anonymous';
		image.src = environment.getPath('textures/ui/play.png');
	}

	events$() {
		const item = this.item;
		const items = this.items;
		if (item.asset && item.asset.linkedPlayId) {
			this.freeze();
		}
		return MediaLoader.events$.pipe(
			filter(event => event.loader.item.id === item.id),
			map(event => {
				if (event instanceof MediaLoaderPlayEvent) {
					this.playing = true;
					if (this.playBtn) {
						this.playBtn.playing = true;
					}
					this.emit('playing', true);
					this.onOut();
				} else if (event instanceof MediaLoaderPauseEvent) {
					this.playing = false;
					if (this.playBtn) {
						this.playBtn.playing = false;
					}
					this.emit('playing', false);
					this.onOut();
				} else if (event instanceof MediaLoaderTimeSetEvent) {
					this.emit('currentTime', event.loader.video.currentTime);
				}
				// console.log('MediaMesh', this.playing);
				if (item.asset && item.asset.linkedPlayId) {
					const eventItem = items.find(x => x.asset && event.src.indexOf(x.asset.file) !== -1 && event.id === item.asset.linkedPlayId);
					if (eventItem) {
						// console.log('MediaLoader.events$.eventItem', event, eventItem);
						if (event instanceof MediaLoaderPlayEvent) {
							this.play();
						} else if (event instanceof MediaLoaderPauseEvent) {
							this.pause();
						}
					}
				}
				return event;
			})
		);
	}

	onAppear() {
		const uniforms = this.uniforms;
		const material = this.material;
		if (material.uniforms) {
			gsap.to(uniforms, {
				duration: 0.4,
				opacity: 1,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.uniforms.opacity.value = uniforms.opacity;
					// material.needsUpdate = true;
				},
			});
		}
	}

	onDisappear() {
		const uniforms = this.uniforms;
		const material = this.material;
		if (material.uniforms) {
			gsap.to(uniforms, {
				duration: 0.4,
				opacity: 0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.uniforms.opacity.value = uniforms.opacity;
					// material.needsUpdate = true;
				},
			});
		}
	}

	onOver() {
		const uniforms = this.uniforms;
		const material = this.material;
		if (material.uniforms) {
			gsap.to(uniforms, {
				duration: 0.4,
				mapTween: this.playing ? 0 : 1,
				playMapTween: 1,
				opacity: 1,
				ease: Power2.easeInOut,
				overwrite: true,
				onUpdate: () => {
					material.uniforms.mapTween.value = uniforms.mapTween;
					material.uniforms.playMapTween.value = uniforms.playMapTween;
					material.uniforms.opacity.value = uniforms.opacity;
					// material.needsUpdate = true;
				},
			});
		}
		if (this.playBtn) {
			this.playBtn.onOver();
		}
		// this.zoomBtn.visible = true;
	}

	onOut() {
		const uniforms = this.uniforms;
		const material = this.material;
		if (material.uniforms) {
			gsap.to(uniforms, {
				duration: 0.4,
				mapTween: this.playing ? 0 : 1,
				playMapTween: 0,
				opacity: 1,
				ease: Power2.easeInOut,
				overwrite: true,
				onUpdate: () => {
					material.uniforms.mapTween.value = uniforms.mapTween;
					material.uniforms.playMapTween.value = uniforms.playMapTween;
					material.uniforms.opacity.value = uniforms.opacity;
					// material.needsUpdate = true;
				},
			});
		}
		if (this.playBtn) {
			this.playBtn.onOut();
		}
		// this.zoomBtn.visible = false;
	}

	onToggle() {
		this.playing = this.mediaLoader.toggle();
		if (this.playBtn) {
			this.playBtn.playing = this.playing;
		}
		this.emit('playing', this.playing);
		this.onOut();
	}

	play() {
		this.mediaLoader.play();
		/*
		this.playing = true;
		this.emit('playing', true);
		this.onOut();
		*/
	}

	pause() {
		this.mediaLoader.pause();
		/*
		this.playing = false;
		this.emit('playing', false);
		this.onOut();
		*/
	}

	setPlayingState(playing) {
		if (this.playing !== playing) {
			this.playing = playing;
			playing ? this.mediaLoader.play() : this.mediaLoader.pause();
			this.onOut();
			if (this.playBtn) {
				this.playBtn.playing = playing;
			}
		}
	}

	setZoomedState(zoomed) {
		if (this.zoomBtn) {
			this.zoomBtn.zoomed = zoomed;
		}
	}

	setCurrentTime(currentTime) {
		// !!!
		if (this.mediaLoader.video) {
			this.mediaLoader.video.currentTime = currentTime;
		}
	}

	updateByItem(item) {
		this.disposeMaterial();
		this.disposeMediaLoader();
		this.material = MediaMesh.getMaterialByItem(item);
		this.uniforms = MediaMesh.getUniformsByItem(item);
		this.mediaLoader = new MediaLoader(item);
	}

	disposeMaterial() {
		if (this.material) {
			if (this.material.map && this.material.map.disposable !== false) {
				this.material.map.dispose();
			}
			this.material.dispose();
			this.material = null;
		}
	}

	disposeMediaLoader() {
		const mediaLoader = this.mediaLoader;
		if (mediaLoader) {
			if (mediaLoader.isPlayableVideo) {
				this.off('over', this.onOver);
				this.off('out', this.onOut);
				this.off('down', this.onToggle);
			}
			mediaLoader.dispose();
			this.mediaLoader = null;
		}
	}

	dispose() {
		this.removePlayBtn();
		this.removeZoomBtn();
		this.disposeMediaLoader();
	}

	addPlayBtn() {
		const playBtn = this.playBtn = new MediaPlayMesh(this.host);
		playBtn.on('over', this.onOver);
		playBtn.on('out', this.onOut);
		playBtn.on('down', this.onToggle);
		playBtn.position.z = 0.01;
	}

	removePlayBtn() {
		if (this.playBtn) {
			this.playBtn.off('over', this.onOver);
			this.playBtn.off('out', this.onOut);
			this.playBtn.off('down', this.onToggle);
			this.playBtn.dispose();
			delete this.playBtn;
		}
	}

	onZoomed(zoomed) {
		this.emit('zoomed', zoomed);
	}

	addZoomBtn() {
		const zoomBtn = this.zoomBtn = new MediaZoomMesh(this.host);
		zoomBtn.on('zoomed', this.onZoomed);
		zoomBtn.position.z = 0.01;
	}

	removeZoomBtn() {
		if (this.zoomBtn) {
			this.zoomBtn.off('zoomed', this.onZoomed);
			this.zoomBtn.dispose();
			delete this.zoomBtn;
		}
	}

	updateFromItem(item) {
		if (item.position) {
			this.position.fromArray(item.position);
		}
		if (item.rotation) {
			this.rotation.fromArray(item.rotation);
		}
		if (item.scale) {
			this.scale.fromArray(item.scale);
		}
		if (this.playBtn) {
			this.playBtn.update(this);
		}
		if (this.zoomBtn) {
			this.zoomBtn.update(this);
		}
	}

	render(time, tick) {
		if (this.zoomBtn && !this.editing) {
			this.zoomBtn.render(time, tick);
		}
	}

}
