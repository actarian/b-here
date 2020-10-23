import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
import { environment } from '../../environment';
import StateService from '../../state/state.service';
import { ViewType } from '../../view/view';
import Interactive from '../interactive/interactive';
import InteractiveMesh from '../interactive/interactive.mesh';
import OrbitService, { OrbitMode } from '../orbit/orbit';
import VRService from '../vr.service';
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
		// geometry.rotateX(-Math.PI);
		// geometry.scale(-1, 1, 1);
		this.geometry_ = geometry;
		return geometry;
	}

	static get material() {
		const material = new THREE.ShaderMaterial({
			depthTest: false,
			transparent: true,
			vertexShader: ModelMenuComponent.VERTEX_SHADER,
			fragmentShader: ModelMenuComponent.FRAGMENT_SHADER,
			uniforms: {
				textureA: { type: "t", value: null },
				textureB: { type: "t", value: null },
				resolutionA: { value: new THREE.Vector2() },
				resolutionB: { value: new THREE.Vector2() },
				tween: { value: 0 },
				opacity: { value: 0.8 },
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
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, w, h);
		ctx.font = `20px ${environment.fontFamily}`;
		ctx.fillStyle = '#ffffff';
		ctx.fillText(text, 10, 50, w - 20);
		const texture = new THREE.CanvasTexture(canvas);
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.mapping = THREE.UVMapping;
		texture.encoding = THREE.sRGBEncoding;
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
		ctx.fillStyle = '0x0099ff';
		ctx.fillRect(0, 0, w, h);
		ctx.font = `20px ${environment.fontFamily}`;
		ctx.fillStyle = '#ffffff';
		ctx.fillText(text, 10, 50, w - 20);
		const texture = new THREE.CanvasTexture(canvas);
		texture.encoding = THREE.sRGBEncoding;
		texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		return texture;
	}

	onOver() {
		/*
		const debugService = DebugService.getService();
		debugService.setMessage('over ' + this.name);
		*/
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
		ctx.fillStyle = '#0099ff';
		ctx.fillRect(0, 0, w, h);
		ctx.font = `20px ${environment.fontFamily}`;
		ctx.fillStyle = '#000000';
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
		ctx.fillStyle = '#0099ff';
		ctx.fillRect(0, 0, w, h);
		ctx.font = `20px ${environment.fontFamily}`;
		ctx.fillStyle = '#ffffff';
		ctx.fillText(text, 10, 50, w - 20);
		const texture = new THREE.CanvasTexture(canvas);
		texture.encoding = THREE.sRGBEncoding;
		texture.magFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		return texture;
	}

}

export default class ModelMenuComponent extends ModelComponent {

	get items() {
		return this.items_;
	}
	set items(items) {
		if (this.items_ !== items) {
			this.items_ = items;
			this.buildMenu();
		}
	}

	onInit() {
		super.onInit();
		this.onDown = this.onDown.bind(this);
		this.onToggle = this.onToggle.bind(this);
		// console.log('ModelMenuComponent.onInit');
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
	}

	onDestroy() {
		if (this.buttons) {
			this.buttons.forEach(x => Interactive.dispose(x));
		}
		super.onDestroy();
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.menu;
		const menuGroup = this.menuGroup = new THREE.Group();
		menuGroup.lookAt(ModelMenuComponent.ORIGIN);
		if (typeof mount === 'function') {
			mount(menuGroup);
		}
	}

	render(time, tick) {
		const group = this.group;
		let camera = this.host.camera;
		const position = this.position;
		if (this.host.renderer.xr.isPresenting) {
			camera = this.host.renderer.xr.getCamera(camera);
			// camera.updateMatrixWorld(); // make sure the camera matrix is updated
			// camera.matrixWorldInverse.getInverse(camera.matrixWorld);
		}
		camera.getWorldDirection(position);
		// console.log(position);
		// if (position.lengthSq() > 0.01) {
		// normalize so we can get a constant speed
		// position.normalize();
		switch (OrbitService.mode) {
			case OrbitMode.Model:
				position.multiplyScalar(0.01);
				break;
			default:
				position.multiplyScalar(3);
		}
		// move body, not the camera
		// VR.body.position.add(lookDirection);
		// console.log(position.x + '|' + position.y + '|' + position.z);
		group.position.copy(position);
		const s = 1 / camera.zoom;
		group.scale.set(s, s, s);
		group.lookAt(ModelMenuComponent.ORIGIN);
		// }
	}

	buildMenu() {
		if (this.menu || !this.items) {
			return;
		}
		const menu = this.menu = {};
		this.items.forEach(item => {
			if (item.type.name !== ViewType.WaitingRoom.name) {
				let group = menu[item.type.name];
				if (!group) {
					group = menu[item.type.name] = [];
				}
				group.push(item);
			}
		});
		this.groups = Object.keys(menu).map(typeName => {
			let name = 'Button';
			switch (typeName) {
				case ViewType.WaitingRoom.name:
					name = 'Waiting Room';
					break;
				case ViewType.Panorama.name:
					name = 'Experience';
					break;
				case ViewType.PanoramaGrid.name:
					name = 'Virtual Tour';
					break;
				case ViewType.Room3d.name:
					name = 'Stanze 3D';
					break;
				case ViewType.Model.name:
					name = 'Modelli 3D';
					break;
			}
			return { name, type: { name: 'menu-group' }, items: this.items.filter(x => x.type.name === typeName) };
		});
	}

	onToggle() {
		if (StateService.state.locked || StateService.state.spying) {
			return;
		}
		if (this.buttons) {
			this.removeMenu();
			this.toggle.next();
		} else {
			this.addMenu();
			this.toggle.next(this);
		}
	}

	onDown(button) {
		// this.down.next(this.item);
		if (button.item && button.item.type.name === 'back') {
			this.removeMenu();
			if (button.item.backItem) {
				this.addMenu();
			} else {
				if (this.host.renderer.xr.isPresenting) {
					this.addToggler();
				}
				this.toggle.next();
			}
		} else {
			this.addMenu(button.item);
		}
	}

	addMenu(item = null) {
		this.removeMenu();
		let items;
		if (item) {
			if (item.type.name === 'menu-group') {
				items = item.items;
			} else {
				this.removeMenu();
				if (this.host.renderer.xr.isPresenting) {
					this.addToggler();
				}
				this.nav.next(item);
				return;
			}
		} else {
			items = this.groups;
			// this.down.next(this.item);
		}
		if (items) {
			items = items.slice();
			const back = {
				type: { name: 'back' },
				name: item ? 'Back' : 'Close',
				backItem: item,
			};
			items.push(back);
			const buttons = this.buttons = items.map((x, i, a) => {
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
						button.material.uniforms.opacity.value = button.opacity;
						// button.material.needsUpdate = true;
					});
				},
			});
		}
	}

	removeMenu() {
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
		toggler.position.y = -0.5;
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
}

ModelMenuComponent.ORIGIN = new THREE.Vector3();
ModelMenuComponent.VERTEX_SHADER = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
ModelMenuComponent.FRAGMENT_SHADER = `
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
	inputs: ['items'],
};
