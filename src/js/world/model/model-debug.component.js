import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
import { environment } from '../../environment';
import DebugService from '../debug.service';
import { Host } from '../host/host';
import VRService from '../vr.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelDebugComponent extends ModelComponent {

	static getLoader() {
		return ModelDebugComponent.loader || (ModelDebugComponent.loader = new THREE.FontLoader());
	}

	static getFontLoader(callback) {
		return ModelDebugComponent.fontLoader || (ModelDebugComponent.fontLoader = ModelDebugComponent.getLoader().load(environment.getPath('fonts/helvetiker/helvetiker_regular.typeface.json'), callback));
	}

	get message() {
		return this.message_;
	}

	set message(message) {
		message = message && message !== '' ? message : null;
		if (this.message_ !== message) {
			this.message_ = message;
			// console.log('ModelDebugComponent.set.message', message);
			this.setText(message);
			/*
			if (this.font) {
				this.setText(message);
			}
			*/
		}
	}

	onInit() {
		super.onInit();
		// console.log('ModelDebugComponent.onInit');
		// this.loadFont();
		const vrService = this.vrService = VRService.getService();
		vrService.session$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((session) => {
			if (session) {
				if (this.text) {
					this.textGroup.add(this.text);
				}
			} else {
				if (this.text) {
					this.text.parent.remove(this.text);
				}
			}
		});
		const debugService = this.debugService = DebugService.getService();
		debugService.message$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(message => this.message = message);
	}

	createText() {
		const canvas = document.createElement('canvas');
		// document.querySelector('body').appendChild(canvas);
		canvas.width = ModelDebugComponent.W;
		canvas.height = ModelDebugComponent.H;
		const texture = new THREE.CanvasTexture(canvas);
		texture.encoding = THREE.sRGBEncoding;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.mapping = THREE.UVMapping;
		texture.needsUpdate = true;
		const geometry = new THREE.PlaneBufferGeometry(4, 1, 2, 2);
		const material = new THREE.MeshBasicMaterial({
			depthTest: false,
			depthWrite: false,
			map: texture,
			color: 0xffffff, // 0x33c5f6,
			transparent: true,
			opacity: 1,
			toneMapped: false,
			// blending: THREE.AdditiveBlending,
			// side: THREE.DoubleSide
		});
		const text = new THREE.Mesh(geometry, material);
		text.renderOrder = environment.renderOrder.debug;
		text.position.y = 0;
		return text;
	}

	loadFont() {
		this.fontLoader = ModelDebugComponent.getFontLoader((font) => {
			this.font = font;
			if (this.message_) {
				this.setText(this.message_);
			}
		});
	}

	onCreate(mount, dismount) {
		const textGroup = this.textGroup = new THREE.Group();
		const material = this.material = new THREE.MeshBasicMaterial({
			depthTest: false,
			color: 0xffffff, // 0x33c5f6,
			transparent: true,
			opacity: 1,
			side: THREE.DoubleSide
		});
		const text = this.text = this.createText();
		if (typeof mount === 'function') {
			mount(textGroup);
		}
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

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
		position.multiplyScalar(3);
		// move body, not the camera
		// VR.body.position.add(lookDirection);
		// console.log(position.x + '|' + position.y + '|' + position.z);
		group.position.copy(position);
		group.lookAt(Host.origin);
		// }
	}

	setText(message) {
		const text = this.text;
		if (text) {
			if (this.host.renderer.xr.isPresenting && message != null) {
				// draw
				const ctx = text.material.map.image.getContext('2d');
				ctx.clearRect(0, 0, ModelDebugComponent.W, ModelDebugComponent.H);
				// ctx.fillRect(0, 0, 10, 10);
				// ctx.fillRect(ModelDebugComponent.W - 10, ModelDebugComponent.H - 10, 10, 10);
				ctx.font = `30px ${environment.fontFamily}`;
				ctx.textBaseline = 'middle';
				ctx.textAlign = 'center';
				ctx.fillStyle = '#FFFFFF';
				ctx.strokeStyle = '#000000';
				ctx.lineWidth = 5;
				ctx.fillText(message, ModelDebugComponent.W / 2, ModelDebugComponent.H / 2, ModelDebugComponent.W - 20);
				text.material.map.needsUpdate = true;
				// draw
				this.textGroup.add(text);
			} else if (text.parent) {
				text.parent.remove(text);
			}
		}
	}

}

ModelDebugComponent.W = 1024;
ModelDebugComponent.H = 256;

ModelDebugComponent.meta = {
	selector: '[model-debug]',
	hosts: { host: WorldComponent },
};
