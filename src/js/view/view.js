/* global THREE */

import { Subject } from 'rxjs';
// import * as THREE from 'three';
import StateService from '../state/state.service';

export const ViewType = {
	WaitingRoom: { id: 1, name: 'waiting-room' },
	Panorama: { id: 2, name: 'panorama' },
	PanoramaGrid: { id: 3, name: 'panorama-grid' },
	Room3d: { id: 4, name: 'room-3d' },
	Model: { id: 5, name: 'model' },
	Media: { id: 6, name: 'media' },
};

export const ViewItemType = {
	Nav: { id: 1, name: 'nav' },
	Plane: { id: 2, name: 'plane' },
	CurvedPlane: { id: 3, name: 'curved-plane' },
	Model: { id: 4, name: 'model' },
	Texture: { id: 5, name: 'texture' },
};

export class View {
	// 'liked'
	static allowedProps = ['id', 'type', 'name', 'hidden', 'likes', 'asset', 'items', 'orientation', 'zoom', 'ar', 'tiles', 'invertAxes', 'flipAxes'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
			this.updateIndices(options.items);
		}
		this.items = (this.items || []).filter(item => filterViewItem(item)).map(item => mapViewItem(item));
		if (this.tiles) {
			this.tiles = this.tiles.map(tile => mapViewTile(tile));
		}
		this.originalItems = this.items.slice();
		this.lastOrientation = { latitude: 0, longitude: 0 };
		this.path = true;
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

	get pathItems() {
		return this.items.filter(x => x.path);
	}

	get shortType() {
		return this.type ? this.type.split('-').map(x => x.substring(0, 1).toUpperCase()).join('') : '??';
	}

	updateIndices(items) {
		if (items) {
			let publisherStreamIndex = 0;
			let attendeeStreamIndex = 0;
			let smartDeviceStream = 0;
			let publisherScreenIndex = 0;
			let attendeeScreenIndex = 0;
			items.forEach((item, index) => {
				item.index = index;
				if (item.asset) {
					switch (item.asset.file) {
						case 'publisherStream':
							item.asset.index = publisherStreamIndex++;
							break;
						case 'nextAttendeeStream':
							item.asset.index = attendeeStreamIndex++;
							break;
						case 'smartDeviceStream':
							item.asset.index = smartDeviceStream++;
							break;
						case 'publisherScreen':
							item.asset.index = publisherScreenIndex++;
							break;
						case 'attendeeScreen':
							item.asset.index = attendeeScreenIndex++;
							break;
					}
				}
				/*
				if (item.asset && item.asset.file === 'publisherStream') {
					item.asset.index = publisherStreamIndex++;
				}
				if (item.asset && item.asset.file === 'nextAttendeeStream') {
					item.asset.index = attendeeStreamIndex++;
				}
				*/
			});
		}
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
				type: Object.assign({}, ViewType.PanoramaGrid),
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

export class Room3DView extends View {
	constructor(options) {
		super(options);
	}
}

export class ModelView extends View {
	constructor(options) {
		super(options);
	}
}

export class MediaView extends View {
	constructor(options) {
		super(options);
	}
}

export class ViewItem {
	static allowedProps = ['id', 'type', 'title', 'abstract', 'asset', 'link', 'links', 'viewId', 'hook', 'hookExtra', 'keepOrientation', 'important', 'transparent', 'position', 'rotation', 'scale', 'radius', 'height', 'arc'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
		this.path = true;
		const links = this.links || (this.link ? [this.link] : []);
		this.links = links;
	}
	get firstLink() {
		return (this.links && this.links.length) ? this.links[0] : null;
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
	get hasPanel() {
		return this.type.name === ViewItemType.Nav.name && (
			(this.title && this.title !== '') ||
			(this.abstract && this.abstract !== '') ||
			this.asset ||
			this.link
		);
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

export function mapView(view) {
	switch (view.type.name) {
		case ViewType.Panorama.name:
			view = new PanoramaView(view);
			break;
		case ViewType.PanoramaGrid.name:
			view = new PanoramaGridView(view);
			break;
		case ViewType.Room3d.name:
			view = new Room3DView(view);
			break;
		case ViewType.Model.name:
			view = new ModelView(view);
			break;
		case ViewType.Media.name:
			view = new MediaView(view);
			break;
		default:
			view = new View(view);
	}
	return view;
}

export function filterViewItem(item) {
	let flag;
	switch (item.type.name) {
		case ViewItemType.Nav.name:
			flag = item.viewId == null || isNavMove(item) || StateService.state.navigable;
			break;
		default:
			flag = true;
	}
	return flag;
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

export function isNavMove(item) {
	return !isValidText(item.title) && !isValidText(item.abstract);
}

export function isValidText(text) {
	return text && text.length > 0;
}
