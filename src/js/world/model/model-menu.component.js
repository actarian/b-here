import { getContext } from 'rxcomp';
import { of } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
// import * as THREE from 'three';
import { MessageType } from '../../agora/agora.types';
import MenuService from '../../editor/menu/menu.service';
import { environment } from '../../environment';
import LoaderService from '../../loader/loader.service';
import { MessageService } from '../../message/message.service';
import StateService from '../../state/state.service';
import { RoleType } from '../../user/user';
import { Host } from '../host/host';
// import DebugService from '../debug.service';
import Interactive from '../interactive/interactive';
import InteractiveMesh from '../interactive/interactive.mesh';
import OrbitService, { OrbitMode } from '../orbit/orbit.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export class MenuButton extends InteractiveMesh {

	static getGrid(total) {
		const cols = Math.ceil(total / MenuButton.ROWS);
		const rows = Math.ceil(total / cols);
		return [rows, cols];
	}

	static getX(index, total) {
		const cols = Math.ceil(total / MenuButton.ROWS);
		const rows = Math.ceil(total / cols);
		const c = index % cols;
		const w = (1 / MenuButton.W * (MenuButton.W + MenuButton.G));
		return (w / 2 - cols * w / 2) + c * w;
	}

	static getY(index, total) {
		const cols = Math.ceil(total / MenuButton.ROWS);
		const rows = Math.ceil(total / cols);
		const c = index % cols;
		const r = Math.floor(index / cols);
		const h = (1 / MenuButton.W * (MenuButton.H + MenuButton.G));
		return (rows * h / 2 - h / 2) + r * -h; // y flipped
	}

	static get geometry() {
		if (this.geometry_) {
			return this.geometry_;
		}
		const geometry = new THREE.PlaneBufferGeometry(1, 1 / MenuButton.W * MenuButton.H, 2, 2);
		this.geometry_ = geometry;
		return geometry;
	}

	static get material() {
		const material = new THREE.ShaderMaterial({
			depthTest: false,
			transparent: true,
			toneMapped: false,
			vertexShader: ModelMenuComponent.VERTEX_SHADER,
			fragmentShader: ModelMenuComponent.FRAGMENT_SHADER,
			uniforms: {
				textureA: { type: 't', value: null },
				textureB: { type: 't', value: null },
				resolutionA: { value: new THREE.Vector2() },
				resolutionB: { value: new THREE.Vector2() },
				tween: { value: 0 },
				opacity: { value: 0 },
			},
			extensions: {
				fragDepth: true,
			},
		});
		/*
		const material = new THREE.MeshBasicMaterial({
			// depthTest: false,
			transparent: true,
			opacity: 0.8,
			// side: THREE.DoubleSide,
		});
		*/
		return material;
	}

	constructor(item, index, total) {
		const geometry = MenuButton.geometry;
		const material = MenuButton.material;
		super(geometry, material);
		// this.userData.item = item;
		// this.userData.index = index;
		this.renderOrder = environment.renderOrder.menu;
		this.name = item.name;
		this.item = item;
		this.index = index;
		this.total = total;
		this.tween = 0;
		this.opacity = 0;
		const textureA = this.textureA = this.getTextureA(item.name);
		// material.map = textureA;
		material.uniforms.textureA.value = textureA;
		material.uniforms.resolutionA.value = new THREE.Vector2(textureA.width, textureA.height);
		const textureB = this.textureB = this.getTextureB(item.name);
		// material.map = textureB;
		material.uniforms.textureB.value = textureB;
		material.uniforms.resolutionA.value = new THREE.Vector2(textureB.width, textureB.height);
		material.uniforms.tween.value = this.tween;
		material.uniforms.opacity.value = this.opacity;
		material.needsUpdate = true;
		this.position.set(MenuButton.getX(index, total), MenuButton.getY(index, total), 0);
		this.onOver = this.onOver.bind(this);
		this.onOut = this.onOut.bind(this);
	}

	getTextureA(text) {
		const w = MenuButton.W;
		const h = MenuButton.H;
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = environment.colors.menuBackground;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = environment.colors.menuForeground;
		this.writeText(ctx, text, w, h);
		const texture = new THREE.CanvasTexture(canvas);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.mapping = THREE.UVMapping;
		// texture.encoding = THREE.sRGBEncoding;
		texture.needsUpdate = true;
		return texture;
	}

	getTextureB(text) {
		const w = MenuButton.W;
		const h = MenuButton.H;
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = environment.colors.menuOverBackground;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = environment.colors.menuOverForeground;
		this.writeText(ctx, text, w, h);
		const texture = new THREE.CanvasTexture(canvas);
		// texture.encoding = THREE.sRGBEncoding;
		texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		return texture;
	}

	writeText(ctx, text, w, h) {
		this.setFont(ctx);
		const lineHeight = MenuButton.FONT_SIZE * MenuButton.LINE_HEIGHT;
		const lines = this.getLines(ctx, text, w);
		const lineCount = lines.length;
		this.setFont(ctx, lineCount - 1);
		lines.forEach((line, i) => {
			ctx.fillText(line, 10, (h - lineCount * lineHeight) * 0.5 + (0.5 + i) * lineHeight, w - 20);
		});
	}

	setFont(ctx, diff = 0) {
		ctx.textBaseline = 'middle';
		ctx.font = `${MenuButton.FONT_SIZE - diff * 2}px ${environment.fontFamily}`;
	}

	getLines(ctx, text, maxWidth) {
		const words = text.split(' ');
		const lines = [];
		let currentLine = words[0];
		for (let i = 1; i < words.length; i++) {
			const word = words[i];
			const width = ctx.measureText(currentLine + ' ' + word).width;
			if (width < maxWidth) {
				currentLine += ' ' + word;
			} else {
				lines.push(currentLine);
				currentLine = word;
			}
		}
		lines.push(currentLine);
		return lines;
	}

	onOver() {
		// DebugService.getService().setMessage('over ' + this.name);
		gsap.to(this, {
			duration: 0.4,
			tween: 1,
			ease: Power2.easeOut,
			onUpdate: () => {
				this.position.z = 0.1 * this.tween;
				this.material.uniforms.tween.value = this.tween;
				this.material.needsUpdate = true;
			},
		});
	}

	onOut() {
		gsap.to(this, {
			duration: 0.4,
			tween: 0,
			ease: Power2.easeOut,
			onUpdate: () => {
				this.position.z = 0.1 * this.tween;
				this.material.uniforms.tween.value = this.tween;
				this.material.needsUpdate = true;
			},
		});
	}

	dispose() {
		Interactive.dispose(this);
		this.textureA.dispose();
		this.textureB.dispose();
		this.material.dispose();
		this.geometry.dispose();
	}
}

MenuButton.FONT_SIZE = 19; // 20
MenuButton.LINE_HEIGHT = 0.9;
MenuButton.W = 256;
MenuButton.H = 64;
MenuButton.G = 2;
MenuButton.ROWS = 6;

export class BackButton extends MenuButton {

	constructor(item, index, total) {
		super(item, index, total);
	}

	getTextureA(text) {
		const w = MenuButton.W;
		const h = MenuButton.H;
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = environment.colors.menuBackBackground;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = environment.colors.menuBackForeground;
		ctx.font = `${MenuButton.FONT_SIZE}px ${environment.fontFamily}`;
		ctx.fillText(text, 10, 50, w - 20);
		const texture = new THREE.CanvasTexture(canvas);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.mapping = THREE.UVMapping;
		texture.needsUpdate = true;
		return texture;
	}

	getTextureB(text) {
		const w = MenuButton.W;
		const h = MenuButton.H;
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = environment.colors.menuBackOverBackground;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = environment.colors.menuBackOverForeground;
		ctx.font = `${MenuButton.FONT_SIZE}px ${environment.fontFamily}`;
		ctx.fillText(text, 10, 50, w - 20);
		const texture = new THREE.CanvasTexture(canvas);
		// texture.encoding = THREE.sRGBEncoding;
		texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		return texture;
	}
}

export default class ModelMenuComponent extends ModelComponent {

	get controlled() {
		return (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid);
	}

	get controlling() {
		return (StateService.state.controlling && StateService.state.controlling === StateService.state.uid);
	}

	get silencing() {
		return StateService.state.silencing;
	}

	get silenced() {
		return (StateService.state.silencing && StateService.state.role === RoleType.Streamer);
	}

	get spyed() {
		return (StateService.state.spying && StateService.state.spying === StateService.state.uid);
	}

	get spying() {
		return (StateService.state.spying && StateService.state.spying !== StateService.state.uid);
	}

	get locked() {
		return this.controlled || this.spying;
	}

	get loading() {
		return this.loading_;
	}
	set loading(loading) {
		// console.log('loading', loading);
		if (this.loading_ !== loading) {
			this.loading_ = loading;
			const { node } = getContext(this);
			const btn = node.querySelector('.btn--menu');
			btn.classList.toggle('loading', loading);
		}
	}

	onInit() {
		super.onInit();
		this.onDown = this.onDown.bind(this);
		this.onToggle = this.onToggle.bind(this);
		// console.log('ModelMenuComponent.onInit');
		/*
		const vrService = this.vrService = VRService.getService();
		vrService.session$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((session) => {
			if (session) {
				this.addToggler();
			} else {
				this.removeMenu();
			}
		});
		*/
		const { node } = getContext(this);
		this.progressIndicator = node.querySelector('.progress circle');
		LoaderService.progress$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(progress => {
			this.loading = progress.count > 0;
			let strokeDashoffset = 144.51;
			if (progress.count) {
				strokeDashoffset = 144.51 * (1 - progress.value);
			}
			gsap.set(this.progressIndicator, {
				'strokeDashoffset': strokeDashoffset,
			});
		});
		MessageService.in$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			// DebugService.getService().setMessage('ModelMenuComponent.MessageService ' + message.type);
			switch (message.type) {
				case MessageType.MenuToggle:
					this.onToggle();
					break;
			}
		});
	}

	/*
	buildMenu() {
		if (!this.views) {
			return;
		}
		MenuService.getModelMenu$(this.views, this.host.editor).pipe(
			first(),
		).subscribe(menu => this.groups = menu);
	}
	*/

	onDestroy() {
		if (this.buttons) {
			this.buttons.forEach(x => Interactive.dispose(x));
		}
		super.onDestroy();
	}

	getContainer() {
		return this.host.cameraGroup;
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.menu;
		const menuGroup = this.menuGroup = new THREE.Group();
		if (typeof mount === 'function') {
			mount(menuGroup);
		}
	}

	render(time, tick) {
		const group = this.group;
		const cameraGroup = this.host.cameraGroup;
		let camera = this.host.camera;
		const position = this.position;
		if (this.host.renderer.xr.isPresenting) {
			camera = this.host.renderer.xr.getCamera(camera);
			camera.getWorldDirection(position);
			position.y += 0.5;
			position.multiplyScalar(3);
			this.host.cameraGroup.worldToLocal(position);
			position.y += this.host.cameraGroup.position.y;
			group.position.copy(position);
			group.scale.set(1, 1, 1);
			group.lookAt(Host.origin);
		} else {
			camera.getWorldDirection(position);
			if (OrbitService.mode === OrbitMode.Model) {
				position.multiplyScalar(0.01);
			} else {
				position.multiplyScalar(3);
			}
			group.position.copy(position);
			const s = 1 / camera.zoom;
			group.scale.set(s, s, s);
			group.lookAt(Host.origin);
		}
	}

	items$(item = null) {
		if (item) {
			return of(item.items);
		} else if (this.rootItems) {
			return of(this.rootItems);
		} else {
			return MenuService.getModelMenu$(this.views, this.host.editor).pipe(
				first(),
				tap(items => {
					if (!this.host.editor) {
						this.rootItems = items;
					}
				}),
			);
		}
	}

	addMenu(item = null) {
		this.removeMenu();
		// nav to view
		if (item && item.type.name !== 'menu-group') {
			/*
			if (this.host.renderer.xr.isPresenting) {
				this.addToggler();
			}
			*/
			this.nav.next(item);
			return;
		}
		MenuService.active = true;
		this.items$(item).pipe(
			first(),
		).subscribe(items => {
			if (items) {
				items = items.slice();
				const back = {
					type: { name: 'back' },
					name: item ? 'Back' : 'Close',
					backItem: item,
				};
				items.push(back);
				const buttons = this.buttons = items.map((x, i, a) => {
					x.backItem = item;
					return (x.type.name === 'back') ? new BackButton(x, i, a.length) : new MenuButton(x, i, a.length);
				});
				buttons.forEach(button => {
					button.depthTest = false;
					button.on('over', button.onOver);
					button.on('out', button.onOut);
					button.on('down', this.onDown);
					this.menuGroup.add(button);
					/*
					var box = new THREE.BoxHelper(button, 0xffff00);
					this.host.scene.add(box);
					*/
				});
				gsap.to(buttons, {
					duration: 0.3,
					opacity: 0.8,
					ease: Power2.easeOut,
					stagger: {
						grid: MenuButton.getGrid(buttons.length),
						from: 0, // index
						amount: 0.02 * buttons.length
					},
					onUpdate: () => {
						buttons.forEach(button => {
							button.material.uniforms.opacity.value = (button.opacity * (button.item.hidden ? 0.5 : 1));
							// button.material.needsUpdate = true;
						});
					},
				});
			}
		});
	}

	removeMenu() {
		MenuService.active = false;
		this.removeButtons();
		this.removeToggler();
	}

	removeButtons() {
		const buttons = this.buttons;
		if (buttons) {
			buttons.forEach(button => {
				this.menuGroup.remove(button);
				button.off('over', button.onOver);
				button.off('out', button.onOut);
				button.off('down', this.onDown);
				button.dispose();
			});
		}
		this.buttons = null;
	}

	addToggler() {
		this.removeMenu();
		const toggler = this.toggler = new MenuButton({
			type: { name: 'menu' },
			name: 'Menu'
		}, 0, 1);
		// toggler.position.y = -0.5;
		toggler.opacity = 0.8;
		toggler.material.uniforms.opacity.value = toggler.opacity;
		toggler.material.needsUpdate = true;
		toggler.on('over', toggler.onOver);
		toggler.on('out', toggler.onOut);
		toggler.on('down', this.onToggle);
		this.menuGroup.add(toggler);
	}

	removeToggler() {
		const toggler = this.toggler;
		if (toggler) {
			this.menuGroup.remove(toggler);
			toggler.off('over', toggler.onOver);
			toggler.off('out', toggler.onOut);
			toggler.off('down', this.onToggle);
			toggler.dispose();
		}
		this.toggler = null;
	}

	onDown(button) {
		// this.down.next(this.item);
		if (button.item && button.item.type.name === 'back') {
			this.removeMenu();
			if (button.item.backItem) {
				this.addMenu(button.item.backItem.backItem);
			} else {
				/*
				if (this.host.renderer.xr.isPresenting) {
					this.addToggler();
				}
				*/
				this.toggle.next();
			}
		} else {
			this.addMenu(button.item);
		}
	}

	onToggle(event) {
		if (event) {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
		if (this.locked) {
			return;
		}
		if (MenuService.active) {
			this.removeMenu();
			this.toggle.next();
		} else {
			this.addMenu();
			this.toggle.next(this);
		}
	}
}

ModelMenuComponent.VERTEX_SHADER = `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
ModelMenuComponent.FRAGMENT_SHADER = `
varying vec2 vUv;
uniform float opacity;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;

void main() {
	vec4 colorA = texture2D(textureA, vUv);
	vec4 colorB = texture2D(textureB, vUv);
	vec4 color = vec4(mix(colorA.rgb, colorB.rgb, tween), opacity);
	gl_FragColor = color;
}
`;

ModelMenuComponent.meta = {
	selector: '[model-menu]',
	hosts: { host: WorldComponent },
	// outputs: ['over', 'out', 'down', 'nav'],
	outputs: ['nav', 'toggle'],
	inputs: ['views'],
	template: /* html */`
	<div class="btn--menu" (mousedown)="onToggle($event)">
		<svg class="menu-light" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#menu-light"></use></svg>
		<div class="btn--menu__spinner"></div>
		<svg class="bullets" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#menu"></use></svg>
		<svg class="progress" width="50" height="50" viewBox="0 0 50 50">
			<circle id="circle" r="23" cx="25" cy="25" fill="transparent"></circle>
		</svg>
	</div>
	`,
};
