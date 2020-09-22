import { Subject } from "rxjs";
import * as THREE from 'three';

export const AssetType = {
	Image: 'image', // jpg, png, ...
	Video: 'video', // mp4, webm, ...
	Model: 'model', // gltf, glb, …
	PublisherStream: 'publisher-stream', // valore fisso di file a ‘publisherStream’ e folder string.empty
	NextAttendeeStream: 'next-attendee-stream', // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty
};

export const ViewType = {
	WaitingRoom: 'waiting-room',
	Panorama: 'panorama',
	PanoramaGrid: 'panorama-grid',
	Room3d: 'room-3d',
	Model: 'model',
};

export const ViewItemType = {
	Nav: 'nav',
	Gltf: 'gltf',
	Plane: 'plane',
	CurvedPlane: 'curved-plane',
	Texture: 'texture',
};

export class View {
	static allowedProps = ['id', 'type', 'name', 'likes', 'liked', 'asset', 'items', 'orientation', 'zoom', 'ar', 'tiles', 'invertAxes', 'flipAxes'];
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
		this.originalItems = this.items.slice();
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (ViewItem.allowedProps.indexOf(key) !== -1) {
				payload[key] = this[key];
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
	set index(index) {
		if (this.index_ !== index) {
			this.index_ = index;
			this.items = this.originalItems.concat(this.tiles[index].navs);
			// console.log('PanoramaGridView.index.set', index, this.items);
			this.index$.next(index);
		}
	}
	get index() {
		return this.index_;
	}
	constructor(options) {
		if (options.tiles) {
			options.tiles = options.tiles.map((tile, i) => {
				const indices = new THREE.Vector2();
				tile = typeof tile === 'string' ? { asset: { folder: options.asset.folder, file: tile }, navs: [] } : tile;
				tile.asset.file.replace(/_x([-|\d]+)_y([-|\d]+)/g, (a, b, c) => {
					const flipAxes = options.flipAxes ? -1 : 1;
					if (options.invertAxes) {
						indices.y = parseInt(b);
						indices.x = parseInt(c) * flipAxes;
					} else {
						indices.x = parseInt(b);
						indices.y = parseInt(c) * flipAxes;
					}
					// console.log('PanoramaGridView', tile, indices);
				});
				return {
					id: i + 1,
					asset: tile.asset,
					navs: tile.navs || [],
					indices,
				};
			});
		}
		super(options);
		if (!this.tiles.length) {
			throw new Error('PanoramaGridView.constructor tile list is empty!');
		}
		this.index_ = 0;
		this.index$ = new Subject();
		this.items = this.originalItems.concat(this.tiles[0].navs);
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
	static allowedProps = ['id', 'type', 'title', 'abstract', 'asset', 'link', 'viewId', 'position', 'rotation', 'scale', 'radius', 'arc', 'height'];
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
		return payload;
	}
}

export class NavViewItem extends ViewItem {

}

export class Asset {
	static allowedProps = ['id', 'type', 'folder', 'file', 'fileName', 'linkedPlayId', 'chromaKeyColor'];
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
		const fileName = segments.pop();
		const folder = segments.join('/') + '/';
		return new Asset({
			type: AssetType.Image,
			folder: folder,
			fileName: fileName,
		});
	}
}

export function mapView(view) {
	switch (view.type) {
		case ViewType.Panorama:
			view = new PanoramaView(view);
			break;
		case ViewType.PanoramaGrid:
			view = new PanoramaGridView(view);
			break;
		case ViewType.Model:
			view = new ModelView(view);
			break;
		default:
			view = new View(view);
	}
	return view;
}

export function mapViewItem(item) {
	switch (item.type) {
		case ViewItemType.Nav:
			item = new NavViewItem(item);
			break;
		default:
			item = new ViewItem(item);
	}
	return item;
}

export function mapAsset(asset) {
	switch (asset.type) {
		default:
			asset = new Asset(asset);
	}
	return asset;
}
