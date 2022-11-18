// import * as THREE from 'three';
import { environment } from '../../environment';
import StateService from '../../state/state.service';
import { RoleType } from '../../user/user';
import { WishlistService } from '../../wishlist/wishlist.service';
import { Geometry } from '../geometry/geometry';
import { Host } from '../host/host';
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
	Transparent: 'transparent',
	Wishlist: 'wishlist',
};

export default class ModelNavComponent extends ModelEditableComponent {

	static getLoader() {
		return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
	}

	static getTexturePoint() {
		return ModelNavComponent.texturePoint || (ModelNavComponent.texturePoint = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-point.png')));
	}

	static getTexturePointImportant() {
		return ModelNavComponent.texturePointImportant || (ModelNavComponent.texturePointImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-point-important.png')));
	}

	static getTextureMove() {
		return ModelNavComponent.textureMove || (ModelNavComponent.textureMove = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-more.png')));
	}

	static getTextureMoveImportant() {
		return ModelNavComponent.textureMoveImportant || (ModelNavComponent.textureMoveImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-more-important.png')));
	}

	static getTextureInfo() {
		return ModelNavComponent.textureInfo || (ModelNavComponent.textureInfo = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info.png')));
	}

	static getTextureInfoImportant() {
		return ModelNavComponent.textureInfoImportant || (ModelNavComponent.textureInfoImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info-important.png')));
	}

	static getTextureWishlist() {
		return ModelNavComponent.textureWishlist || (ModelNavComponent.textureWishlist = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-wishlist-off.png')));
	}

	static getTextureWishlistAdded() {
		return ModelNavComponent.textureWishlistAdded || (ModelNavComponent.textureWishlistAdded = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-wishlist-on.png')));
	}

	static getTexture(mode, item) {
		let texture;
		switch (mode) {
			case NavModeType.Move:
				texture = item.important ? this.getTextureMoveImportant() : this.getTextureMove();
				break;
			case NavModeType.Info:
				texture = item.important ? this.getTextureInfoImportant() : this.getTextureInfo();
				break;
			case NavModeType.Point:
			case NavModeType.Title:
				texture = item.important ? this.getTexturePointImportant() : this.getTexturePoint();
				break;
			case NavModeType.Wishlist:
				texture = item.added ? this.getTextureWishlistAdded() : this.getTextureWishlist();
				break;
			default:
				break;
		}
		texture.disposable = false;
		texture.encoding = THREE.sRGBEncoding;
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
			ctx.font = `24px ${environment.fontFamily}`;
			const metrics = ctx.measureText(text);
			let w = metrics.width + 8;
			w = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
			const x = w / 2;
			const y = 16;
			canvas.width = w;
			ctx.font = `24px ${environment.fontFamily}`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.lineWidth = 6;
			ctx.lineJoin = 'round'; // Experiment with 'bevel' & 'round' for the effect you want!
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
		if (item.hook && item.hook === 'ToggleWishlist') {
			mode = NavModeType.Wishlist;
		} else if (item.transparent) {
			mode = NavModeType.Transparent;
		} else if (item.viewId !== view.id) {
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

	static hasNavInfo(view) {
		const item = view.items.find(x => this.getNavMode(x, view) === NavModeType.Info);
		// console.log('ModelNavComponent.hasNavInfo', item);
		return item != null;
	}

	static isValidText(text) {
		return text && text.length > 0;
	}

	hidden_ = false;
	get hidden() {
		return this.hidden_;
	}
	set hidden(hidden) {
		if (this.hidden_ !== hidden) {
			this.hidden_ = hidden;
			this.updateVisibility(!hidden);
		}
	}

	get isHidden() {
		return StateService.state.zoomedId != null ||
			(environment.flags.hideNavInfo && !this.host.editor &&
				(!StateService.state.showNavInfo && !(this.host.renderer.xr.isPresenting || StateService.state.role === RoleType.SelfService || StateService.state.role === RoleType.Embed)) &&
				this.mode === NavModeType.Info);
	}

	get isAnimated() {
		let isAnimated = false;
		const mode = this.mode;
		const important = this.item.important;
		switch (mode) {
			case NavModeType.Info:
				isAnimated = important ? environment.flags.navInfoImportantAnimated : environment.flags.navInfoAnimated;
				break;
			case NavModeType.Move:
				isAnimated = important ? environment.flags.navMoveImportantAnimated : environment.flags.navMoveAnimated;
				break;
			case NavModeType.Point:
				isAnimated = important ? environment.flags.navPointImportantAnimated : environment.flags.navPointAnimated;
				break;
			case NavModeType.Title:
				isAnimated = important ? environment.flags.navTitleImportantAnimated : environment.flags.navTitleAnimated;
				break;
			case NavModeType.Transparent:
				isAnimated = important ? environment.flags.navTransparentImportantAnimated : environment.flags.navTransparentAnimated;
				break;
		}
		return isAnimated;
	}

	get iconMinScale() {
		return (environment.navs.iconMinScale || 1) * 0.03 * (this.isMobile ? 1.6 : 1);
	}

	get iconMaxScale() {
		return (environment.navs.iconMaxScale || 1.5) * 0.03 * (this.isMobile ? 1.6 : 1);
	}

	isMobile_;
	get isMobile() {
		return this.isMobile_;
	}
	set isMobile(isMobile) {
		if (this.isMobile_ !== isMobile) {
			this.isMobile_ = isMobile;
			this.setScale();
		}
	}

	render(time, tick) {
		// console.log('render', this.host.worldRect.width);
		this.isMobile = this.host.worldRect.width < 768;
	}

	setScale(pow = 0) {
		const icon = this.icon;
		if (icon) {
			const scale = this.iconMinScale + pow * (this.iconMaxScale - this.iconMinScale);
			icon.scale.set(scale, scale, scale);
		}
	}

	shouldShowPanel() {
		return (!this.editing && this.mode !== NavModeType.Move && this.mode !== NavModeType.Title && this.mode !== NavModeType.Wishlist && (this.mode !== NavModeType.Transparent || ModelNavComponent.isValidText(this.item.title)));
	}

	updateVisibility(visible) {
		if (this.mesh) {
			this.mesh.visible = visible;
		}
		if (this.sphere) {
			this.sphere.freezed = !visible;
		}
		if (!visible && this.item) {
			this.item.showPanel = false;
		}
	}

	setVisible(visible) {
		if (this.mesh) {
			this.mesh.visible = visible && !this.hidden_;
		}
	}

	onInit() {
		super.onInit();
	}

	onChanges() {
		const view = this.view;
		const item = this.item;
		const mode = this.mode = ModelNavComponent.getNavMode(item, this.view);
		if (mode === NavModeType.Wishlist) {
			item.added = WishlistService.has({ viewId: view.id, itemId: item.id });
			this.onCreateSprites(this.mesh, 1);
		}
		this.editing = item.selected;
		this.hidden = this.isHidden;
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.nav;
		const view = this.view;
		const item = this.item;
		const mode = this.mode = ModelNavComponent.getNavMode(item, this.view);
		if (mode === NavModeType.None) {
			return;
		}
		if (mode === NavModeType.Wishlist) {
			item.added = WishlistService.has({ viewId: view.id, itemId: item.id });
		}
		const isAnimated = this.isAnimated;
		const nav = new THREE.Group();
		if (mode === NavModeType.Transparent) {

			const opacityIdle = this.host.editor ? 0.1 : 0.0;
			const opacityOver = 0.2;
			const opacityDown = 0.3;

			nav.position.fromArray(item.position);
			nav.rotation.fromArray(item.rotation);
			nav.scale.fromArray(item.scale);

			const geometry = Geometry.planeGeometry;
			const plane = this.plane = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
				depthTest: false,
				depthWrite: false,
				transparent: true,
				opacity: opacityIdle,
				color: new THREE.Color(environment.colors.menuOverBackground),
				toneMapped: false,
			}));
			plane.name = `[nav] ${item.id}`;
			plane.depthTest = false;
			nav.add(plane);

			if (isAnimated) {
				const from = { pow: 0 };
				gsap.to(from, {
					pow: 1,
					duration: 0.6,
					delay: 0.5 + 0.1 * item.index,
					ease: Power2.easeOut,
					repeat: -1,
					yoyo: true,
					onUpdate: () => {
						plane.material.opacity = from.pow * opacityDown;
					}
				});
			}

			plane.on('over', () => {
				if (!isAnimated) {
					plane.material.opacity = opacityOver;
				}
				this.over.next(this);
			});

			plane.on('out', () => {
				if (!isAnimated) {
					plane.material.opacity = opacityIdle;
				}
				this.out.next(this);
			});

			plane.on('down', () => {
				if (!isAnimated) {
					plane.material.opacity = opacityDown;
				}
				this.down.next(this);
				// opening nav link
				const item = this.item;
				const link = item.firstLink;
				if (!this.host.editor && !this.shouldShowPanel() && link && link.href) {
					this.shouldNavToLink = link.href;
				}
				console.log('ModelNavComponent.down');
			});

			plane.on('up', () => {
				if (!isAnimated) {
					plane.material.opacity = opacityIdle;
				}
				// opening nav link
				if (this.shouldNavToLink != null) {
					/*
					const link = this.shouldNavToLink;
					window.open(link, '_blank');
					*/
					this.shouldNavToLink = null;
					const item = this.item;
					const link = item.firstLink;
					this.link.next({ item, link });
				}
			});

		} else {

			// !! fixing normalized positions;
			const position = new THREE.Vector3(item.position[0], item.position[1], item.position[2]);
			const normalizedPosition = new THREE.Vector3(item.position[0], item.position[1], item.position[2]).normalize();
			if (position.distanceToSquared(normalizedPosition) < 0.0001) {
				position.multiplyScalar(ModelNavComponent.RADIUS);
			}
			// console.log('!!! fixing normalized positions', 'position', position, 'normalizedPosition', normalizedPosition, 'distanceToSquared', position.distanceToSquared(normalizedPosition));
			nav.position.copy(position);
			this.onCreateSprites(nav);
			const geometry = Geometry.sphereGeometry;
			const sphere = this.sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
				depthTest: false,
				depthWrite: false,
				transparent: true,
				opacity: 0.0,
				color: 0x00ffff,
				toneMapped: false,
			}));
			sphere.name = `[nav] ${item.id}`;
			// sphere.lookAt(Host.origin); ??
			sphere.depthTest = false;
			// sphere.renderOrder = 0;
			nav.add(sphere);

			const from = { pow: 0 };
			gsap.to(from, {
				pow: 1,
				duration: 0.7,
				delay: 0.5 + 0.1 * item.index,
				ease: Power2.easeInOut,
				overwrite: true,
				onUpdate: () => {
					this.materials.forEach(material => {
						material.opacity = from.pow;
						// material.needsUpdate = true;
					});
				},
				onComplete: () => {
					if (isAnimated) {
						const icon = this.icon;
						from.pow = 0;
						gsap.to(from, {
							pow: 1,
							duration: 0.6,
							delay: 0.5 + 0.1 * item.index,
							ease: Power2.easeOut,
							repeat: -1,
							yoyo: true,
							onUpdate: () => {
								this.setScale(from.pow);
								icon.material.opacity = from.pow;
							}
						});
					}
				}
			});

			sphere.on('over', () => {
				this.over.next(this);
				if (!isAnimated) {
					const icon = this.icon;
					const from = { scale: icon.scale.x };
					gsap.to(from, {
						duration: 0.35,
						scale: this.iconMaxScale,
						delay: 0,
						ease: Power2.easeOut,
						overwrite: true,
						onUpdate: () => {
							icon.scale.set(from.scale, from.scale, from.scale);
						},
					});
				}
			});

			sphere.on('out', () => {
				this.out.next(this);
				if (!isAnimated) {
					const icon = this.icon;
					const from = { scale: icon.scale.x };
					gsap.to(from, {
						duration: 0.35,
						scale: this.iconMinScale,
						delay: 0,
						ease: Power2.easeOut,
						overwrite: true,
						onUpdate: () => {
							icon.scale.set(from.scale, from.scale, from.scale);
						},
					});
				}
			});

			sphere.on('down', () => {
				this.down.next(this);
			});
		}
		if (typeof mount === 'function') {
			mount(nav, item);
		}
	}

	onCreateSprites(mesh, opacity = 0) {
		this.onRemoveSprite(this.icon);
		this.onRemoveSprite(this.title);
		const item = this.item;
		const mode = this.mode = ModelNavComponent.getNavMode(item, this.view);
		if (mode === NavModeType.None) {
			return;
		}
		if (mode === NavModeType.Transparent) {
			this.materials = [];
		} else {
			const map = ModelNavComponent.getTexture(mode, item);
			const material = new THREE.SpriteMaterial({
				map: map,
				depthTest: false,
				depthWrite: false,
				transparent: true,
				sizeAttenuation: false,
				opacity: opacity,
				toneMapped: false,
				// color: 0xff0000,
			});
			const materials = [material];
			const icon = this.icon = new THREE.Sprite(material);
			icon.renderOrder = environment.renderOrder.nav;
			this.setScale();
			mesh.add(icon);
			let titleMaterial;
			const titleTexture = ModelNavComponent.getTitleTexture(item, mode);
			if (titleTexture) {
				titleMaterial = new THREE.SpriteMaterial({
					depthTest: false,
					depthWrite: false,
					transparent: true,
					map: titleTexture,
					sizeAttenuation: false,
					opacity: opacity,
					toneMapped: false,
					// color: 0xff0000,
				});
				// console.log(titleTexture);
				const image = titleTexture.image;
				const title = this.title = new THREE.Sprite(titleMaterial);
				const scale = this.iconMinScale;
				title.scale.set(scale * image.width / image.height, scale, scale);
				title.position.set(0, -3.5, 0);
				mesh.add(title);
				materials.push(titleMaterial);
			}
			this.materials = materials;
		}
	}

	onRemoveSprite(sprite) {
		if (sprite) {
			if (sprite.parent) {
				sprite.parent.remove(sprite);
			}
			if (sprite.material.map && sprite.material.map.disposable !== false) {
				sprite.material.map.dispose();
			}
			sprite.material.dispose();
		}
	}

	onDestroy() {
		Interactive.dispose(this.sphere);
		super.onDestroy();
	}

	// called by UpdateViewItemComponent
	onUpdate(item, mesh) {
		this.item = item;
		this.onCreateSprites(mesh, 1);
		if (this.mode === NavModeType.Transparent) {
			if (item.position) {
				mesh.position.fromArray(item.position);
			}
			if (item.rotation) {
				mesh.rotation.fromArray(item.rotation);
			}
			if (item.scale) {
				mesh.scale.fromArray(item.scale);
			}
		} else {
			// const position = new THREE.Vector3().set(...item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);
			// mesh.position.set(position.x, position.y, position.z);
			mesh.position.fromArray(item.position);
			mesh.rotation.set(0, 0, 0);
			mesh.scale.set(1, 1, 1);
		}
		// console.log('onUpdate', item, mesh.position);
		this.updateHelper();
		/*
		this.onCreate(
			(mesh, item) => this.onMount(mesh, item),
			(mesh, item) => this.onDismount(mesh, item)
		);
		*/
	}

	// called by WorldComponent
	onDragMove(position, normal, spherical) {
		// console.log('ModelNavComponent.onDragMove', position, normal, spherical);
		const item = this.item;
		const mesh = this.mesh;
		this.editing = true;
		item.showPanel = false;
		if (this.mode === NavModeType.Transparent) {
			if (spherical) {
				position.normalize().multiplyScalar(ModelNavComponent.RADIUS);
				mesh.position.set(position.x, position.y, position.z);
				mesh.lookAt(Host.origin);
			} else {
				mesh.position.set(0, 0, 0);
				mesh.lookAt(normal);
				mesh.position.set(position.x, position.y, position.z);
				mesh.position.add(normal.multiplyScalar(0.01));
			}
		} else {
			if (spherical) {
				position.normalize().multiplyScalar(ModelNavComponent.RADIUS);
				mesh.position.set(position.x, position.y, position.z);
			} else {
				mesh.position.set(position.x, position.y, position.z);
				mesh.position.add(normal.multiplyScalar(0.01));
			}
		}
		this.updateHelper();
	}

	// called by WorldComponent
	onDragEnd() {
		const item = this.item;
		const mesh = this.mesh;
		if (this.mode === NavModeType.Transparent) {
			item.position = mesh.position.toArray();
			item.rotation = mesh.rotation.toArray();
			item.scale = mesh.scale.toArray();
		} else {
			item.position = mesh.position.toArray(); // new THREE.Vector3().copy(mesh.position).normalize().toArray();
		}
		this.editing = false;
	}
}

ModelNavComponent.RADIUS = 100;

ModelNavComponent.meta = {
	selector: '[model-nav]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down', 'link'],
	inputs: ['item', 'view'],
};
