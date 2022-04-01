import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from '../../http/http.service';
import { ViewType } from '../../view/view';

let MENU_UID = 0;

export default class MenuService {

	static active$ = new BehaviorSubject(false);
	static set active(active) {
		this.active$.next(active);
	}
	static get active() {
		return this.active$.getValue();
	}

	static menu$_ = new BehaviorSubject([]);

	static menu$() {
		return this.getMenu$().pipe(
			switchMap(menu => {
				this.menu$_.next(menu);
				return this.menu$_;
			}),
		);
	}

	static getMenu$() {
		return HttpService.get$(`/api/menu`).pipe(
			map(data => {
				data.menu.sort((a, b) => {
					return a.order - b.order;
				});
				return data.menu;
			}),
		);
	}

	static updateMenu$(menu) {
		return HttpService.put$(`/api/menu`, menu);
	}

	static createMenuItem$(parentId = null, order = 0) {
		const payload = {
			parentId: parentId,
			viewId: null,
			order: order * 10,
			name: 'Folder ' + (++MENU_UID),
		}
		return HttpService.post$(`/api/menu`, payload);
	}

	static updateMenuItem$(item) {
		return HttpService.put$(`/api/menu/${item.id}`, item);
	}

	static deleteMenuItem$(item) {
		return HttpService.delete$(`/api/menu/${item.id}`);
	}

	static getModelMenu$(views, editor = false) {
		return this.menu$().pipe(
			map(menu => {
				if (menu && menu.length) {
					menu = menu.filter(x => x.viewId == null || x.viewId == 0 || views.find(v => v.id === x.viewId) != null);
					// menu = menu.filter(x => x.viewId == null || views.find(v => v.id === x.viewId) != null);
					// console.log('getModelMenu$', menu);
					return this.mapMenuItems(menu);
				} else {
					// console.log('MenuService.getModelMenu$.Views', views);
					const keys = {};
					views.forEach(item => {
						if (item.type.name !== ViewType.WaitingRoom.name && (!item.hidden || editor)) {
							let group = keys[item.type.name];
							if (!group) {
								group = keys[item.type.name] = [];
							}
							group.push(item);
						}
					});
					const menu = Object.keys(keys).map(typeName => {
						let name = 'Button';
						switch (typeName) {
							case ViewType.WaitingRoom.name:
								name = 'Waiting Room';
								break;
							case ViewType.Panorama.name:
								name = 'Experience';
								break;
							case ViewType.PanoramaGrid.name:
								name = 'Virtual Tour';
								break;
							case ViewType.Room3d.name:
								name = 'Stanze 3D';
								break;
							case ViewType.Model.name:
								name = 'Modelli 3D';
								break;
							case ViewType.Media.name:
								name = 'Media';
								break;
						}
						return { name, type: { name: 'menu-group' }, items: views.filter(x => x.type.name === typeName && (!x.hidden || editor)) };
					});
					return menu;
				}
			})
		);
	}

	static mapMenuItem(item, items) {
		if (item.viewId) {
			return { id: item.viewId, name: item.name, type: { name: 'panorama' } };
		} else {
			return { name: item.name, type: { name: 'menu-group' }, items: this.mapMenuItems(items, item.id) };
		}
	}

	static mapMenuItems(items, parentId = null) {
		return items.filter(item => {
			// console.log('MenuService.mapMenuItems', item);
			return (item.parentId || null) === parentId;
		}).map(item => this.mapMenuItem(item, items)).filter(x => x.id != null || x.items.length > 0);
	}
}
