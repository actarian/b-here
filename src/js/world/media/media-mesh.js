import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import * as THREE from 'three';
import { assetIsStream, AssetType } from '../../asset/asset';
import { environment } from '../../environment';
import StreamService from '../../stream/stream.service';
import { RoleType } from '../../user/user';
import { Host } from '../host/host';
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
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
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
#include <alphatest_pars_fragment>
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
	if (isVideo) {
		vec4 playMapRgba = texture2D(playMap, vUvShader);
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
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>
	#include <output_fragment>
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
#include <alphatest_pars_fragment>
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

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	// main
	vec4 mapRgba = texture2D(map, vUvShader);
	vec4 chromaKey = vec4(chromaKeyColor, 1.0);
    vec3 chromaKeyDiff = mapRgba.rgb - chromaKey.rgb;
    float chromaKeyValue = smoothstep(threshold - padding, threshold + padding, dot(chromaKeyDiff, chromaKeyDiff));
	/*
	if (isVideo) {
		vec4 playMapRgba = texture2D(playMap, vUvShader);
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2) + (playMapRgba.rgb * mapTween * playMapRgba.a), opacity * chromaKeyValue);
	} else {
		diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);
	}
	*/
	// diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);
	diffuseColor = vec4(mapRgba.rgb, opacity * chromaKeyValue);

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
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
			toneMapped: false,
			// side: THREE.DoubleSide,
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: useChromaKey ? FRAGMENT_CHROMA_KEY_SHADER : FRAGMENT_SHADER,
			uniforms: {
				map: { type: 't', value: Texture.defaultTexture },
				mapResolution: { value: new THREE.Vector2() },
				mapTween: { value: 1 },
				color: { value: new THREE.Color('#FFFFFF') },
				playMap: { type: 't', value: Texture.defaultTexture },
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
			toneMapped: false,
			// side: THREE.DoubleSide,
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_CHROMA_KEY_SHADER,
			uniforms: {
				map: { type: 't', value: null }, // Texture.defaultTexture
				mapResolution: { value: new THREE.Vector2() },
				mapTween: { value: 1 },
				color: { value: new THREE.Color('#FFFFFF') },
				chromaKeyColor: { value: new THREE.Color(chromaKeyColor[0], chromaKeyColor[1], chromaKeyColor[2]) },
				playMap: { type: 't', value: Texture.defaultTexture },
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
		material.map = true;
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
		// console.log(stream.clientInfo, stream.clientInfo ? [stream.clientInfo.role, stream.clientInfo.screenUid, stream.getId()] : null);
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
		// console.log(item.asset, assetIsStream(item.asset));
		if (assetIsStream(item.asset)) {
			// console.log('MediaMesh.getStreamId$', item.asset.type.name);
			return StreamService.streams$.pipe(
				map((streams) => {
					let stream;
					let i = 0;
					const matchType = this.getTypeMatcher(assetType);
					streams.forEach(x => {
						// console.log('MediaMesh.getStreamId$', x.clientInfo, x.clientInfo ? [x.clientInfo.screenUid, x.getId()] : null);
						if (matchType(x)) {
							if (i === item.asset.index) {
								stream = x;
							}
							i++;
						}
					});
					if (stream) {
						// console.log('MediaMesh.getStreamId$', assetType.name, stream.clientInfo.role, stream.getId());
						return stream.getId();
					} else {
						// console.log('MediaMesh.getStreamId$.notfound', assetType.name);
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
			// material = new THREE.MeshBasicMaterial({ color: 0x888888 });
			// material = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
			material = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
			// material = new THREE.MeshPhysicalMaterial({ clearcoat: 1, clearcoatRoughness: 0, toneMapped: false, encoding: THREE.sRGBEncoding });
		} else {
			material = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
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
			// this.zoomed = editing ? false : (this.view.type.name === 'media' ? true : this.zoomed);
			this.zoomed = this.view.type.name === 'media' ? true : (editing ? false : this.zoomed);
		}
	}

	constructor(item, view, geometry, host) {
		const material = MediaMesh.getMaterialByItem(item);
		super(geometry, material);
		// this.renderOrder = environment.renderOrder.plane;
		this.item = item;
		this.view = view;
		this.items = view.items;
		this.host = host;
		this.uniforms = MediaMesh.getUniformsByItem(item);
		this.object = new THREE.Object3D();
		this.tempPosition = new THREE.Vector3();
		this.tempRotation = new THREE.Vector3();
		item.silent = this.isAutoplayLoop; // !!!
		const mediaLoader = this.mediaLoader = new MediaLoader(item);
		this.onOver = this.onOver.bind(this);
		this.onOut = this.onOut.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onZoomed = this.onZoomed.bind(this);
		this.addPlayBtn();
		this.addZoomBtn();
		this.userData.render = (time, tick) => {
			this.render(this, time, tick);
		};
	}

	load(callback) {
		if (this.playBtn) {
			this.remove(this.playBtn);
		}
		if (this.zoomBtn) {
			this.remove(this.zoomBtn);
		}
		if (!this.item.asset) {
			this.onAppear();
			if (typeof callback === 'function') {
				callback(this);
			}
			return;
		}
		const material = this.material;
		const mediaLoader = this.mediaLoader;
		const onMediaLoaderLoaded = (texture) => {
			// console.log('MediaMesh.texture', texture);
			const loader = this.mediaLoader;
			if (!loader) {
				return;
			}
			if (texture) {
				// texture.encoding = THREE.sRGBEncoding;
				material.map = texture; // !!! Enables USE_MAP
				if (material.uniforms) {
					material.uniforms.map.value = texture;
					// material.uniforms.mapResolution.value.x = texture.image.width;
					// material.uniforms.mapResolution.value.y = texture.image.height;
					material.uniforms.mapResolution.value = new THREE.Vector2(texture.image.width || texture.image.videoWidth, texture.image.height || texture.image.videoHeight);
					if (loader.isPlayableVideo) {
						this.makePlayMap(texture, (playMap) => {
							// console.log('MediaMesh.playMap', playMap);
							playMap.minFilter = THREE.LinearFilter;
							playMap.magFilter = THREE.LinearFilter;
							playMap.mapping = THREE.UVMapping;
							// playMap.format = THREE.RGBAFormat;
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
			material.needsUpdate = true;
			this.onAppear();
			if (loader.isPlayableVideo && this.playBtn) {
				if (material.uniforms) {
					material.uniforms.isVideo.value = true;
				}
				this.on('over', this.onOver);
				this.on('out', this.onOut);
				this.on('down', this.onToggle);
				this.add(this.playBtn);
			}
			if (this.zoomBtn) {
				this.add(this.zoomBtn);
			}
			if (typeof callback === 'function') {
				callback(this);
			}
		};
		/*
		setTimeout(() => {
			mediaLoader.load(onMediaLoaderLoaded);
		}, 5000);
		*/
		mediaLoader.load(onMediaLoaderLoaded);
	}

	makePlayMap(texture, callback) {
		const aw = texture.image.width || texture.image.videoWidth;
		const ah = texture.image.height || texture.image.videoHeight;
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
			filter(event => (event.loader.item && event.loader.item.id === item.id)),
			map(event => {
				if (event instanceof MediaLoaderPlayEvent) {
					this.playing = true;
					if (!this.isAutoplayLoop) {
						if (this.playBtn) {
							this.playBtn.playing = true;
						}
						this.emit('playing', true);
					}
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
		this.zoomed = this.view.type.name === 'media' ? true : (this.editing ? false : this.zoomed);
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
	}

	pause() {
		this.mediaLoader.pause();
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
		this.zoomed = zoomed;
	}

	setCurrentTime(currentTime) {
		// !!!
		if (this.mediaLoader.video) {
			this.mediaLoader.video.currentTime = currentTime;
		}
	}

	disposeMaterial() {
		if (this.material) {
			if (this.material.map && this.material.map.disposable !== false) {
				this.material.map.dispose();
			}
			this.material.dispose();
			// this.material = null;
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
		// console.log('MediaMesh.dispose');
		this.removePlayBtn();
		this.removeZoomBtn();
		this.disposeMediaLoader();
	}

	get isAutoplayLoop() {
		const isAutoplayLoop = this.view.type.name !== 'media' && this.item.asset && this.item.asset.autoplay && this.item.asset.loop;
		// console.log('MediaMesh', isAutoplayLoop);
		return isAutoplayLoop;
	}

	addPlayBtn() {
		this.removePlayBtn();
		if (!this.isAutoplayLoop) {
			const playBtn = this.playBtn = new MediaPlayMesh(this.host);
			playBtn.on('over', this.onOver);
			playBtn.on('out', this.onOut);
			playBtn.on('down', this.onToggle);
			playBtn.position.z = 0.01;
		}
	}

	removePlayBtn() {
		if (this.playBtn) {
			this.remove(this.playBtn);
			this.playBtn.off('over', this.onOver);
			this.playBtn.off('out', this.onOut);
			this.playBtn.off('down', this.onToggle);
			this.playBtn.dispose();
			delete this.playBtn;
		}
	}

	onZoomed(zoomed) {
		this.zoomed = zoomed;
		this.emit('zoomed', zoomed);
	}

	addZoomBtn() {
		this.removeZoomBtn();
		if (this.view.type.name !== 'media' && (!this.item.asset || !this.item.asset.chromaKeyColor)) {
			const zoomBtn = this.zoomBtn = new MediaZoomMesh(this.host);
			zoomBtn.on('zoomed', this.onZoomed);
		}
	}

	removeZoomBtn() {
		if (this.zoomBtn) {
			this.remove(this.zoomBtn);
			this.zoomBtn.off('zoomed', this.onZoomed);
			this.zoomBtn.dispose();
			this.zoomBtn = null;
			delete this.zoomBtn;
		}
	}

	updateByItem(item) {
		this.disposeMaterial();
		this.disposeMediaLoader();
		this.material = MediaMesh.getMaterialByItem(item);
		this.uniforms = MediaMesh.getUniformsByItem(item);
		this.addPlayBtn();
		this.addZoomBtn();
		item.silent = this.isAutoplayLoop; // !!!
		this.mediaLoader = new MediaLoader(item);
	}

	updateFromItem(item) {
		// console.log('MediaMesh.updateFromItem', item);
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
		/*
		if (this.zoomBtn) {
			this.zoomBtn.update(this);
		}
		*/
		this.updateZoom();
	}

	updateZoom() {
		this.originalPosition = this.position.clone();
		this.originalScale = this.scale.clone();
		this.originalQuaternion = this.quaternion.clone();
		this.object.position.copy(this.originalPosition);
		this.object.scale.copy(this.originalScale);
		this.object.quaternion.copy(this.originalQuaternion);
		if (this.zoomBtn) {
			const scale = this.zoomBtn.scale;
			const position = this.zoomBtn.position;
			const ratio = this.scale.x / this.scale.y;
			const size = 0.1;
			scale.set(size / ratio, size, 1);
			position.x = 0.5 - size / ratio / 2;
			position.y = size / 2 - 0.5;
			position.z = 0.01;
		}
		// console.log('MediaMesh.updateZoom', this.scale);
	}

	// zoom

	render(time, tick) {
		/*
		if (this.zoomBtn && !this.editing) {
			this.zoomBtn.render(time, tick);
		}
		*/
		if (!this.editing) {
			const object = this.object;
			/*
			parent.position.lerp(object.position, 0.2);
			parent.scale.lerp(object.scale, 0.2);
			parent.quaternion.slerp(object.quaternion, 0.2);
			*/
			if (this.zoomed && !this.host.renderer.xr.isPresenting) {
				this.updateObjectMatrix();
			}
			this.position.copy(object.position);
			this.scale.copy(object.scale);
			this.quaternion.copy(object.quaternion);
		}
	}

	updateObjectMatrix() {
		const object = this.object;
		const host = this.host;
		if (this.zoomed) {
			// const cameraGroup = host.cameraGroup;
			const originalScale = this.originalScale;
			let camera = host.camera, fov = camera.fov, aspect = camera.aspect, scale;
			const position = this.tempPosition;
			const rotation = this.tempRotation;
			// const aspect = originalScale.x / originalScale.y;
			scale = 0.01; // 0.01;
			const xr = host.renderer.xr;
			if (xr.isPresenting) {
				camera = xr.getCamera(camera);
				const mat = camera.projectionMatrix.elements;
				const a = mat[0];
				const b = mat[5];
				// const c = mat[10];
				// const d = mat[14];
				aspect = b / a;
				// const k = (c - 1) / (c + 1);
				// const clip_min = (d * (1 - k)) / (2 * k);
				// const clip_max = k * clip_min;
				const RAD2DEG = 180 / 3.14159265358979323846;
				fov = RAD2DEG * (2 * Math.atan(1 / b));
				scale = 1;
			}
			object.scale.copy(originalScale).multiplyScalar(scale);
			const distance = Host.getDistanceToCamera(camera, fov, aspect, object.scale);
			camera.getWorldDirection(rotation);
			rotation.multiplyScalar(distance);
			position.set(0, 0, 0);
			camera.localToWorld(position);
			position.add(rotation);
			object.position.copy(position);
			object.lookAt(Host.origin);
			if (xr.isPresenting) {
				object.position.y -= object.scale.y / 2;
			}
		}
	}

	zoomed_ = false;
	get zoomed() {
		return this.zoomed_;
	}
	set zoomed(zoomed) {
		if (this.zoomed_ !== zoomed) {
			this.zoomed_ = zoomed;
			if (zoomed) {
				this.renderOrder = environment.renderOrder.panel + 5;
				this.material.depthTest = true; // !!! false
				// this.originalPosition = this.position.clone();
				// this.originalQuaternion = this.rotation.clone();
				// this.originalScale = this.scale.clone();
			} else {
				this.renderOrder = 0;
				this.material.depthTest = true;
				this.object.position.copy(this.originalPosition);
				this.object.scale.copy(this.originalScale);
				this.object.quaternion.copy(this.originalQuaternion);
			}
			this.material.needsUpdate = true;
			this.updateObjectMatrix();
			if (this.zoomBtn) {
				this.zoomBtn.zoomed = zoomed;
			}
		}
	}
}
