// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { environment } from '../../environment';
import LoaderService from '../../loader/loader.service';
import { ViewType } from '../../view/view';
import InteractiveMesh from '../interactive/interactive.mesh';
import WorldComponent from '../world.component';
import ModelEditableComponent from './model-editable.component';

export default class ModelModelComponent extends ModelEditableComponent {

	/*
	static getInteractiveGeometry() {
		return ModelModelComponent.interactiveGeometry || (ModelModelComponent.interactiveGeometry = new THREE.SphereBufferGeometry(1, 8, 8));
	}
	*/

	onInit() {
		super.onInit();
		this.progress = null;
		this.isPresenting = false;
		/*
		if (this.view.type.name === ViewType.Model.name) {
			const vrService = this.vrService = VRService.getService();
			vrService.session$.pipe(
				takeUntil(this.unsubscribe$),
			).subscribe((session) => {
				this.onUpdateVRSession(session);
			});
		}
		*/
		// console.log('ModelModelComponent.onInit');
	}

	onChanges() {
		this.editing = this.item.selected;
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.model;
		this.loadGltfModel(environment.getPath(this.item.asset.folder), this.item.asset.file, (mesh) => {
			this.onGltfModelLoaded(mesh, mount, dismount);
		});
	}

	loadGltfModel(path, file, callback) {
		const renderer = this.host.renderer;
		// const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
		const progressRef = LoaderService.getRef();
		// console.log('progressRef');
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
			LoaderService.setProgress(progressRef, 1);
			// this.progress = null;
			// this.pushChanges();
			// roughnessMipmapper.dispose();
		}, (progressEvent) => {
			/*
			let value = this.progress ? this.progress.value : 0;
			if (progressEvent.lengthComputable) {
				value = Math.round(progressEvent.loaded / progressEvent.total * 100);
			} else {
				value = Math.floor(Math.min(100, value + 0.1));
			}
			this.progress = { value, title: `${value}%` };
			// console.log('progressEvent', progressEvent.loaded, progressEvent.total);
			this.pushChanges();
			*/
			LoaderService.setProgress(progressRef, progressEvent.loaded, progressEvent.total);
		});
	}

	onGltfModelLoaded(mesh, mount, dismount) {
		// scale
		const box = new THREE.Box3().setFromObject(mesh);
		const size = box.max.clone().sub(box.min);
		const max = Math.max(size.x, size.y, size.z);
		const scale = 1.7 / max;
		mesh.scale.set(scale, scale, scale);
		// repos
		let dummy;
		const view = this.view;
		const item = this.item;
		if (view.type.name === ViewType.Model.name) {
			// this.onUpdateVRSession(this.vrService.currentSession);
			dummy = new THREE.Group();
			dummy.add(mesh);
			box.setFromObject(dummy);
			const center = box.getCenter(new THREE.Vector3());
			dummy.position.set(
				mesh.position.x - center.x,
				mesh.position.y - center.y,
				mesh.position.z - center.z + (this.host.renderer.xr.isPresenting ? -2 : 0),
				// mesh.position.z - center.z,
			);
			const endY = dummy.position.y;
			const from = { tween: 1 };
			const onUpdate = () => {
				dummy.position.y = endY + 3 * from.tween;
				dummy.rotation.y = 0 + Math.PI * from.tween;
			};
			onUpdate();
			this.makeInteractive(mesh);
			gsap.to(from, {
				duration: 1.5,
				tween: 0,
				delay: 0.1,
				ease: Power2.easeInOut,
				onUpdate: onUpdate,
				onComplete: () => {
					this.updateHelper();
				}
			});
		} else {
			box.setFromObject(mesh);
			const center = box.getCenter(new THREE.Vector3());
			mesh.position.set(
				- center.x,
				- center.y,
				- center.z,
			);
			dummy = new THREE.Group();
			dummy.add(mesh);
			if (item.position) {
				dummy.position.fromArray(item.position);
			}
			if (item.rotation) {
				dummy.rotation.fromArray(item.rotation);
			}
			if (item.scale) {
				dummy.scale.fromArray(item.scale);
			}
			this.makeInteractive(mesh);
			/*
			const geometry = ModelModelComponent.getInteractiveGeometry();
			const sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
				depthTest: false,
				depthWrite: false,
				transparent: true,
				// wireframe: true,
				// opacity: 1.0,
				opacity: 0.0,
				color: 0x00ffff,
			}));
			const radius = max * scale / 1.7;
			sphere.scale.set(radius, radius, radius);
			sphere.name = `[model] ${this.item.id}`;
			// sphere.depthTest = false;
			sphere.renderOrder = 0;
			dummy.add(sphere);
			sphere.on('down', () => {
				// console.log('ModelModelComponent.down');
				this.down.next(this);
			});
			*/
			this.updateHelper();
		}
		if (typeof mount === 'function') {
			mount(dummy, this.item);
		}
		/*
		this.progress = null;
		this.pushChanges();
		*/
	}

	/*
	onUpdateVRSession(session) {
		const mesh = this.mesh;
		if (session && mesh) {
			mesh.position.z = -2;
		}
	}
	*/

	render(time, tick) {
		const view = this.view;
		const item = this.item;
		const mesh = this.mesh;
		const isPresenting = this.host.renderer.xr.isPresenting;
		const group = this.group;
		if (mesh) {
			if (view.type.name === ViewType.Model.name) {
				if (this.isPresenting !== isPresenting) {
					this.isPresenting = isPresenting;
					if (isPresenting) {
						mesh.position.x = 0;
						mesh.position.y = 0;
						mesh.position.z = -2;
						mesh.rotation.y = 0;
					} else {
						mesh.position.x = 0;
						mesh.position.y = 0;
						mesh.position.z = 0;
						mesh.rotation.y = 0;
					}
				}
				if (isPresenting) {
					mesh.rotation.y -= (Math.PI / 180 / 60 * 5);
				}
			} else {
				if (isPresenting) {
					mesh.rotation.y -= (Math.PI / 180 / 60 * 5);
				}
			}
		}
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		// console.log('ModelModelComponent.onUpdate', item);
		const view = this.view;
		if (view.type.name !== ViewType.Model.name) {
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
		this.updateHelper();
	}

	// called by UpdateViewItemComponent
	onUpdateAsset(item, mesh) {
		// console.log('ModelModelComponent.onUpdateAsset', item);
		this.loadGltfModel(environment.getPath(item.asset.folder), item.asset.file, (mesh) => {
			this.onGltfModelLoaded(mesh, (mesh, item) => this.onMount(mesh, item), (mesh, item) => this.onDismount(mesh, item));
		});
		/*
		this.mesh.updateByItem(item);
		this.mesh.load(() => {
			// console.log('ModelModelComponent.mesh.load.complete');
		});
		*/
	}

	// called by WorldComponent
	onDragMove(position) {
		// console.log('ModelModelComponent.onDragMove', position);
		this.editing = true;
		const view = this.view;
		if (view.type.name !== ViewType.Model.name) {
			this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(4);
			// this.mesh.lookAt(ModelModelComponent.ORIGIN);
		}
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		// console.log('ModelModelComponent.onDragEnd');
		const view = this.view;
		if (view.type.name !== ViewType.Model.name) {
			this.item.position = this.mesh.position.toArray();
			this.item.rotation = this.mesh.rotation.toArray();
			this.item.scale = this.mesh.scale.toArray();
		}
		this.editing = false;
	}

	makeInteractive(mesh) {
		let newChild = null;
		mesh.traverse((child) => {
			if (newChild === null && child.isMesh && !(child instanceof InteractiveMesh)) {
				// roughnessMipmapper.generateMipmaps(child.material);
				const parent = child.parent;
				newChild = new InteractiveMesh(child.geometry, child.material);
				// newChild.depthTest = true;
				// newChild.renderOrder = 0;
				newChild.name = child.name;
				newChild.position.copy(child.position);
				newChild.rotation.copy(child.rotation);
				newChild.scale.copy(child.scale);
				newChild.on('down', () => {
					// console.log('ModelModelComponent.down');
					this.down.next(this);
				});
				parent.remove(child);
				parent.add(newChild);
			}
		});
		if (newChild !== null) {
			this.makeInteractive(mesh);
		}
	}

}

ModelModelComponent.ORIGIN = new THREE.Vector3();

ModelModelComponent.meta = {
	selector: '[model-model]',
	hosts: { host: WorldComponent },
	outputs: ['down'],
	inputs: ['item', 'view'],
};
