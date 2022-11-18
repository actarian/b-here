// import * as THREE from 'three';
import { environment } from '../../environment';
import { PANORAMA_RADIUS } from '../geometry/geometry';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const PANEL_RADIUS = PANORAMA_RADIUS - 0.01;

export default class ModelBannerComponent extends ModelComponent {

	get title() {
		return this.title_;
	}
	set title(title) {
		if (this.title_ !== title) {
			const init = this.title_ != null;
			this.title_ = title;
			if (!init) {
				this.createBanner();
			} else {
				this.updateBanner();
			}
		}
	}

	/*
	onInit() {
		super.onInit();
		// console.log('ModelBannerComponent.onInit', this.item);
	}

	onView() {
		// console.log('ModelBannerComponent.onView', this.item);
		if (this.viewed) {
			return;
		}
		this.viewed = true;
		// this.createBanner();
	}
	*/

	onChanges() {
		// console.log('ModelBannerComponent.onChanges', this.item);
		this.title = this.item.title;
	}

	createBanner() {
		this.getCanvasTexture().then(result => {
			const texture = result.texture;
			const repeat = 24;
			texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
			texture.repeat.x = repeat;
			texture.encoding = THREE.sRGBEncoding;
			const aspect = (result.width * repeat) / result.height;
			const arc = Math.PI / 180 * 360;
			const width = PANEL_RADIUS * arc;
			const height = width / aspect;
			const geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS, PANEL_RADIUS, height, 80, 2, true, 0, arc);
			geometry.scale(-1, 1, 1);
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				opacity: 0,
				toneMapped: false,
				// side: THREE.DoubleSide,
			});
			const mesh = this.mesh;
			const banners = this.banners = new Array(1).fill(0).map(x => new THREE.Mesh(geometry, material));
			banners.forEach((banner, i) => {
				banner.rotation.y = Math.PI / 2 * i;
				// !!!
				// mesh.add(banner);
			});
			const from = { value: 0 };
			gsap.to(from, {
				duration: 0.5,
				value: 1,
				delay: 0.0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.opacity = from.value;
					material.needsUpdate = true;
				}
			});
			mesh.userData = {
				render: () => {
					mesh.rotation.y += Math.PI / 180 * 0.02;
					// texture.offset.x = (texture.offset.x - 0.01) % 1;
					material.needsUpdate = true;
				}
			};
		});
	}

	updateBanner() {
		this.getCanvasTexture().then(result => {
			// console.log('ModelBannerComponent.updateBanner', result);
		});
	}

	/*
	onViewBak() {
		if (this.viewed) {
			return;
		}
		this.viewed = true;
		this.getCanvasTexture().then(result => {
			const texture = result.texture;
			const repeat = 3;
			texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
			texture.repeat.x = repeat;
			texture.encoding = THREE.sRGBEncoding;
			const aspect = (result.width * repeat) / result.height;
			const arc = Math.PI / 180 * 45;
			const width = PANEL_RADIUS * arc;
			const height = width / aspect;
			const geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS, PANEL_RADIUS, height, 20, 2, true, 0, arc);
			geometry.scale(-1, 1, 1);
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				opacity: 0,
				// side: THREE.DoubleSide,
			});
			const mesh = this.mesh;
			const banners = this.banners = new Array(4).fill(0).map(x => new THREE.Mesh(geometry, material));
			banners.forEach((banner, i) => {
				banner.rotation.y = Math.PI / 2 * i;
				mesh.add(banner);
			});
			const from = { value: 0 };
			gsap.to(from, {
				duration: 0.5,
				value: 1,
				delay: 0.0,
				ease: Power2.easeInOut,
				onUpdate: () => {
					material.opacity = from.value;
					material.needsUpdate = true;
				}
			});
			mesh.userData = {
				render: () => {
					mesh.rotation.y += Math.PI / 180 * 0.2;
					texture.offset.x = (texture.offset.x - 0.01) % 1;
					material.needsUpdate = true;
				}
			};
		});
	}
	*/

	onCreate(mount, dismount) {
		const mesh = new THREE.Group();
		if (typeof mount === 'function') {
			mount(mesh);
		}
	}

	getCanvasTexture() {
		return new Promise((resolve, reject) => {
			const MIN_W = 512;
			let W = MIN_W;
			let H = 128;
			const F = Math.floor(H * 0.8);
			const L = Math.floor(H * 0.075);
			let canvas;
			if (this.canvas) {
				canvas = this.canvas;
			} else {
				canvas = this.canvas = document.createElement('canvas');
				// canvas.classList.add('canvas--debug');
				// document.querySelector('body').appendChild(canvas);
			}
			canvas.width = W;
			canvas.height = H;
			const text = this.item.title;
			const ctx = canvas.getContext('2d');
			// const ctx = text.material.map.image.getContext('2d');
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			ctx.font = `${F}px ${environment.fontFamily}`;
			const metrics = ctx.measureText(text);
			W = metrics.width + 8;
			W = Math.max(MIN_W, Math.pow(2, Math.ceil(Math.log(W) / Math.log(2))));
			// const x = W / 2;
			// const y = 16;
			canvas.width = W;
			ctx.clearRect(0, 0, W, H);
			ctx.fillStyle = '#0000005A'; // 35% // '#000000C0'; // 75%
			ctx.fillRect(0, 0, W, H);
			ctx.font = `${F}px ${environment.fontFamily}`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.lineWidth = L;
			ctx.lineJoin = 'round'; // Experiment with 'bevel' & 'round' for the effect you want!
			ctx.miterLimit = 2;
			ctx.strokeText(text, W / 2, H / 2);
			ctx.fillStyle = 'white';
			ctx.fillText(text, W / 2, H / 2, W);
			// text.material.map.needsUpdate = true;
			let texture;
			if (this.texture) {
				texture = this.texture;
				texture.needsUpdate = true;
			} else {
				texture = this.texture = new THREE.CanvasTexture(canvas);
			}
			// console.log(F, L, W, H);
			resolve({ texture: texture, width: W, height: H });
		});
	}

	/*
	getCanvasTexture_() {
		return new Promise((resolve, reject) => {
			if (this.item.bannerTexture) {
				resolve(this.item.bannerTexture);
			} else {
				const { node } = getContext(this);
				setTimeout(() => {
					html2canvas(node, {
						backgroundColor: '#00000000', // '#000000ff',
						scale: 2,
					}).then(canvas => {
						// !!!
						// document.body.appendChild(canvas);
						// const alpha = this.getAlphaFromCanvas(canvas);
						// document.body.appendChild(alpha);
						const texture = new THREE.CanvasTexture(canvas);
						// const alphaMap = new THREE.CanvasTexture(alpha);
						this.item.bannerTexture = {
							texture: texture,
							width: canvas.width,
							height: canvas.height,
						};
						resolve(this.item.bannerTexture);
					}, error => {
						reject(error);
					});
				}, 1);
			}
		});
	}
	*/
}

ModelBannerComponent.meta = {
	selector: '[model-banner]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
