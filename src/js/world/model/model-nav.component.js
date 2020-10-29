// import * as THREE from 'three';
import { environment } from '../../environment';
import Interactive from '../interactive/interactive';
import InteractiveMesh from '../interactive/interactive.mesh';
import WorldComponent from '../world.component';
import ModelEditableComponent from './model-editable.component';

export default class ModelNavComponent extends ModelEditableComponent {

	static getLoader() {
		return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
	}

	/*
	static getTexture() {
		return ModelNavComponent.texture || (ModelNavComponent.texture = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/wall-nav.png')));
	}
	*/

	static getTextureCircle() {
		return ModelNavComponent.textureCircle || (ModelNavComponent.textureCircle = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-circle.png')));
	}

	static getTextureSquare() {
		return ModelNavComponent.textureSquare || (ModelNavComponent.textureSquare = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-square.png')));
	}

	onInit() {
		super.onInit();
		/*
		this.debouncedOver$ = new ReplaySubject(1).pipe(
			auditTime(250),
			tap(event => this.over.next(event)),
			takeUntil(this.unsubscribe$),
		);
		this.debouncedOver$.subscribe();
		*/
		// console.log('ModelNavComponent.onInit');
	}

	onChanges() {
		this.editing = this.item.selected;
	}

	onDestroy() {
		Interactive.dispose(this.sphere);
		super.onDestroy();
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.nav;
		const nav = new THREE.Group();
		const position = new THREE.Vector3().set(...this.item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);
		nav.position.set(position.x, position.y, position.z);
		const map = this.item.hasPanel ? ModelNavComponent.getTextureCircle() : ModelNavComponent.getTextureSquare();
		map.disposable = false;
		map.encoding = THREE.sRGBEncoding;
		const material = new THREE.SpriteMaterial({
			depthTest: false,
			depthWrite: false,
			transparent: true,
			map: map,
			sizeAttenuation: false,
			opacity: 0,
			// color: 0xff0000,
		});
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(0.03, 0.03, 0.03);
		nav.add(sprite);
		// const geometry = new THREE.PlaneBufferGeometry(3, 2, 2, 2);
		const geometry = new THREE.SphereBufferGeometry(3, 12, 12);
		const sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
			depthTest: false,
			depthWrite: false,
			transparent: true,
			opacity: 0.0,
			color: 0x00ffff,
		}));
		sphere.name = `[nav] ${this.item.id}`;
		sphere.lookAt(ModelNavComponent.ORIGIN);
		sphere.depthTest = false;
		sphere.renderOrder = 0;
		nav.add(sphere);
		sphere.on('over', () => {
			// console.log('ModelNavComponent.over');
			if (!this.editing) {
				this.over.next(this);
			}
			const from = { scale: sprite.scale.x };
			gsap.to(from, {
				duration: 0.35,
				scale: 0.04,
				delay: 0,
				ease: Power2.easeOut,
				overwrite: true,
				onUpdate: () => {
					sprite.scale.set(from.scale, from.scale, from.scale);
				},
				onComplete: () => {
					/*
					if (!this.editing) {
						this.over.next(this);
					}
					*/
				}
			});
		});
		sphere.on('out', () => {
			this.out.next(this);
			const from = { scale: sprite.scale.x };
			gsap.to(from, {
				duration: 0.35,
				scale: 0.03,
				delay: 0,
				ease: Power2.easeOut,
				overwrite: true,
				onUpdate: () => {
					sprite.scale.set(from.scale, from.scale, from.scale);
				},
				onComplete: () => {
					/*
					this.out.next(this);
					*/
				}
			});
		});
		sphere.on('down', () => {
			this.down.next(this);
		});
		const from = { opacity: 0 };
		gsap.to(from, {
			duration: 0.7,
			opacity: 1,
			delay: 0.5 + 0.1 * this.item.index,
			ease: Power2.easeInOut,
			overwrite: true,
			onUpdate: () => {
				// console.log(index, from.opacity);
				material.opacity = from.opacity;
				material.needsUpdate = true;
			}
		});
		if (typeof mount === 'function') {
			mount(nav, this.item);
		}
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		const position = new THREE.Vector3().set(...item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);
		mesh.position.set(position.x, position.y, position.z);
		// console.log('onUpdate', mesh.position);
		this.updateHelper();
	}

	// called by WorldComponent
	onDragMove(position) {
		this.editing = true;
		this.item.showPanel = false;
		this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(ModelNavComponent.RADIUS);
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		this.item.position = new THREE.Vector3().copy(this.mesh.position).normalize().toArray();
		this.editing = false;
	}
}

ModelNavComponent.ORIGIN = new THREE.Vector3();
ModelNavComponent.RADIUS = 100;

ModelNavComponent.meta = {
	selector: '[model-nav]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down'],
	inputs: ['item'],
};
