import html2canvas from 'html2canvas';
import { getContext } from 'rxcomp';
// import * as THREE from 'three';
import { PANORAMA_RADIUS } from '../panorama/panorama';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const PANEL_RADIUS = PANORAMA_RADIUS - 0.01;
const ORIGIN = new THREE.Vector3();

export default class ModelBannerComponent extends ModelComponent {

	onInit() {
		super.onInit();
		// console.log('ModelBannerComponent.onInit', this.item);
	}

	onView() {
		if (this.banners) {
			return;
		}
		this.getCanvasTexture().then(result => {
			const texture = result.map;
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

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.banner;
		const mesh = new THREE.Group();
		mesh.userData = {
			render: () => {
				mesh.rotation.y += Math.PI / 180 * 0.1;
			}
		};
		if (typeof mount === 'function') {
			mount(mesh);
		}
	}

	getCanvasTexture() {
		return new Promise((resolve, reject) => {
			if (this.item.bannerTexture) {
				resolve(this.item.bannerTexture);
			} else {
				const { node } = getContext(this);
				setTimeout(() => {
					html2canvas(node, {
						backgroundColor: '#000000ff', // '#0099ffff',
						scale: 2,
					}).then(canvas => {
						// !!!
						// document.body.appendChild(canvas);
						// const alpha = this.getAlphaFromCanvas(canvas);
						// document.body.appendChild(alpha);
						const map = new THREE.CanvasTexture(canvas);
						// const alphaMap = new THREE.CanvasTexture(alpha);
						this.item.bannerTexture = {
							map: map,
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
}

ModelBannerComponent.ORIGIN = new THREE.Vector3();

ModelBannerComponent.meta = {
	selector: '[model-banner]',
	hosts: { host: WorldComponent },
	inputs: ['item'],
};
