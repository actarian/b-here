import { fromEvent, merge } from "rxjs";
import { filter, map } from "rxjs/operators";
import HttpService from "../http/http.service";
import { mapAsset, mapView, mapViewItem, ViewType } from '../view/view';

export default class EditorService {

	static data$() {
		return HttpService.get$(`/api/view`).pipe(
			map(data => {
				data.views = data.views.map(view => mapView(view));
				return data;
			}),
		);
	}

	static viewIdOptions$() {
		return this.data$().pipe(
			map(data => {
				const options = data.views.map(view => ({ id: view.id, name: view.name }));
				options.unshift({ id: null, name: 'Select' });
				return options;
			})
		);
	}

	static viewCreate$(view) {
		return HttpService.post$(`/api/view`, view).pipe(
			map(view => mapView(view)),
		);
	}
	static viewUpdate$(view) {
		return HttpService.put$(`/api/view/${view.id}`, view.payload).pipe(
			map(view => mapView(view)),
		);
	}
	static viewDelete$(view) {
		return HttpService.delete$(`/api/view/${view.id}`);
	}

	static getTile(view) {
		let tile;
		if (view.type.name === ViewType.PanoramaGrid.name) {
			tile = view.tiles[view.index];
		}
		return tile;
	}

	static inferItemCreate$(view, item) {
		const tile = this.getTile(view);
		if (tile) {
			return this.tileItemCreate$(view, tile, item);
		} else {
			return this.itemCreate$(view, item);
		}
	}
	static inferItemUpdate$(view, item) {
		const tile = this.getTile(view);
		if (tile) {
			return this.tileItemUpdate$(view, tile, item);
		} else {
			return this.itemUpdate$(view, item);
		}
	}
	static inferItemDelete$(view, item) {
		const tile = this.getTile(view);
		if (tile) {
			return this.tileItemDelete$(view, tile, item);
		} else {
			return this.itemDelete$(view, item);
		}
	}
	static inferItemUpdateResult$(view, item) {
		const tile = this.getTile(view);
		let currentItem;
		if (tile) {
			currentItem = tile.navs.find(i => i.id === item.id);
		} else {
			currentItem = view.items.find(i => i.id === item.id);
		}
		if (currentItem) {
			Object.assign(currentItem, item);
		}
	}
	static inferItemDeleteResult$(view, item) {
		const tile = this.getTile(view);
		let items;
		if (tile) {
			items = tile.navs;
		} else {
			items = view.items;
		}
		if (items) {
			const index = items.indexOf(item);
			if (index !== -1) {
				items.splice(index, 1);
			}
			if (tile) {
				view.updateCurrentItems();
			}
		}
	}

	static itemCreate$(view, item) {
		return HttpService.post$(`/api/view/${view.id}/item`, item).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static itemUpdate$(view, item) {
		return HttpService.put$(`/api/view/${view.id}/item/${item.id}`, item.payload).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static itemDelete$(view, item) {
		return HttpService.delete$(`/api/view/${view.id}/item/${item.id}`);
	}

	static tileItemCreate$(view, tile, item) {
		return HttpService.post$(`/api/view/${view.id}/tile/${tile.id}/item`, item).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static tileItemUpdate$(view, tile, item) {
		return HttpService.put$(`/api/view/${view.id}/tile/${tile.id}/item/${item.id}`, item.payload).pipe(
			map(item => mapViewItem(item)),
		);
	}
	static tileItemDelete$(view, tile, item) {
		return HttpService.delete$(`/api/view/${view.id}/tile/${tile.id}/item/${item.id}`);
	}

	static assetCreate$(asset) {
		return HttpService.post$(`/api/asset`, asset).pipe(
			map(asset => mapAsset(asset)),
		);
	}
	static assetUpdate$(asset) {
		return HttpService.put$(`/api/asset/${asset.id}`, asset).pipe(
			map(asset => mapAsset(asset)),
		);
	}
	static assetDelete$(asset) {
		return HttpService.delete$(`/api/asset/${asset.id}`);
	}

	static upload$(files) {
		const formData = new FormData();
		files.forEach(file => formData.append('file', file, file.name));
		const xhr = new XMLHttpRequest();
		const events$ = merge(
			fromEvent(xhr.upload, 'loadstart'),
			fromEvent(xhr.upload, 'progress'),
			fromEvent(xhr.upload, 'load'),
			fromEvent(xhr, 'readystatechange'),
		).pipe(
			map(event => {
				switch (event.type) {
					case 'readystatechange':
						if (xhr.readyState === 4) {
							return JSON.parse(xhr.responseText);
						} else {
							return null;
						}
						break;
					default:
						return null;
				}
			}),
			filter(event => event !== null)
		);
		xhr.open('POST', `/api/upload/`, true);
		xhr.send(formData);
		return events$;
	}

}
