import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
// import { DRACOLoader } from '../loaders/DRACOLoader';
// import { GLTFLoader } from '../loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MenuService from '../../editor/menu/menu.service';
import { environment } from '../../environment';
import LoaderService from '../../loader/loader.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const SHOULD_SCALE = false;

export default class ModelRoomComponent extends ModelComponent {

	static get transparentMaterial() {
		if (!this.transparentMaterial_) {
			this.transparentMaterial_ = new THREE.MeshBasicMaterial({
				color: 0xff0000,
				transparent: true,
				opacity: 0,
				// side: THREE.DoubleSide
			});
		}
		return this.transparentMaterial_;
	}

	get freezed() {
		return this.freezed_;
	}
	set freezed(freezed) {
		if (this.freezed_ !== freezed) {
			this.freezed_ = freezed;
			const mesh = this.mesh;
			if (mesh) {
				mesh.traverse((child) => {
					if (child.isInteractiveMesh) {
						child.freezed = freezed;
					}
				});
			}
		}
	}

	onInit() {
		// console.log('ModelRoomComponent.onInit');
		super.onInit();
		this.isPresenting = false;
		MenuService.active$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(active => this.freezed = active);
	}

	onChanges() {
		this.editing = this.view.selected;
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.room;
		this.loadGlb(environment.getPath(this.view.asset.folder), this.view.asset.file, (mesh, animations) => {
			this.onGlbLoaded(mesh, animations, mount, dismount);
		});
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	loadGlb(path, file, callback) {
		const renderer = this.host.renderer;
		// const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
		const progressRef = LoaderService.getRef();
		// console.log('progressRef');
		const loader = new GLTFLoader().setPath(path);
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		const decoderPath = `${environment.dist}js/draco/`;
		// console.log(decoderPath);
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath(decoderPath);
		loader.setDRACOLoader(dracoLoader);
		loader.load(file, (glb) => {
			/*
			glb.scene.traverse((child) => {
				if (child.isMesh) {
					// roughnessMipmapper.generateMipmaps(child.material);
				}
			});
			*/
			if (typeof callback === 'function') {
				callback(glb.scene, glb.animations);
			}
			// console.log('ModelRoomComponent.loadGlb');
			LoaderService.setProgress(progressRef, 1);
			// roughnessMipmapper.dispose();
		}, (progressEvent) => {
			LoaderService.setProgress(progressRef, progressEvent.loaded, progressEvent.total);
		});
	}

	onGlbLoaded(mesh, animations, mount, dismount) {
		const view = this.view;
		// scale
		if (SHOULD_SCALE) {
			const box = new THREE.Box3().setFromObject(mesh);
			const size = box.max.clone().sub(box.min);
			const min = Math.min(size.x, size.y, size.z);
			const scale = 12 / min;
			mesh.scale.set(scale, scale, scale);
		}
		mesh.position.set(0, -1.76, 0);
		// nav
		const intersectObjects = [];
		mesh.traverse((child) => {
			if (child.isMesh) {
				intersectObjects.push(child);
			}
			if (child.name === 'nav') {
				// child.parent.remove(child);
				view.navIntersectObjects = [child];
				this.makeTransparent(child);
			}
		});
		view.intersectObjects = intersectObjects;
		// animations
		let dummy;
		dummy = new THREE.Group();
		dummy.add(mesh);
		if (typeof mount === 'function') {
			mount(dummy, this.view);
		}
	}

	makeTransparent(object) {
		if (object.isMesh) {
			object.material = ModelRoomComponent.transparentMaterial;
		}
		object.traverse((child) => {
			if (child.isMesh) {
				child.material = ModelRoomComponent.transparentMaterial;
			}
		});
	}

	// called by UpdateViewItemComponent
	onUpdateAsset(view, mesh) {
		// console.log('ModelRoomComponent.onUpdateAsset', view);
		this.loadGlb(environment.getPath(view.asset.folder), view.asset.file, (mesh, animations) => {
			this.onGlbLoaded(mesh, animations, (mesh, view) => this.onMount(mesh, view), (mesh, view) => this.onDismount(mesh, view));
		});
	}

}

ModelRoomComponent.meta = {
	selector: '[model-room]',
	hosts: { host: WorldComponent },
	inputs: ['view'],
};
