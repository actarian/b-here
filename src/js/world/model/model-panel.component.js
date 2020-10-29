import html2canvas from 'html2canvas';
import { getContext } from 'rxcomp';
// import * as THREE from 'three';
import DragService from '../../drag/drag.service';
import { environment } from '../../environment';
import InteractiveSprite from '../interactive/interactive.sprite';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

export default class ModelPanelComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelPanelComponent.onInit', this.item);
	}

	onView() {
		if (this.viewed) {
			return;
		}
		this.viewed = true;
		const { node } = getContext(this);
		this.getCanvasTexture(node).then(texture => {
			if (this.mesh) {
				const scale = 0.2 * (this.item.asset ? 1.5 : 1.0);
				const aspect = texture.width / texture.height;
				const width = ModelPanelComponent.PANEL_RADIUS * scale;
				const height = ModelPanelComponent.PANEL_RADIUS * scale / aspect;
				const dy = width * 0.25;
				const position = this.item.mesh.position.normalize().multiplyScalar(ModelPanelComponent.PANEL_RADIUS);
				const material = new THREE.SpriteMaterial({
					depthTest: false,
					transparent: true,
					map: texture.map,
					sizeAttenuation: false,
				});
				const panel = this.panel = new InteractiveSprite(material);
				panel.renderOrder = environment.renderOrder.panel;
				panel.scale.set(0.02 * width, 0.02 * height, 1);
				panel.position.set(position.x, position.y + (height + dy * 2), position.z);
				panel.on('down', (event) => {
					const xy = { x: parseInt(event.intersection.uv.x * node.offsetWidth), y: parseInt((1 - event.intersection.uv.y) * node.offsetHeight) };
					// console.log('ModelPanelComponent.down.xy', xy);
					const link = Array.prototype.slice.call(node.querySelectorAll('.panel__link')).find(link => {
						return xy.x >= link.offsetLeft && xy.y >= link.offsetTop && xy.x <= (link.offsetLeft + link.offsetWidth) && xy.y <= (link.offsetTop + link.offsetHeight);
					});
					// console.log('ModelPanelComponent.down.link', link);
					if (link) {
						this.down.next(link);
						const rect = node.getBoundingClientRect();
						const event = new MouseEvent('mouseup', {
							button: 0,
							buttons: 0,
							clientX: xy.x + rect.left,
							clientY: xy.y + rect.top,
							movementX: 0,
							movementY: 0,
							relatedTarget: link,
							screenX: xy.x,
							screenY: xy.y,
						});
						// console.log('ModelPanelComponent.dispatchEvent', event);
						link.dispatchEvent(event);
						setTimeout(() => {
							DragService.dismissEvent(event, DragService.events$, DragService.dismiss$, DragService.downEvent);
						}, 1);
					}
				});
				this.mesh.add(panel);
				const from = { value: 0 };
				gsap.to(from, {
					duration: 0.5,
					value: 1,
					delay: 0.0,
					ease: Power2.easeInOut,
					onUpdate: () => {
						panel.position.set(position.x, position.y + (height + dy * 2) - dy * from.value, position.z);
						panel.lookAt(ModelPanelComponent.ORIGIN);
						panel.material.opacity = from.value;
						panel.material.needsUpdate = true;
					}
				});
			}
		}, error => {
			console.log('ModelPanelComponent.getCanvasTexture.error', error);
		});
	}

	onCreate(mount, dismount) {
		const mesh = new THREE.Group();
		if (typeof mount === 'function') {
			mount(mesh);
		}
	}

	onDestroy() {
		// console.log('ModelPanelComponent.onDestroy');
		super.onDestroy();
	}

	imagesLoaded() {
		const { node } = getContext(this);
		if (node) {
			const images = Array.prototype.slice.call(node.querySelectorAll('img'));
			const promises = images.map(x => new Promise(function(resolve, reject) {
				const cors = x.src && x.src.indexOf(location.origin) === -1;
				if (x.complete) {
					return setTimeout(() => {
						resolve(cors);
					}, 10);
				}
				const removeListeners = () => {
					x.removeEventListener('load', onLoad);
					x.removeEventListener('error', onError);
				};
				const onLoad = () => {
					// console.log('loaded!');
					removeListeners();
					setTimeout(() => {
						resolve(cors);
					}, 10);
				};
				const onError = () => {
					// console.log('error!');
					removeListeners();
					resolve(false);
				};
				const addListeners = () => {
					x.addEventListener('load', onLoad);
					x.addEventListener('error', onError);
				};
				addListeners();
			}));
			if (promises.length) {
				return Promise.all(promises);
			} else {
				return Promise.resolve();
			}
		}
	}

	getCanvasTexture(node) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.item.panelTexture) {
					resolve(this.item.panelTexture);
				} else {
					this.imagesLoaded().then((results) => {
						const context = getContext(this);
						if (context && context.node) {
							node = context.node;
							const useCORS = results && (results.find(x => x === true) != null); // !!! keep loose equality
							// console.log('ModelPanelComponent.getCanvasTexture.useCORS', useCORS);
							html2canvas(node, {
								backgroundColor: '#ffffff00',
								scale: 2,
								useCORS,
								// logging: true,
							}).then(canvas => {
								// !!!
								// document.body.appendChild(canvas);
								// const alpha = this.getAlphaFromCanvas(canvas);
								// document.body.appendChild(alpha);
								const map = new THREE.CanvasTexture(canvas);
								// const alphaMap = new THREE.CanvasTexture(alpha);
								// console.log(canvas.width, canvas.height);
								this.item.panelTexture = {
									map: map,
									width: canvas.width,
									height: canvas.height,
								};
								resolve(this.item.panelTexture);
							}, error => {
								reject(error);
							});
						}
					});
				}
			}, 1); // keep it for childnode images to be compiled
		});
	}
}

ModelPanelComponent.ORIGIN = new THREE.Vector3();
ModelPanelComponent.PANEL_RADIUS = 99;

ModelPanelComponent.meta = {
	selector: '[model-panel]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down'],
	inputs: ['item'],
};
