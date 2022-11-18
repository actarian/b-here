// import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { getContext } from 'rxcomp';
// import * as THREE from 'three';
import DragService from '../../drag/drag.service';
import { environment } from '../../environment';
import { Host } from '../host/host';
import InteractiveSprite from '../interactive/interactive.sprite';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

// const USE_DOM_TO_IMAGE = true;

export default class ModelPanelComponent extends ModelComponent {

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
		const textureWidth = this.textureWidth;
		const textureHeight = this.textureHeight;
		const item = this.item;
		const panel = this.panel;
		if (panel) {
			const scale = 0.2 * (item.asset ? 1.5 : 1.0) * (this.isMobile ? 1.6 : 1);
			const aspect = textureWidth / textureHeight;
			const width = ModelPanelComponent.PANEL_RADIUS * scale;
			const height = ModelPanelComponent.PANEL_RADIUS * scale / aspect;
			const dy = width * 0.25;
			const position = item.mesh.position.normalize().multiplyScalar(ModelPanelComponent.PANEL_RADIUS);
			panel.position.set(position.x, position.y + (height + dy * 2) - dy * (1 - pow), position.z);
			panel.scale.set(0.02 * width, 0.02 * height, 1);
		}
	}

	onInit() {
		super.onInit();
		this.textureWidth = 0;
		this.textureHeight = 0;
		// console.log('ModelPanelComponent.onInit', this.item);
	}

	onView() {
		if (this.viewed) {
			return;
		}
		this.viewed = true;
		const { node } = getContext(this);
		this.getCanvasTexture(node).then(texture => {
			this.textureWidth = texture.width;
			this.textureHeight = texture.height;
			if (this.mesh && this.item) {
				const material = new THREE.SpriteMaterial({
					depthTest: false,
					transparent: true,
					opacity: 0,
					map: texture.map,
					sizeAttenuation: false,
					toneMapped: false,
				});
				const item = this.item;
				const panel = this.panel = new InteractiveSprite(material);
				panel.renderOrder = environment.renderOrder.panel;
				this.setScale(1);
				panel.on('down', (event) => {
					// console.log(event.intersection.uv.x, event.intersection.uv.y, node.offsetWidth, node.offsetHeight);
					const xy = { x: parseInt(event.intersection.uv.x * node.offsetWidth), y: parseInt((1 - event.intersection.uv.y) * node.offsetHeight) };
					// console.log('ModelPanelComponent.down.xy', xy);
					const linkNodes = Array.prototype.slice.call(node.querySelectorAll('.panel__link'));
					// console.log('linkNodes', linkNodes);
					const linkNode = linkNodes.find(link => {
						const inside = xy.x >= link.offsetLeft && xy.y >= link.offsetTop && xy.x <= (link.offsetLeft + link.offsetWidth) && xy.y <= (link.offsetTop + link.offsetHeight);
						/*
						console.log(
							(link.offsetLeft + link.offsetWidth), '>=', xy.x, '>=', link.offsetLeft,
							(link.offsetTop + link.offsetHeight), '>=', xy.y, '>=', link.offsetTop,
							inside,
						);
						*/
						return inside;
					});
					// console.log('linkNode', linkNode);
					if (linkNode) {
						const linkIndex = linkNodes.indexOf(linkNode);
						const link = item.links[linkIndex];
						// console.log('ModelPanelComponent.down.link', link, linkNode, linkNodes);
						this.down.next({ item, link, linkIndex });
						const rect = node.getBoundingClientRect();
						const mouseEvent = {
							button: 0,
							buttons: 0,
							clientX: xy.x + rect.left,
							clientY: xy.y + rect.top,
							movementX: 0,
							movementY: 0,
							relatedTarget: linkNode,
							screenX: xy.x,
							screenY: xy.y,
						};
						const event = new MouseEvent('mouseup', mouseEvent);
						linkNode.dispatchEvent(event);
						// console.log('ModelPanelComponent.dispatchEvent', mouseEvent);
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
						this.setScale(1 - from.value);
						panel.lookAt(Host.origin);
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
							/*
							if (USE_DOM_TO_IMAGE) {
								domtoimage.toBlob(node, { cacheBust: true }).then(function(blob) {
									createImageBitmap(blob).then(function(imageBitmap) {
										const map = new THREE.Texture();
										map.image = imageBitmap;
										map.needsUpdate = true;
										this.item.panelTexture = {
											map: map,
											width: imageBitmap.width,
											height: imageBitmap.height,
										};
										resolve(this.item.panelTexture);

									}, error => {
										reject(error);
									});
								}, error => {
									reject(error);
								});
							} else {
							*/
							/*
							htmlToImage.toCanvas(node).then((canvas) => {
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
							}).catch(error => {
								console.log('htmlToImage', error);
								reject(error);
							});
							*/
							html2canvas(node, {
								backgroundColor: '#ffffff00',
								scale: 1,
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
							// }
						}
					});
				}
			}, 1); // keep it for childnode images to be compiled
		});
	}
}

ModelPanelComponent.PANEL_RADIUS = 99;

ModelPanelComponent.meta = {
	selector: '[model-panel]',
	hosts: { host: WorldComponent },
	outputs: ['over', 'out', 'down'],
	inputs: ['item'],
	template: /* html */`
		<div class="panel__title"><span [innerHTML]="item.title"></span></div>
		<div class="panel__abstract"><span [innerHTML]="item.abstract"></span></div>
		<img class="panel__picture" [src]="item.asset | asset" *if="item.asset">
		<a class="panel__link" [href]="link.href" target="_blank" rel="noopener" *for="let link of item.links">
			<span [innerHTML]="link.title"></span>
		</a>
	`,
};
