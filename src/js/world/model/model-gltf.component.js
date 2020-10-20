import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { environment } from '../../environment';
import VRService from '../vr.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export const FAR_POSITION = 4;

export default class ModelGltfComponent extends ModelComponent {

	onInit() {
		super.onInit();
		this.progress = 0;
		const group = this.group;
		// group.position.x = this.host.renderer.xr.isPresenting ? FAR_POSITION : 0;
		const vrService = this.vrService = VRService.getService();
		vrService.session$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((session) => {
			if (session) {
				// group.position.x = FAR_POSITION;
			} else {
				// group.position.x = 0;
			}
		});
		// console.log('ModelGltfComponent.onInit');
	}

	createStand() {
		const geometry = new THREE.BoxBufferGeometry(3, 3, 3);
		const material = new THREE.MeshBasicMaterial();
		/*
		const material = new THREE.ShaderMaterial({
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			uniforms: {
				texture: { type: "t", value: null },
				resolution: { value: new THREE.Vector2() }
			},
		});
		*/
		const stand = this.stand = new THREE.Mesh(geometry, material);
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.model;
		this.loadGltfModel(environment.getPath(this.item.asset.folder), this.item.asset.file, (mesh) => {
			// scale
			const box = new THREE.Box3().setFromObject(mesh);
			const size = box.max.clone().sub(box.min);
			const max = Math.max(size.x, size.y, size.z);
			const scale = 1.7 / max;
			// mesh.position.y = -1 + size.y / 2 * scale;
			// const scale = 2.5 / size.length();
			mesh.scale.set(scale, scale, scale);
			// repos
			const dummy = new THREE.Group();
			dummy.add(mesh);
			box.setFromObject(dummy);
			const center = box.getCenter(new THREE.Vector3());
			dummy.position.set(
				mesh.position.x - center.x,
				mesh.position.y - center.y, // center
				// mesh.position.y - center.y + size.y / 2 * scale - 0.5, // bottom
				mesh.position.z - center.z + (this.host.renderer.xr.isPresenting ? -2 : 0),
			);
			const endY = dummy.position.y;
			const endRotationY = 0;
			const from = { tween: 1 };
			const onUpdate = () => {
				dummy.position.y = endY + 3 * from.tween;
				dummy.rotation.y = 0 + Math.PI * from.tween;
			};
			onUpdate();
			gsap.to(from, {
				duration: 1.5,
				tween: 0,
				delay: 0.1,
				ease: Power2.easeInOut,
				onUpdate: onUpdate
			});
			// stand
			/*
			this.createStand();
			this.stand.position.y = -2;
			this.group.add(this.stand);
			*/
			//
			if (typeof mount === 'function') {
				mount(dummy);
			}
			this.progress = 0;
			this.pushChanges();
		});
		/*
		this.loadRgbeBackground(environment.getPath(this.item.asset.folder), this.item.asset.file, (envMap) => {
			this.loadGltfModel(environment.getPath(this.item.asset.folder), this.item.asset.file, (mesh) => {
				const box = new THREE.Box3().setFromObject(mesh);
				const center = box.getCenter(new THREE.Vector3());
				mesh.position.x += (mesh.position.x - center.x);
				mesh.position.y += (mesh.position.y - center.y);
				mesh.position.z += (mesh.position.z - center.z);
				const size = box.max.clone().sub(box.min).length();
				const scale = 2.5 / size;
				mesh.scale.set(scale, scale, scale);
				if (typeof callback === 'function') {
					callback(mesh);
				}
			});
		});
		*/
	}

	loadGltfModel(path, file, callback) {
		const renderer = this.host.renderer;
		// const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
		const loader = new THREE.GLTFLoader().setPath(path);
		loader.load(file, (gltf) => {
			/*
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					// roughnessMipmapper.generateMipmaps(child.material);
				}
			});
			*/
			if (typeof callback === 'function') {
				callback(gltf.scene);
			}
			this.progress = 0;
			this.pushChanges();
			// roughnessMipmapper.dispose();
		}, (progressEvent) => {
			if (progressEvent.lengthComputable) {
				this.progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
			} else {
				this.progress = this.progress || 0;
				this.progress = Math.min(100, this.progress + 1);
			}
			// console.log('progressEvent', progressEvent.loaded, progressEvent.total);
			this.pushChanges();
		});
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		if (item.position) {
			mesh.position.fromArray(item.position);
		}
		if (item.rotation) {
			mesh.rotation.fromArray(item.rotation);
		}
		if (item.scale) {
			mesh.scale.fromArray(item.scale);
		}
	}
}

ModelGltfComponent.meta = {
	selector: '[model-gltf]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
