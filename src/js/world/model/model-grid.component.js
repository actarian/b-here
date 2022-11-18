import { takeUntil } from 'rxjs/operators';
// import * as THREE from 'three';
import { environment } from '../../environment';
import InteractiveMesh from '../interactive/interactive.mesh';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
varying vec2 vUv;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform float opacity;
uniform float tween;

void main() {
	vec4 colorA = texture2D(textureA, vUv);
	vec4 colorB = texture2D(textureB, vUv);
	vec4 color = mix(colorA, colorB, tween);
	color.a = clamp(color.a * opacity, 0.0, 1.0);
	color.rgb /= color.a;
	gl_FragColor = color;
}
`;

export default class ModelGridComponent extends ModelComponent {

	static getLoader() {
		return ModelGridComponent.loader || (ModelGridComponent.loader = new THREE.TextureLoader());
	}

	static getTexture() {
		return ModelGridComponent.texture || (ModelGridComponent.texture = ModelGridComponent.getLoader().load(environment.getPath('textures/ui/floor-nav.png')));
	}

	static getOverTexture() {
		return ModelGridComponent.textureOver || (ModelGridComponent.textureOver = ModelGridComponent.getLoader().load(environment.getPath('textures/ui/floor-nav-over.png')));
	}

	set coords(coords) {
		if ((!coords && this.coords_ !== coords) || !this.coords_ || coords.x !== this.coords_.x || coords.y !== this.coords_.y) {
			// changed!
			const tileMap = this.tileMap;
			if (this.coords_) {
				const previousTile = tileMap[`${this.coords_.x}_${this.coords_.y}`];
				const previousUniforms = previousTile.uniforms;
				gsap.to(previousUniforms, {
					tween: 0,
					duration: 0.4,
					delay: 0,
					ease: Power2.easeInOut,
					onUpdate: () => {
						previousTile.material.uniforms.tween.value = previousUniforms.tween;
						previousTile.material.needsUpdate = true;
					}
				});
			}
			if (coords) {
				const currentTile = this.currentTile = tileMap[`${coords.x}_${coords.y}`];
				const currentUniforms = currentTile.uniforms;
				gsap.to(currentUniforms, {
					tween: 1,
					duration: 0.4,
					delay: 0,
					ease: Power2.easeInOut,
					onUpdate: () => {
						currentTile.material.uniforms.tween.value = currentUniforms.tween;
						currentTile.material.needsUpdate = true;
					}
				});
				// console.log(currentTile, `${coords.x}_${coords.y}`);
			}
			this.coords_ = coords;
		}
	}

	set coords__(coords) {
		if ((!coords && this.coords_ !== coords) || !this.coords_ || coords.x !== this.coords_.x || coords.y !== this.coords_.y) {
			// changed!
			const tileMap = this.tileMap;
			if (this.coords_) {
				const previousTile = tileMap[`${this.coords_.x}_${this.coords_.y}`];
				const from = { tween: 1 };
				gsap.to(from, {
					duration: 0.4,
					tween: 0,
					delay: 0,
					ease: Power2.easeInOut,
					onUpdate: () => {
						previousTile.material.opacity = from.tween;
						// previousTile.material.needsUpdate = true;
					}
				});
			}
			if (coords) {
				const currentTile = this.currentTile = tileMap[`${coords.x}_${coords.y}`];
				const from = { tween: 0 };
				gsap.to(from, {
					duration: 0.4,
					tween: 1,
					delay: 0,
					ease: Power2.easeInOut,
					onUpdate: () => {
						currentTile.material.opacity = from.tween;
						// currentTile.material.needsUpdate = true;
					}
				});
				// console.log(currentTile, `${coords.x}_${coords.y}`);
			}
			this.coords_ = coords;
		}
	}

	getCoords(point) {
		const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
		const col = Math.ceil((point.x + outerTileSize / 2) / outerTileSize) - 1;
		const row = Math.ceil((point.z + outerTileSize / 2) / outerTileSize) - 1;
		const dx = Math.floor(ModelGridComponent.COLS / 2);
		const dy = Math.floor(ModelGridComponent.ROWS / 2);
		const ci = Math.min(dx, Math.abs(col)) * (col ? Math.abs(col) / col : 1);
		const ri = Math.min(dy, Math.abs(row)) * (row ? Math.abs(row) / row : 1);
		if (this.view.hasTile(this.indices.x + ci, this.indices.y + ri)) {
			// console.log('col', col, 'row', row, 'ci', ci, 'ri', ri);
			return new THREE.Vector2(ci, ri);
		}
	}

	onInit() {
		super.onInit();
		this.indices = new THREE.Vector2();
		// console.log('ModelGridComponent.onInit', this.view);
		this.view.index$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(index => {
			this.moveToIndex(index);
		});
	}

	addTiles(mesh) {
		// console.log('addTiles');
		const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
		const innerTileSize = outerTileSize * 0.9;
		const geometry = new THREE.PlaneBufferGeometry(innerTileSize, innerTileSize, 2, 2);
		geometry.rotateX(-Math.PI / 2);
		const map = ModelGridComponent.getTexture();
		map.disposable = false;
		map.encoding = THREE.sRGBEncoding;
		const mapOver = ModelGridComponent.getOverTexture();
		mapOver.disposable = false;
		mapOver.encoding = THREE.sRGBEncoding;
		// geometry.scale(-1, 1, 1);
		const tileMap = this.tileMap = {};
		const tiles = this.tiles = new Array(ModelGridComponent.COLS * ModelGridComponent.ROWS).fill(0).map((x, i) => {
			const material = new THREE.ShaderMaterial({
				depthTest: false,
				depthWrite: false,
				transparent: true,
				toneMapped: false,
				vertexShader: VERTEX_SHADER,
				fragmentShader: FRAGMENT_SHADER,
				uniforms: {
					textureA: { type: 't', value: map },
					textureB: { type: 't', value: mapOver },
					tween: { value: 0 },
					opacity: { value: 0 },
				},
				extensions: {
					fragDepth: true,
				},
				// side: THREE.DoubleSide
			});
			/*
			const material = new THREE.MeshBasicMaterial({
				depthTest: false,
				depthWrite: false,
				map: map,
				transparent: true,
				opacity: 0,
				// side: THREE.DoubleSide,
			});
			*/
			const tile = new THREE.Mesh(geometry, material);
			const dx = Math.floor(ModelGridComponent.COLS / 2);
			const dy = Math.floor(ModelGridComponent.ROWS / 2);
			const row = Math.floor(i / ModelGridComponent.COLS);
			const col = i % ModelGridComponent.COLS;
			const ci = -dx + col;
			const ri = -dy + row;
			// console.log(ci, ri);
			tile.position.set(ci * outerTileSize, -ModelGridComponent.RADIUS * 0.15, ri * outerTileSize);
			tile.name = this.getName(`tile_${ci}_${ri}`);
			const uniforms = tile.uniforms = {
				tween: 0,
				opacity: 0,
				ci: ci,
				ri: ri,
			};
			tileMap[`${ci}_${ri}`] = tile;
			mesh.add(tile);
			return tile;
		});
		this.showTiles();
	}

	showTiles() {
		this.tiles.forEach((tile, i) => {
			const ix = this.indices ? this.indices.x : 0;
			const iy = this.indices ? this.indices.y : 0;
			const visible = this.view.hasTile(ix + tile.uniforms.ci, iy + tile.uniforms.ri);
			const uniforms = tile.uniforms;
			gsap.to(uniforms, {
				opacity: visible ? 1 : 0,
				duration: 0.4,
				// delay: 0 + i * 0.02,
				ease: Power2.easeInOut,
				onUpdate: () => {
					tile.material.uniforms.opacity.value = uniforms.opacity;
					tile.material.needsUpdate = true;
				},
			});
		});
	}

	addHitArea(mesh) {
		this.onGroundOver = this.onGroundOver.bind(this);
		this.onGroundMove = this.onGroundMove.bind(this);
		this.onGroundDown = this.onGroundDown.bind(this);
		this.onGroundOut = this.onGroundOut.bind(this);
		const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
		const innerTileSize = outerTileSize * 0.9;
		const geometry = new THREE.PlaneBufferGeometry(ModelGridComponent.RADIUS, ModelGridComponent.RADIUS, 8, 8); // 20, 20
		geometry.rotateX(-Math.PI / 2);
		// geometry.scale(-1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			depthTest: false,
			depthWrite: false,
			transparent: true,
			toneMapped: false,
			opacity: 0,
			// side: THREE.DoubleSide,
		});
		const ground = this.ground = new InteractiveMesh(geometry, material);
		ground.name = this.getName('ground');
		ground.position.set(0, -ModelGridComponent.RADIUS * 0.15, 0);
		ground.on('over', this.onGroundOver);
		ground.on('move', this.onGroundMove);
		ground.on('out', this.onGroundOut);
		ground.on('down', this.onGroundDown);
		mesh.add(ground);
	}

	onGroundOver() {
		const ground = this.ground;
		const coords = this.getCoords(ground.intersection.point);
		this.coords = coords;
	}

	onGroundMove() {
		const ground = this.ground;
		const coords = this.getCoords(ground.intersection.point);
		this.coords = coords;
	}

	onGroundDown() {
		const ground = this.ground;
		const coords = this.getCoords(ground.intersection.point);
		this.coords = coords;
		if (coords) {
			const index = this.view.getTileIndex(this.indices.x + coords.x, this.indices.y + coords.y);
			this.view.index = index;
			this.nav.next(index);
			/*
			this.indices.x += coords.x;
			this.indices.y += coords.y;
			const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
			this.move.next({
				indices: this.indices,
				coords,
				position: coords.clone().multiplyScalar(outerTileSize)
			});
			*/
		}
	}

	onGroundOut() {
		this.coords = null;
	}

	moveToIndex(index) {
		// console.log('ModelGridComponent.moveToIndex', index);
		this.coords = null;
		const tile = this.view.tiles[index];
		const coords = new THREE.Vector2(tile.indices.x - this.indices.x, tile.indices.y - this.indices.y);
		this.indices.x = tile.indices.x;
		this.indices.y = tile.indices.y;
		this.showTiles();
		const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
		this.move.next({
			indices: this.indices,
			coords,
			position: coords.clone().multiplyScalar(outerTileSize)
		});
	}

	onCreate(mount, dismount) {
		// this.renderOrder = environment.renderOrder.tile;
		const mesh = new THREE.Group();
		this.addTiles(mesh);
		this.addHitArea(mesh);
		/*
		mesh.userData = {
			render: () => {

			}
		};
		*/
		if (typeof mount === 'function') {
			mount(mesh);
		}
	}

	onDestroy() {
		super.onDestroy();
		const ground = this.ground;
		ground.off('over', this.onGroundOver);
		ground.off('move', this.onGroundMove);
		ground.off('down', this.onGroundDown);
		ground.off('out', this.onGroundOut);
	}

}

ModelGridComponent.RADIUS = 101;
ModelGridComponent.COLS = 11;
ModelGridComponent.ROWS = 11;

ModelGridComponent.meta = {
	selector: '[model-grid]',
	hosts: { host: WorldComponent },
	outputs: ['move', 'nav'],
	inputs: ['view'],
};
