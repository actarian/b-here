import { getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
import { environment } from '../../environment';
import { LabelPipe } from '../../label/label.pipe';
import LoaderService from '../../loader/loader.service';
import { ViewType } from '../../view/view';
import { PANORAMA_RADIUS } from '../geometry/geometry';
import VRService from '../vr.service';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

// export const LOADING_BANNER = { title: LabelPipe.transform('loading') };
// export const WAITING_BANNER = { title: LabelPipe.transform('waiting_host') };

const PANEL_RADIUS = PANORAMA_RADIUS - 0.01;

export default class ModelProgressComponent extends ModelComponent {

	get title() {
		return this.title_;
	}
	set title(title) {
		if (this.title_ !== title) {
			this.title_ = title;
			if (title === LabelPipe.transform('waiting_host') || (title !== '' && this.visible_)) {
				this.updateProgress();
				this.show();
			} else {
				this.hide();
			}
		}
	}

	get visible() {
		return this.visible_;
	}
	set visible(visible) {
		if (this.visible_ !== visible) {
			this.visible_ = visible;
			if (visible && this.title_ !== '') {
				this.updateProgress();
				this.show();
			} else {
				this.hide();
			}
		}
	}

	onInit() {
		this.title_ = '';
		this.visible_ = this.host.renderer.xr.isPresenting;
		super.onInit();
		const vrService = this.vrService = VRService.getService();
		vrService.session$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((session) => this.visible = session != null); // loose
		// this.progress = LoaderService.progress;
		/*
		const { node } = getContext(this);
		const inner = node.querySelector('.inner');
		LoaderService.progress$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(progress => {
			progress.count > 0 ? node.classList.add('active') : node.classList.remove('active');
			inner.style.width = `${progress.count}%`;
		});
		*/
	}

	onCreate(mount, dismount) {
		// console.log('ModelProgressComponent.onCreate');
		const { node } = getContext(this);
		const inner = node.querySelector('.inner');
		this.getCanvasTexture().then(result => {
			const mesh = this.createMesh(result);
			if (typeof mount === 'function') {
				mount(mesh);
			}
			LoaderService.progress$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(progress => {
				progress.count > 0 ? node.classList.add('active') : node.classList.remove('active');
				inner.style.width = `${progress.value * 100}%`;
				if (progress.count) {
					this.title = progress.value === 0 ? LabelPipe.transform('loading') : progress.title;
				} else {
					this.title = this.getTitle();
				}
			});
		});
	}

	getTitle() {
		if (this.view && this.view.type.name === ViewType.WaitingRoom.name) {
			return LabelPipe.transform('waiting_host');
		} else {
			return '';
		}
	}

	show() {
		this.mesh.add(this.banner);
		this.material.opacity = 1;
		this.material.needsUpdate = true;
		/*
		const material = this.material;
		const from = { value: material.opacity };
		gsap.to(from, {
			duration: 0.5,
			value: 1,
			delay: 0.0,
			ease: Power2.easeInOut,
			overwrite: 'all',
			onUpdate: () => {
				material.opacity = from.value;
				material.needsUpdate = true;
			}
		});
		*/
	}

	hide() {
		this.mesh.remove(this.banner);
		this.material.opacity = 0;
		this.material.needsUpdate = true;
		/*
		const from = { value: material.opacity };
		gsap.to(from, {
			duration: 0.5,
			value: 0,
			delay: 0.0,
			ease: Power2.easeInOut,
			overwrite: 'all',
			onUpdate: () => {
				material.opacity = from.value;
				material.needsUpdate = true;
			},
			onComplete: () => {
				this.mesh.remove(this.banner);
			}
		});
		*/
	}

	createMesh(result) {
		const mesh = new THREE.Group();
		// const repeat = 24;
		// const aspect = (result.width * repeat) / result.height;
		const arc = Math.PI / 180 * 360;
		const width = PANEL_RADIUS * arc;
		const height = width / 360 * 2.4;
		const w = result.width * height / result.height;
		const repeat = width / w;
		const geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS, PANEL_RADIUS, height, 80, 2, true, 0, arc);
		geometry.scale(-1, 1, 1);
		const texture = result.texture;
		texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
		texture.repeat.x = repeat;
		texture.encoding = THREE.sRGBEncoding;
		const material = this.material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			opacity: 0,
			toneMapped: false,
			// side: THREE.DoubleSide,
		});
		const banner = this.banner = new THREE.Mesh(geometry, material);
		mesh.userData = {
			render: () => {
				mesh.rotation.y += Math.PI / 180 * 0.02;
				// texture.offset.x = (texture.offset.x - 0.01) % 1;
				// material.needsUpdate = true;
			}
		};
		return mesh;
	}

	updateProgress() {
		this.getCanvasTexture().then(result => {
			// console.log('ModelProgressComponent.updateProgress', result);
			const arc = Math.PI / 180 * 360;
			const width = PANEL_RADIUS * arc;
			const height = width / 360 * 2.4;
			const w = result.width * height / result.height;
			const repeat = width / w;
			this.texture.repeat.x = repeat;
		});
	}

	getCanvasTexture() {
		return new Promise((resolve, reject) => {
			const MIN_W = 512;
			let W = MIN_W;
			let H = 64;
			const F = Math.floor(H * 0.75);
			const L = Math.floor(H * 0.05);
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
			const text = this.title_;
			// console.log('ModelProgressComponent.getCanvasTexture', text);
			const ctx = canvas.getContext('2d');
			// const ctx = text.material.map.image.getContext('2d');
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			ctx.font = `300 ${F}px ${environment.fontFamily}`;
			const metrics = ctx.measureText(text);
			W = metrics.width + 8;
			W = Math.max(MIN_W, Math.pow(2, Math.ceil(Math.log(W) / Math.log(2))));
			// const x = W / 2;
			// const y = 16;
			canvas.width = W;
			ctx.clearRect(0, 0, W, H);
			ctx.fillStyle = '#0000005A'; // 35% // '#000000C0'; // 75%
			ctx.fillRect(0, 0, W, H);
			ctx.font = `300 ${F}px ${environment.fontFamily}`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
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
}

ModelProgressComponent.meta = {
	selector: '[model-progress]',
	hosts: { host: WorldComponent },
	inputs: ['view'],
};
