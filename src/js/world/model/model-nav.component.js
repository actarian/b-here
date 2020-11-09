import { environment } from '../../environment';
import Interactive from '../interactive/interactive';
import InteractiveMesh from '../interactive/interactive.mesh';
import WorldComponent from '../world.component';
import ModelEditableComponent from './model-editable.component';

export const NavModeType = {
	None: 'none',
	Move: 'move',
	Info: 'info',
	Point: 'point',
	Title: 'title',
};

export default class ModelNavComponent extends ModelEditableComponent {

	static getLoader() {
		return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
	}

	static getTexturePoint() {
		return ModelNavComponent.texturePoint || (ModelNavComponent.texturePoint = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-exit.png')));
	}

	static getTextureMove() {
		return ModelNavComponent.textureMove || (ModelNavComponent.textureMove = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-move.png')));
	}

	static getTextureInfo() {
		return ModelNavComponent.textureInfo || (ModelNavComponent.textureInfo = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info.png')));
	}

	static getTexture(mode) {
		let texture;
		switch (mode) {
			case NavModeType.Move:
				texture = this.getTextureMove();
				break;
			case NavModeType.Info:
				texture = this.getTextureInfo();
				break;
			case NavModeType.Point:
			case NavModeType.Title:
				texture = this.getTexturePoint();
				break;
			default:
				break;
		}
		return texture;
	}

	static getTitleTexture(item, mode) {
		let texture;
		if (mode === NavModeType.Title) {
			const text = item.title;
			const canvas = document.createElement('canvas');
			// document.querySelector('body').appendChild(canvas);
			canvas.width = 512;
			canvas.height = 32;
			const ctx = canvas.getContext('2d');
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			ctx.font = `28px ${environment.fontFamily}`;
			const metrics = ctx.measureText(text);
			let w = metrics.width + 8;
			w = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
			const x = w / 2;
			const y = 16;
			canvas.width = w;
			ctx.font = `28px ${environment.fontFamily}`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.lineWidth = 6;
			ctx.lineJoin = 'round'; // Experiment with "bevel" & "round" for the effect you want!
			ctx.miterLimit = 2;
			ctx.strokeText(text, x, y);
			ctx.fillStyle = 'white';
			ctx.fillText(text, x, y);
			texture = new THREE.CanvasTexture(canvas);
		}
		return texture;
	}

	static getNavMode(item, view) {
		let mode = NavModeType.None;
		if (item.viewId !== view.id) {
			mode = NavModeType.Move;
			if (this.isValidText(item.title)) {
				mode = NavModeType.Title;
			}
			if (this.isValidText(item.abstract) ||
				(item.asset && item.asset.id) ||
				(item.link && item.link.href)) {
				mode = NavModeType.Point;
			}
		} else if (this.isValidText(item.title) ||
			this.isValidText(item.abstract) ||
			(item.asset && item.asset.id) ||
			(item.link && item.link.href)) {
			mode = NavModeType.Info;
		}
		return mode;
	}

	static isValidText(text) {
		return text && text.length > 0;
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
		const mode = this.mode = ModelNavComponent.getNavMode(this.item, this.view);
		if (mode === NavModeType.None) {
			return;
		}
		const nav = new THREE.Group();
		const position = new THREE.Vector3().set(...this.item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);
		nav.position.set(position.x, position.y, position.z);
		const map = ModelNavComponent.getTexture(mode);
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

		let titleMaterial;
		const titleTexture = ModelNavComponent.getTitleTexture(this.item, mode);
		if (titleTexture) {
			titleMaterial = new THREE.SpriteMaterial({
				depthTest: false,
				depthWrite: false,
				transparent: true,
				map: titleTexture,
				sizeAttenuation: false,
				opacity: 0,
				// color: 0xff0000,
			});
			// console.log(titleTexture);
			const image = titleTexture.image;
			const title = new THREE.Sprite(titleMaterial);
			title.scale.set(0.03 * image.width / image.height, 0.03, 0.03);
			title.position.set(0, -3.5, 0);
			nav.add(title);
		}

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
			/*
			if ((mode !== NavModeType.Move && mode !== NavModeType.Title) && !this.editing) {
				this.over.next(this);
			}
			*/
			this.over.next(this);
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
				if (titleMaterial) {
					titleMaterial.opacity = from.opacity;
					titleMaterial.needsUpdate = true;
				}
			}
		});
		if (typeof mount === 'function') {
			mount(nav, this.item);
		}
	}

	shouldShowPanel() {
		return (!this.editing && this.mode !== NavModeType.Move && this.mode !== NavModeType.Title);
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
	inputs: ['item', 'view'],
};
