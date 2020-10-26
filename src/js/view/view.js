/* global THREE */

import { Subject } from "rxjs";
// import * as THREE from 'three';

export const EXT_IMAGE = [
	'jpeg', 'jpg', 'png',
];
export const EXT_VIDEO = [
	'mp4', 'webm',
];
export const EXT_MODEL = [
	'gltf', 'glb', 'usdz'
];

export const AssetType = {
	Image: { id: 1, name: 'image' }, // jpg, png, ...
	Video: { id: 2, name: 'video' }, // mp4, webm, ...
	Model: { id: 3, name: 'model' }, // gltf, glb, …
	PublisherStream: { id: 4, name: 'publisher-stream' }, // valore fisso di file a ‘publisherStream’ e folder string.empty
	NextAttendeeStream: { id: 5, name: 'next-attendee-stream' }, // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty
};

export function assetTypeFromPath(path) {
	const extension = path.split('.').pop().toLowerCase();
	if (EXT_IMAGE.indexOf(extension) !== -1) {
		return AssetType.Image;
	} else if (EXT_VIDEO.indexOf(extension) !== -1) {
		return AssetType.Video;
	} else if (EXT_MODEL.indexOf(extension) !== -1) {
		return AssetType.Model;
	}
}

export function isAssetType(path, type) {
	const assetType = assetTypeFromPath(path);
	return assetType === type;
}

export const ViewType = {
	WaitingRoom: { id: 1, name: 'waiting-room' },
	Panorama: { id: 2, name: 'panorama' },
	PanoramaGrid: { id: 3, name: 'panorama-grid' },
	Room3d: { id: 4, name: 'room-3d' },
	Model: { id: 5, name: 'model' },
};

export const ViewItemType = {
	Nav: { id: 1, name: 'nav' },
	Plane: { id: 2, name: 'plane' },
	CurvedPlane: { id: 3, name: 'curved-plane' },
	Gltf: { id: 4, name: 'gltf' },
	Texture: { id: 5, name: 'texture' },
};

export class View {
	// 'liked'
	static allowedProps = ['id', 'type', 'name', 'likes', 'asset', 'items', 'orientation', 'zoom', 'ar', 'tiles', 'invertAxes', 'flipAxes'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
			if (options.items) {
				let nextAttendeeStreamIndex = 0;
				options.items.forEach((item, index) => {
					item.index = index;
					if (item.asset && item.asset.file === 'nextAttendeeStream') {
						item.asset.index = nextAttendeeStreamIndex++;
					}
				});
			}
		}
		this.items = (this.items || []).map(item => mapViewItem(item));
		if (this.tiles) {
			this.tiles = this.tiles.map(tile => mapViewTile(tile));
		}
		this.originalItems = this.items.slice();
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (View.allowedProps.indexOf(key) !== -1) {
				switch (key) {
					case 'items':
						payload[key] = this[key].map(item => mapViewItem(item).payload);
						break;
					case 'tiles':
						payload[key] = this[key].map(tile => mapViewTile(tile).payload);
						break;
					default:
						payload[key] = this[key];
				}
			}
		});
		return payload;
	}

	get shortType() {
		return this.type ? this.type.split('-').map(x => x.substring(0, 1).toUpperCase()).join('') : '??';
	}

}

export class PanoramaView extends View {
	constructor(options) {
		super(options);
	}
}

export class PanoramaGridView extends View {

	static mapTiles(tiles = [], flipAxes = false, invertAxes = false, folder = '') {
		const axes = flipAxes ? -1 : 1;
		return tiles.map((tile, i) => {
			const indices = new THREE.Vector2();
			tile = typeof tile === 'string' ? { id: i + 1, asset: { folder: folder, file: tile }, navs: [] } : tile;
			tile.asset.file.replace(/_x([-|\d]+)_y([-|\d]+)/g, (a, b, c) => {
				if (invertAxes) {
					indices.y = parseInt(b);
					indices.x = parseInt(c) * axes;
				} else {
					indices.x = parseInt(b);
					indices.y = parseInt(c) * axes;
				}
			});
			return {
				id: tile.id,
				asset: tile.asset,
				navs: tile.navs || [],
				indices,
			};
		});
	}

	set index(index) {
		if (this.index_ !== index) {
			this.index_ = index;
			this.tiles.forEach((tile, i) => tile.selected = i === index);
			this.updateCurrentItems();
			// console.log('PanoramaGridView.index.set', index, this.items);
			this.index$.next(index);
		}
	}
	get index() {
		return this.index_;
	}

	constructor(options) {
		options.tiles = PanoramaGridView.mapTiles(options.tiles, options.flipAxes, options.invertAxes, options.asset ? options.asset.folder : '');
		super(options);
		/*
		if (!this.tiles.length) {
			throw new Error('PanoramaGridView.constructor tile list is empty!');
		}
		*/
		this.index_ = 0;
		this.index$ = new Subject();
		this.tiles.forEach((tile, i) => tile.selected = i === 0);
		if (this.tiles.length) {
			this.items = this.originalItems.concat(this.tiles[0].navs);
			this.asset = this.tiles[0].asset;
		}
	}

	updateCurrentItems() {
		this.items = this.originalItems.concat(this.tiles[this.index_].navs);
	}

	getTileIndex(x, y) {
		return this.tiles.reduce((p, c, i) => {
			if (c.indices.x === x && c.indices.y === y) {
				return i;
			} else {
				return p;
			}
		}, -1);
	}
	hasTile(x, y) {
		return this.getTileIndex(x, y) !== -1;
	}
	getTile(x, y) {
		const index = this.getTileIndex(x, y);
		if (index !== -1) {
			this.index = index;
			return this.tiles[index];
		}
	}
}

export class ModelView extends View {
	constructor(options) {
		super(options);
	}
}

export class ViewItem {
	static allowedProps = ['id', 'type', 'title', 'abstract', 'asset', 'link', 'viewId', 'keepOrientation', 'position', 'rotation', 'scale', 'radius', 'height', 'arc'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (ViewItem.allowedProps.indexOf(key) !== -1) {
				payload[key] = this[key];
			}
		});
		if (payload.link && (!payload.link.title || !payload.link.href)) {
			delete payload.link;
		}
		return payload;
	}
}

export class NavViewItem extends ViewItem {

}

export class ViewTile {
	static allowedProps = ['id', 'asset', 'navs'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
		this.navs = (this.navs || []).map(nav => mapViewItem(nav));
		this.originalItems = this.navs.slice();
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (ViewTile.allowedProps.indexOf(key) !== -1) {
				switch (key) {
					case 'navs':
						payload[key] = this[key].map(nav => mapViewItem(nav).payload);
						break;
					default:
						payload[key] = this[key];
				}
			}
		});
		return payload;
	}
}

export class Asset {
	static allowedProps = ['id', 'type', 'folder', 'file', 'linkedPlayId', 'chromaKeyColor'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (Asset.allowedProps.indexOf(key) !== -1) {
				payload[key] = this[key];
			}
		});
		return payload;
	}
	static fromUrl(url) {
		const segments = url.split('/');
		const file = segments.pop();
		const folder = segments.join('/') + '/';
		const type = assetTypeFromPath(file);
		return new Asset({
			type: type,
			folder: folder,
			file: file,
		});
	}
}

export function mapView(view) {
	switch (view.type.name) {
		case ViewType.Panorama.name:
			view = new PanoramaView(view);
			break;
		case ViewType.PanoramaGrid.name:
			view = new PanoramaGridView(view);
			break;
		case ViewType.Model.name:
			view = new ModelView(view);
			break;
		default:
			view = new View(view);
	}
	return view;
}

export function mapViewItem(item) {
	switch (item.type.name) {
		case ViewItemType.Nav.name:
			item = new NavViewItem(item);
			break;
		default:
			item = new ViewItem(item);
	}
	return item;
}

export function mapViewTile(tile) {
	return new ViewTile(tile);
}

export function mapAsset(asset) {
	switch (asset.type) {
		default:
			asset = new Asset(asset);
	}
	return asset;
}
