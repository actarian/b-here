// import * as THREE from 'three';
import { Asset, AssetType } from '../../asset/asset';
import { LanguageService } from '../../language/language.service';
import StateService from '../../state/state.service';
import { PanoramaGridView, ViewType } from '../../view/view';
import InteractiveMesh from '../interactive/interactive.mesh';
import { PanoramaLoader } from './panorama-loader';

export default class Panorama {

	constructor(renderer) {
		this.muted_ = false;
		this.subscription = StateService.state$.subscribe(state => PanoramaLoader.muted = state.volumeMuted);
		this.tween = 0;
		this.create(renderer);
	}

	create(renderer) {
		this.renderer = renderer;
		this.onCubeMapDispose = this.onCubeMapDispose.bind(this);
		const geometry = new THREE.BoxGeometry(202, 202, 202);
		const material = this.getBlackMaterial();
		const mesh = new InteractiveMesh(geometry, material);
		mesh.userData = {
			render: (time, tick, renderer, scene, camera) => {
				mesh.matrixWorld.copyPosition(camera.matrixWorld);
				const cubeMap = this.cubeMap;
				const texture = this.texture;
				if (cubeMap && texture && texture.isVideoTexture) {
					this.updateCubeMapEquirectangularTexture(cubeMap, renderer, texture);
				}
			},
		};
		mesh.name = '[panorama]';
		this.mesh = mesh;
	}

	getBlackMaterial() {
		return new THREE.MeshBasicMaterial({
			name: 'PanoramaStandardMaterial',
			color: 0x000000,
			side: THREE.BackSide,
			depthTest: false,
			depthWrite: false,
			fog: false,
		});
	}

	getShaderMaterial(texture) {
		const material = new THREE.ShaderMaterial({
			name: 'PanoramaCubeMaterial',
			uniforms: this.cloneUniforms(THREE.ShaderLib.cube.uniforms),
			vertexShader: THREE.ShaderLib.cube.vertexShader,
			fragmentShader: THREE.ShaderLib.cube.fragmentShader,
			side: THREE.BackSide,
			depthTest: false,
			depthWrite: false,
			fog: false,
			toneMapped: false,
		});
		texture.mapping = THREE.EquirectangularReflectionMapping;
		const cubeMap = this.toCubeMap(texture, this.renderer);
		material.map = cubeMap;
		material.uniforms.envMap.value = cubeMap;
		material.uniforms.flipEnvMap.value = cubeMap.isCubeTexture && cubeMap._needsFlipEnvMap ? -1 : 1;
		material.needsUpdate = true;
		this.mesh.geometry.deleteAttribute('normal');
		this.mesh.geometry.deleteAttribute('uv');
		Object.defineProperty(material, 'envMap', {
			get: function() {
				return this.uniforms.envMap.value;
			},
			configurable: true
		});
		return material;
	}

	makeEnvMap(texture) {
		let material = this.mesh.material;
		if (!material.uniforms) {
			material.dispose();
			material = this.getShaderMaterial(texture);
			this.mesh.material = material;
		} else {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			const cubeMap = this.toCubeMap(texture, this.renderer);
			material.map = cubeMap;
			material.uniforms.envMap.value = cubeMap;
			material.uniforms.flipEnvMap.value = cubeMap.isCubeTexture && cubeMap._needsFlipEnvMap ? -1 : 1;
			material.needsUpdate = true;
		}
		// console.log('Panorama.makeEnvMap', this.texture, this.cubeMap);
	}

	toCubeMap(texture, renderer) {
		if (this.cubeMap) {
			this.cubeMap.dispose();
		}
		const image = texture.image;
		const height = image.height || image.videoHeight;
		const cubeMap = new THREE.WebGLCubeRenderTarget(height / 2, {
			generateMipmaps: true,
			type: THREE.HalfFloatType,
			encoding: THREE.LinearEncoding,
			// minFilter: THREE.LinearMipmapLinearFilter,
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			// mapping: THREE.CubeReflectionMapping,
			// mapping: THREE.EquirectangularReflectionMapping,
			mapping: THREE.CubeUVReflectionMapping,
			// mapping: THREE.UVMapping,
			format: THREE.RGBAFormat,
		});
		cubeMap.addEventListener('dispose', this.onCubeMapDispose);
		this.setCubeMapEquirectangularTexture(cubeMap, texture);
		this.updateCubeMapEquirectangularTexture(cubeMap, renderer, texture);
		this.cubeMap = cubeMap;
		this.texture = texture;
		return this.mapTextureMapping(cubeMap.texture, texture.mapping);
	}

	setCubeMapEquirectangularTexture(cubeMap, texture) {
		cubeMap.texture.type = texture.type;
		cubeMap.texture.format = THREE.RGBAFormat;
		cubeMap.texture.encoding = THREE.sRGBEncoding;
		cubeMap.texture.generateMipmaps = texture.generateMipmaps;
		cubeMap.texture.minFilter = texture.minFilter;
		cubeMap.texture.magFilter = texture.magFilter;
		cubeMap.texture.needsUpdate = true;
		const shader = {
			uniforms: {
				tEquirect: { value: null },
			},
			vertexShader: /* glsl */ `
					varying vec3 vWorldDirection;
					vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
						return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
					}
					void main() {
						vWorldDirection = transformDirection( position, modelMatrix );
						#include <begin_vertex>
						#include <project_vertex>
					}
				`,
			fragmentShader: /* glsl */ `
					uniform sampler2D tEquirect;
					varying vec3 vWorldDirection;
					#include <common>
					void main() {
						vec3 direction = normalize( vWorldDirection );
						vec2 sampleUV = equirectUv( direction );
						gl_FragColor = texture2D( tEquirect, sampleUV );
					}
				`,
		};
		const geometry = new THREE.BoxGeometry(5, 5, 5);
		const material = new THREE.ShaderMaterial({
			name: 'CubemapFromEquirect',
			uniforms: this.cloneUniforms(shader.uniforms),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: THREE.BackSide,
			blending: THREE.NoBlending,
		});
		material.uniforms.tEquirect.value = texture;
		const mesh = new THREE.Mesh(geometry, material);
		const camera = new THREE.CubeCamera(1, 10, cubeMap);
		cubeMap.camera = camera;
		cubeMap.mesh = mesh;
		return cubeMap;
	}

	updateCubeMapEquirectangularTexture(cubeMap, renderer, texture) {
		const previousMinFilter = texture.minFilter;
		// Avoid blurred poles
		if (texture.minFilter === THREE.LinearMipmapLinearFilter) {
			texture.minFilter = THREE.LinearFilter;
		}
		/*
		const outputEncoding = renderer.outputEncoding;
		const toneMapping = renderer.toneMapping;
		const toneMappingExposure = renderer.toneMappingExposure;
		renderer.toneMapping = THREE.NoToneMapping;
		renderer.outputEncoding = THREE.LinearEncoding;
		renderer.toneMappingExposure = 2;
		*/
		cubeMap.camera.update(renderer, cubeMap.mesh);
		/*
		renderer.toneMapping = toneMapping;
		renderer.outputEncoding = outputEncoding;
		renderer.toneMappingExposure = toneMappingExposure;
		*/
		texture.minFilter = previousMinFilter;
		// console.log('updateCubeMapEquirectangularTexture');
	}

	cloneUniforms(src) {
		const dst = {};
		for (const u in src) {
			dst[u] = {};
			for (const p in src[u]) {
				const property = src[u][p];
				if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) {
					dst[u][p] = property.clone();
				} else if (Array.isArray(property)) {
					dst[u][p] = property.slice();
				} else {
					dst[u][p] = property;
				}
			}
		}
		return dst;
	}

	mapTextureMapping(texture, mapping) {
		if (mapping === THREE.EquirectangularReflectionMapping) {
			texture.mapping = THREE.CubeReflectionMapping;
		} else if (mapping === THREE.EquirectangularRefractionMapping) {
			texture.mapping = THREE.CubeRefractionMapping;
		}
		return texture;
	}

	onCubeMapDispose() {
		const cubeMap = this.cubeMap;
		if (cubeMap) {
			// console.log('Panorama.onCubeMapDispose', cubeMap);
			cubeMap.removeEventListener('dispose', this.onCubeMapDispose);
			cubeMap.texture.dispose();
			cubeMap.mesh.geometry.dispose();
			cubeMap.mesh.material.dispose();
			if (cubeMap !== undefined) {
				this.cubeMap = null;
			}
		}
	}

	change(view, renderer, callback, onexit) {
		const item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
		const material = this.mesh.material;
		this.load(item, renderer, (envMap) => {
			if (typeof onexit === 'function') {
				onexit(view);
			}
			if (material.uniforms && material.uniforms.uTween) {
				material.uniforms.uTween.value = 1;
				material.needsUpdate = true;
			}
			if (typeof callback === 'function') {
				callback(envMap);
			}
		});
	}

	crossfade(item, renderer, callback) {
		const material = this.mesh.material;
		this.load(item, renderer, (envMap) => {
			if (material.uniforms && material.uniforms.uTween) {
				material.uniforms.uTween.value = 1;
				material.needsUpdate = true;
			}
			if (typeof callback === 'function') {
				callback(envMap);
			}
		});
	}

	getLocalizedAsset(asset) {
		if (asset && asset.locale) {
			const localizedAsset = asset.locale[LanguageService.lang];
			if (localizedAsset) {
				asset = localizedAsset;
			}
		}
		return asset;
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
		const localizedAsset = this.getLocalizedAsset(asset);
		// console.log('Panorama.load.localizedAsset', localizedAsset, 'asset', asset);
		this.currentAsset = localizedAsset.folder + localizedAsset.file;
		PanoramaLoader.load(localizedAsset, renderer, (texture, rgbe) => {
			if (localizedAsset.folder + localizedAsset.file !== this.currentAsset) {
				texture.dispose();
				return;
			}
			const envMap = this.makeEnvMap(texture);
			if (typeof callback === 'function') {
				callback(envMap);
			}
		});
	}

	dispose() {
		this.subscription.unsubscribe();
		if (this.cubeMap) {
			this.cubeMap.dispose();
		}
	}
}
