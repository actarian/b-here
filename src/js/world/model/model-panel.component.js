import html2canvas from 'html2canvas';
import { getContext } from 'rxcomp';
import * as THREE from 'three';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const PANEL_RADIUS = 99;
const ORIGIN = new THREE.Vector3();

export default class ModelPanelComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelPanelComponent.onInit', this.item);
	}

	onView() {
		if (this.panel) {
			return;
		}
		this.getCanvasTexture().then(texture => {
			const aspect = texture.width / texture.height;
			const width = PANEL_RADIUS / 10;
			const height = PANEL_RADIUS / 10 / aspect;
			const dy = PANEL_RADIUS / 10 * 0.25;
			const position = this.item.mesh.position.normalize().multiplyScalar(PANEL_RADIUS);
			const material = new THREE.SpriteMaterial({
				depthTest: false,
				transparent: true,
				map: texture.map,
				sizeAttenuation: false,
			});
			const panel = this.panel = new THREE.Sprite(material);
			panel.scale.set(0.02 * width, 0.02 * height, 1);
			panel.position.set(position.x, position.y, position.z);
			// panel.lookAt(ORIGIN);
			this.mesh.add(panel);
			const from = { value: 0 };
			gsap.to(from, 0.5, {
				value: 1,
				delay: 0.0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					panel.position.set(position.x, position.y + (height + dy) * from.value, position.z);
					panel.lookAt(ORIGIN);
					panel.material.opacity = from.value;
					panel.material.needsUpdate = true;
				}
			});
		});
	}

	create(callback) {
		// this.renderOrder = environment.renderOrder.panel;
		const mesh = new THREE.Group();
		if (typeof callback === 'function') {
			callback(mesh);
		}
	}

	getCanvasTexture() {
		return new Promise((resolve, reject) => {
			if (this.item.panelTexture) {
				resolve(this.item.panelTexture);
			} else {
				const { node } = getContext(this);
				setTimeout(() => {
					html2canvas(node, {
						backgroundColor: '#ffffff00',
						scale: 2,
					}).then(canvas => {
						// !!!
						// document.body.appendChild(canvas);
						// const alpha = this.getAlphaFromCanvas(canvas);
						// document.body.appendChild(alpha);
						const map = new THREE.CanvasTexture(canvas);
						// const alphaMap = new THREE.CanvasTexture(alpha);
						this.item.panelTexture = {
							map: map,
							width: canvas.width,
							height: canvas.height,
						};
						resolve(this.item.panelTexture);
					}, error => {
						reject(error);
					});
				}, 1);
			}
		});
	}

}

ModelPanelComponent.ORIGIN = new THREE.Vector3();

ModelPanelComponent.meta = {
	selector: '[model-panel]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down'],
	inputs: ['item'],
};
