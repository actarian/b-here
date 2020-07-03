import { takeUntil } from 'rxjs/operators';
import * as THREE from 'three';
import { environment } from '../../environment';
import InteractiveMesh from '../interactive/interactive.mesh';
import WorldComponent from '../world.component';
import ModelComponent from './model.component';

const PANEL_RADIUS = 102;
const ORIGIN = new THREE.Vector3();

const RADIUS = 101;
const COLS = 11;
const ROWS = 11;

export default class ModelGridComponent extends ModelComponent {

	static getLoader() {
		return ModelGridComponent.loader || (ModelGridComponent.loader = new THREE.TextureLoader());
	}

	static getTexture() {
		return ModelGridComponent.texture || (ModelGridComponent.texture = ModelGridComponent.getLoader().load(environment.getTexturePath('ui/floor-nav-circle-v2.png')));
	}

	set coords(coords) {
		if ((!coords && this.coords_ !== coords) || !this.coords_ || coords.x !== this.coords_.x || coords.y !== this.coords_.y) {
			// changed!
			const tileMap = this.tileMap;
			if (this.coords_) {
				const previousTile = tileMap[`${this.coords_.x}_${this.coords_.y}`];
				const from = { tween: 1 };
				gsap.to(from, 0.4, {
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
				gsap.to(from, 0.4, {
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
		const outerTileSize = RADIUS / 10; // assume room is 20m x 20m
		const col = Math.ceil((point.x + outerTileSize / 2) / outerTileSize) - 1;
		const row = Math.ceil((point.z + outerTileSize / 2) / outerTileSize) - 1;
		const dx = Math.floor(COLS / 2);
		const dy = Math.floor(ROWS / 2);
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

	onView() {

	}

	addTiles() {
		// console.log('addTiles');
		const outerTileSize = RADIUS / 10; // assume room is 20m x 20m
		const innerTileSize = outerTileSize * 0.9;
		const geometry = new THREE.PlaneBufferGeometry(innerTileSize, innerTileSize, 2, 2);
		geometry.rotateX(-Math.PI / 2);
		const map = ModelGridComponent.getTexture();
		map.disposable = false;
		map.encoding = THREE.sRGBEncoding;
		// geometry.scale(-1, 1, 1);
		const mesh = this.mesh;
		const tileMap = this.tileMap = {};
		const tiles = this.tiles = new Array(COLS * ROWS).fill(0).map((x, i) => {
			const material = new THREE.MeshBasicMaterial({
				depthTest: false,
				map: map,
				transparent: true,
				opacity: 0,
				// side: THREE.DoubleSide,
			});
			const tile = new THREE.Mesh(geometry, material);
			const dx = Math.floor(COLS / 2);
			const dy = Math.floor(ROWS / 2);
			const row = Math.floor(i / COLS);
			const col = i % COLS;
			const ci = -dx + col;
			const ri = -dy + row;
			// console.log(ci, ri);
			tile.position.set(ci * outerTileSize, -RADIUS * 0.15, ri * outerTileSize);
			tile.name = this.getName(`tile_${ci}_${ri}`);
			tileMap[`${ci}_${ri}`] = tile;
			mesh.add(tile);
		});
	}

	addHitArea() {
		this.onGroundOver = this.onGroundOver.bind(this);
		this.onGroundMove = this.onGroundMove.bind(this);
		this.onGroundDown = this.onGroundDown.bind(this);
		this.onGroundOut = this.onGroundOut.bind(this);
		const outerTileSize = RADIUS / 10; // assume room is 20m x 20m
		const innerTileSize = outerTileSize * 0.9;
		const geometry = new THREE.PlaneBufferGeometry(RADIUS, RADIUS, 20, 20);
		geometry.rotateX(-Math.PI / 2);
		// geometry.scale(-1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			depthTest: false,
			transparent: true,
			opacity: 0,
			// side: THREE.DoubleSide,
		});
		const mesh = this.mesh;
		const ground = this.ground = new InteractiveMesh(geometry, material);
		ground.name = this.getName('ground');
		ground.position.set(0, -RADIUS * 0.15, 0);
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
			const outerTileSize = RADIUS / 10; // assume room is 20m x 20m
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
		this.coords = null;
		const item = this.view.items[index];
		const coords = new THREE.Vector2(item.indices.x - this.indices.x, item.indices.y - this.indices.y);
		this.indices.x = item.indices.x;
		this.indices.y = item.indices.y;
		const outerTileSize = RADIUS / 10; // assume room is 20m x 20m
		this.move.next({
			indices: this.indices,
			coords,
			position: coords.clone().multiplyScalar(outerTileSize)
		});
	}

	onDestroy() {
		super.onDestroy();
		const ground = this.ground;
		ground.off('over', this.onGroundOver);
		ground.off('move', this.onGroundMove);
		ground.off('down', this.onGroundDown);
		ground.off('out', this.onGroundOut);
	}

	create(callback) {
		const mesh = this.mesh = new THREE.Group();
		this.addTiles();
		this.addHitArea();
		/*
		mesh.userData = {
			render: () => {

			}
		};
		*/
		if (typeof callback === 'function') {
			callback(mesh);
		}
	}

}

ModelGridComponent.ORIGIN = new THREE.Vector3();

ModelGridComponent.meta = {
	selector: '[model-grid]',
	hosts: { host: WorldComponent },
	outputs: ['move', 'nav'],
	inputs: ['view'],
};
