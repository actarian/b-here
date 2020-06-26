import * as THREE from 'three';
import InteractiveMesh from '../interactive/interactive.mesh';
import MediaLoader from './media-loader';

const VERTEX_SHADER = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
uniform float opacity;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;

void main() {
	vec4 colorA = texture2D(textureA, vUv);
	vec2 uv2 = clamp(vec2(
		(vUv.x - (resolutionA.x - resolutionB.x) / resolutionA.x * 0.5) / resolutionB.x * resolutionA.x,
		(vUv.y - (resolutionA.y - resolutionB.y) / resolutionA.y * 0.5) / resolutionB.y * resolutionA.y
	), vec2(0.0,0.0), vec2(1.0,1.0));
	vec4 colorB = texture2D(textureB, uv2);
	vec4 color = vec4(colorA.rgb + colorB.rgb * tween * colorB.a, opacity);
	gl_FragColor = color;
}
`;

export default class MediaMesh extends InteractiveMesh {

	static getMaterial() {
		const material = new THREE.ShaderMaterial({
			// depthTest: false,
			transparent: true,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			uniforms: {
				textureA: { type: "t", value: null },
				textureB: { type: "t", value: null },
				resolutionA: { value: new THREE.Vector2() },
				resolutionB: { value: new THREE.Vector2() },
				tween: { value: 0 },
				opacity: { value: 0 },
			},
		});
		/*
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
		});
		*/
		return material;
	}

	constructor(item, geometry, material) {
		material = material || MediaMesh.getMaterial();
		super(geometry, material);
		this.item = item;
		this.tween = 0;
		this.opacity = 0;
		const mediaLoader = this.mediaLoader = new MediaLoader(item);
		if (!mediaLoader.isVideo) {
			this.freeze();
		}
	}

	load(callback) {
		const material = this.material;
		const mediaLoader = this.mediaLoader;
		mediaLoader.load((textureA) => {
			material.uniforms.textureA.value = textureA;
			material.uniforms.resolutionA.value = new THREE.Vector2(textureA.image.width || textureA.image.videoWidth, textureA.image.height || textureA.image.videoHeight);
			// console.log(material.uniforms.resolutionA.value, textureA);
			material.needsUpdate = true;
			this.onAppear();
			if (mediaLoader.isPlayableVideo) {
				this.onOver = this.onOver.bind(this);
				this.onOut = this.onOut.bind(this);
				this.on('over', this.onOver);
				this.on('out', this.onOut);
				this.on('down', mediaLoader.toggle);
			}
			if (typeof callback === 'function') {
				callback(this);
			}
		});
		const textureB = MediaLoader.loadTexture({ folder: 'ui/', file: 'play.png' }, (textureB) => {
			textureB.minFilter = THREE.LinearFilter;
			textureB.magFilter = THREE.LinearFilter;
			textureB.mapping = THREE.UVMapping;
			// textureB.format = THREE.RGBFormat;
			textureB.wrapS = THREE.RepeatWrapping;
			textureB.wrapT = THREE.RepeatWrapping;
			material.uniforms.textureB.value = textureB;
			material.uniforms.resolutionB.value = new THREE.Vector2(textureB.image.width, textureB.image.height);
			// console.log(material.uniforms.resolutionB.value, textureB);
			material.needsUpdate = true;
		});
	}

	onAppear() {
		const o = { opacity: 0 };
		gsap.to(o, 0.4, {
			opacity: 1,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.material.uniforms.opacity.value = o.opacity;
				this.material.needsUpdate = true;
			},
		});
	}

	onOver() {
		gsap.to(this, 0.4, {
			tween: 1,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.material.uniforms.tween.value = this.tween;
				this.material.needsUpdate = true;
			},
		});
	}

	onOut() {
		gsap.to(this, 0.4, {
			tween: 0,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.material.uniforms.tween.value = this.tween;
				this.material.needsUpdate = true;
			},
		});
	}

	dispose() {
		const mediaLoader = this.mediaLoader;
		if (mediaLoader.isPlayableVideo) {
			this.off('over', this.onOver);
			this.off('out', this.onOut);
			this.off('down', mediaLoader.toggle);
		}
		mediaLoader.dispose();
	}

}
