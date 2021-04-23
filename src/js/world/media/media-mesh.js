import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { assetIsStream, AssetType } from '../../asset/asset';
import { environment } from '../../environment';
import StreamService from '../../stream/stream.service';
import { RoleType } from '../../user/user';
import InteractiveMesh from '../interactive/interactive.mesh';
import MediaLoader, { MediaLoaderPauseEvent, MediaLoaderPlayEvent } from './media-loader';

const VERTEX_SHADER = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
varying vec4 modelViewPosition;
varying vec3 vecNormal;

void main() {
	vUv = uv;
	vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
	vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz; //????????
	gl_Position = projectionMatrix * modelViewPosition;
}
`;

const FRAGMENT_SHADER = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
uniform bool video;
uniform float opacity;
uniform float overlay;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;
uniform vec3 overlayColor;

void main() {
	vec4 color;
	vec4 colorA = texture2D(textureA, vUv);
	if (video) {
		vec4 colorB = texture2D(textureB, vUv);
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2) + (colorB.rgb * tween * colorB.a), opacity);
	} else {
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity);
	}
	gl_FragColor = color;
}
`;

const FRAGMENT_CHROMA_KEY_SHADER = `
#extension GL_EXT_frag_depth : enable

#define threshold 0.55
#define padding 0.05

varying vec2 vUv;
uniform bool video;
uniform float opacity;
uniform float overlay;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;
uniform vec3 chromaKeyColor;
uniform vec3 overlayColor;

void main() {
	vec4 color;
	vec4 colorA = texture2D(textureA, vUv);
	vec4 chromaKey = vec4(chromaKeyColor, 1.0);
    vec3 chromaKeyDiff = colorA.rgb - chromaKey.rgb;
    float chromaKeyValue = smoothstep(threshold - padding, threshold + padding, dot(chromaKeyDiff, chromaKeyDiff));
	color = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity * chromaKeyValue);
	gl_FragColor = color;
}
`;

export default class MediaMesh extends InteractiveMesh {

	static getMaterial(useChromaKey) {
		const material = new THREE.ShaderMaterial({
			depthTest: false, // !!!
			depthWrite: true,
			transparent: true,
			// side: THREE.DoubleSide,
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: useChromaKey ? FRAGMENT_CHROMA_KEY_SHADER : FRAGMENT_SHADER,
			uniforms: {
				video: { value: false },
				textureA: { type: "t", value: null },
				textureB: { type: "t", value: null },
				resolutionA: { value: new THREE.Vector2() },
				resolutionB: { value: new THREE.Vector2() },
				overlayColor: { value: new THREE.Color('#000000') },
				overlay: { value: 0 },
				tween: { value: 1 },
				opacity: { value: 0 },
			},
		});
		return material;
	}

	static getChromaKeyMaterial(chromaKeyColor = [0.0, 1.0, 0.0]) {
		const material = new THREE.ShaderMaterial({
			depthTest: false, // !!!
			depthWrite: false,
			transparent: true,
			// side: THREE.DoubleSide
			// blending: THREE.AdditiveBlending,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_CHROMA_KEY_SHADER,
			uniforms: {
				video: { value: false },
				textureA: { type: "t", value: null },
				textureB: { type: "t", value: null },
				resolutionA: { value: new THREE.Vector2() },
				resolutionB: { value: new THREE.Vector2() },
				chromaKeyColor: { value: new THREE.Vector3(chromaKeyColor[0], chromaKeyColor[1], chromaKeyColor[2]) },
				overlayColor: { value: new THREE.Color('#000000') },
				overlay: { value: 0 },
				tween: { value: 1 },
				opacity: { value: 0 },
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
			material = MediaMesh.getMaterial();
		} else {
			material = new THREE.MeshBasicMaterial({ color: 0x888888 });
		}
		return material;
	}

	static getUniformsByItem(item) {
		let uniforms = null;
		if (item.asset) {
			uniforms = {
				overlay: 0,
				tween: 1,
				opacity: 0,
			};
		}
		return uniforms;
	}

	constructor(item, items, geometry) {
		const material = MediaMesh.getMaterialByItem(item);
		super(geometry, material);
		// this.renderOrder = environment.renderOrder.plane;
		this.item = item;
		this.items = items;
		this.uniforms = MediaMesh.getUniformsByItem(item);
		const mediaLoader = this.mediaLoader = new MediaLoader(item);
		/*
		if (item.asset && !mediaLoader.isVideo) {
			this.freeze();
		}
		*/
	}

	load(callback) {
		if (!this.item.asset) {
			this.onAppear();
			if (typeof callback === 'function') {
				callback(this);
			}
			return;
		}
		const material = this.material;
		const mediaLoader = this.mediaLoader;
		mediaLoader.load((textureA) => {
			// console.log('MediaMesh.textureA', textureA);
			if (textureA) {
				material.uniforms.textureA.value = textureA;
				// material.uniforms.resolutionA.value.x = textureA.image.width;
				// material.uniforms.resolutionA.value.y = textureA.image.height;
				material.uniforms.resolutionA.value = new THREE.Vector2(textureA.image.width || textureA.image.videoWidth, textureA.image.height || textureA.image.videoHeight);
				material.needsUpdate = true;
				if (mediaLoader.isPlayableVideo) {
					this.createTextureB(textureA, (textureB) => {
						// console.log('MediaMesh.textureB', textureB);
						textureB.minFilter = THREE.LinearFilter;
						textureB.magFilter = THREE.LinearFilter;
						textureB.mapping = THREE.UVMapping;
						// textureB.format = THREE.RGBFormat;
						textureB.wrapS = THREE.RepeatWrapping;
						textureB.wrapT = THREE.RepeatWrapping;
						material.uniforms.textureB.value = textureB;
						// material.uniforms.resolutionB.value.x = textureB.image.width;
						// material.uniforms.resolutionB.value.y = textureB.image.height;
						material.uniforms.resolutionB.value = new THREE.Vector2(textureB.image.width, textureB.image.height);
						// console.log(material.uniforms.resolutionB.value, textureB);
						material.needsUpdate = true;
					});
				}
			}
			this.onAppear();
			if (mediaLoader.isPlayableVideo) {
				material.uniforms.video.value = true;
				this.onOver = this.onOver.bind(this);
				this.onOut = this.onOut.bind(this);
				this.onToggle = this.onToggle.bind(this);
				this.on('over', this.onOver);
				this.on('out', this.onOut);
				this.on('down', this.onToggle);
			}
			if (typeof callback === 'function') {
				callback(this);
			}
		});
	}

	createTextureB(textureA, callback) {
		const aw = textureA.image.width || textureA.image.videoWidth;
		const ah = textureA.image.height || textureA.image.videoHeight;
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
			const textureB = new THREE.CanvasTexture(canvas);
			if (typeof callback === 'function') {
				callback(textureB);
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
					this.emit('playing', true);
					this.onOut();
				} else if (event instanceof MediaLoaderPauseEvent) {
					this.playing = false;
					this.emit('playing', false);
					this.onOut();
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
					material.needsUpdate = true;
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
					material.needsUpdate = true;
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
				overlay: 1,
				tween: this.playing ? 0 : 1,
				opacity: 1,
				ease: Power2.easeInOut,
				overwrite: true,
				onUpdate: () => {
					material.uniforms.overlay.value = uniforms.overlay;
					material.uniforms.tween.value = uniforms.tween;
					material.uniforms.opacity.value = uniforms.opacity;
					material.needsUpdate = true;
				},
			});
		}
	}

	onOut() {
		const uniforms = this.uniforms;
		const material = this.material;
		if (material.uniforms) {
			gsap.to(uniforms, {
				duration: 0.4,
				overlay: 0,
				tween: this.playing ? 0 : 1,
				opacity: 1,
				ease: Power2.easeInOut,
				overwrite: true,
				onUpdate: () => {
					material.uniforms.overlay.value = uniforms.overlay;
					material.uniforms.tween.value = uniforms.tween;
					material.uniforms.opacity.value = uniforms.opacity;
					material.needsUpdate = true;
				},
			});
		}
	}

	onToggle() {
		this.playing = this.mediaLoader.toggle();
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
		this.disposeMediaLoader();
	}
}

const VERTEX_SHADER_BASE = `
#extension GL_EXT_frag_depth : enable

#include <common>
#include <uv_pars_vertex>
// #include <uv2_pars_vertex>
// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
// #include <color_pars_vertex>
// #include <fog_pars_vertex>
// #include <morphtarget_pars_vertex>
// #include <skinning_pars_vertex>
// #include <shadowmap_pars_vertex>
// #include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

varying vec2 vUv;
void main() {
	#include <uv_vertex>
	// #include <uv2_vertex>
	// #include <color_vertex>
	#include <beginnormal_vertex>
	// #include <morphnormal_vertex>
	// #include <skinbase_vertex>
	// #include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	// vUv = uv;
	// gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	#include <begin_vertex>
	// #include <morphtarget_vertex>
	// #include <skinning_vertex>
	// #include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	// #include <envmap_vertex>
	// #include <shadowmap_vertex>
	// #include <fog_vertex>
}
`;

const FRAGMENT_SHADER_BASE = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
uniform bool video;
uniform float opacity;
uniform float overlay;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;
uniform vec3 overlayColor;

// uniform vec3 diffuse;
// uniform vec3 emissive;
// uniform vec3 specular;
// uniform float shininess;
// uniform float opacity;

#include <common>
#include <packing>
// #include <dithering_pars_fragment>
// #include <color_pars_fragment>
#include <uv_pars_fragment>
// #include <uv2_pars_fragment>
// #include <map_pars_fragment>
// #include <alphamap_pars_fragment>
// #include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
// #include <emissivemap_pars_fragment>
// #include <envmap_pars_fragment>
// #include <gradientmap_pars_fragment>
// #include <fog_pars_fragment>
// #include <bsdfs>
// #include <lights_pars>
// #include <lights_phong_pars_fragment>
// #include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>

	/*
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	*/

	#include <logdepthbuf_fragment>
	// #include <map_fragment>
	// #include <color_fragment>
	// #include <alphamap_fragment>
	// #include <alphatest_fragment>
	// #include <specularmap_fragment>
	#include <normal_fragment>
	// #include <emissivemap_fragment>

	// accumulation
	// #include <lights_phong_fragment>
	// #include <lights_template>

	// modulation
	// #include <aomap_fragment>

	// vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	// #include <envmap_fragment>

	vec4 color;
	vec4 colorA = texture2D(textureA, vUv);
	if (video) {
		vec4 colorB = texture2D(textureB, vUv);
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2) + (colorB.rgb * tween * colorB.a), opacity);
	} else {
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity);
	}
	gl_FragColor = color;

	// gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	// #include <tonemapping_fragment>
	// #include <encodings_fragment>
	// #include <fog_fragment>
	// #include <premultiplied_alpha_fragment>
	// #include <dithering_fragment>
}
`;
