import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import { environment } from '../../environment';
import DebugService from '../debug.service';
import VRService from '../vr.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const ORIGIN = new THREE.Vector3();
const W = 1024;
const H = 256;

export default class ModelDebugComponent extends ModelComponent {

	static getLoader() {
		return ModelDebugComponent.loader || (ModelDebugComponent.loader = new THREE.FontLoader());
	}

	static getFontLoader(callback) {
		return ModelDebugComponent.fontLoader || (ModelDebugComponent.fontLoader = ModelDebugComponent.getLoader().load(environment.getFontPath('helvetiker/helvetiker_regular.typeface.json'), callback));
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
		canvas.width = W;
		canvas.height = H;
		const texture = new THREE.CanvasTexture(canvas);
		texture.encoding = THREE.sRGBEncoding;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.mapping = THREE.UVMapping;
		texture.needsUpdate = true;
		const geometry = new THREE.PlaneBufferGeometry(2, 0.5, 2, 2);
		const material = new THREE.MeshBasicMaterial({
			depthTest: false,
			map: texture,
			color: 0xffffff, // 0x33c5f6,
			transparent: true,
			opacity: 1,
			// blending: THREE.AdditiveBlending,
			// side: THREE.DoubleSide
		});
		const text = new THREE.Mesh(geometry, material);
		text.position.y = 2;
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

	create(callback) {
		const textGroup = this.textGroup = new THREE.Group();
		const material = this.material = new THREE.MeshBasicMaterial({
			// depthTest: false,
			color: 0x111111, // 0x33c5f6,
			transparent: true,
			opacity: 1,
			side: THREE.DoubleSide
		});
		const text = this.text = this.createText();
		if (typeof callback === 'function') {
			callback(textGroup);
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
		group.lookAt(ORIGIN);
		// }
	}

	setText(message) {
		const text = this.text;
		if (text) {
			if (this.host.renderer.xr.isPresenting && message != null) {
				// draw
				const ctx = text.material.map.image.getContext('2d');
				ctx.clearRect(0, 0, W, H);
				// ctx.fillRect(0, 0, 10, 10);
				// ctx.fillRect(W - 10, H - 10, 10, 10);
				ctx.font = '40px Maven Pro';
				ctx.textBaseline = 'middle';
				ctx.textAlign = "center";
				ctx.fillStyle = '#000000';
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 1;
				ctx.fillText(message, W / 2, H / 2, W - 20);
				text.material.map.needsUpdate = true;
				// draw
				this.textGroup.add(text);
			} else if (text.parent) {
				text.parent.remove(text);
			}
		}
	}

	setText_(message) {
		if (this.text) {
			this.text.parent.remove(this.text);
			this.text.geometry.dispose();
		}
		if (this.font && this.host.renderer.xr.isPresenting && message != null) {
			const geometry = new THREE.TextGeometry(message, {
				font: this.font,
				size: 0.05,
				height: 0.001,
				curveSegments: 12,
				bevelEnabled: false,
				bevelThickness: 10,
				bevelSize: 8,
				bevelOffset: 0,
				bevelSegments: 5
			});
			geometry.computeBoundingBox();
			const x = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
			geometry.translate(x, 0, 0);
			const text = new THREE.Mesh(geometry, this.material);
			text.name = 'text';
			text.position.y = 1;
			this.text = text;
			this.textGroup.add(text);
			/*
			const box = new THREE.BoxHelper(text, 0xffff00);
			this.host.scene.add(box);
			*/
			// console.log('ModelDebugComponent.setText', message, box);
		}
	}
}

ModelDebugComponent.meta = {
	selector: '[model-debug]',
	hosts: { host: WorldComponent },
};
