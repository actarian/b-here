/* jshint esversion: 6 */
/* global window, document */

import DebugService from '../debug.service';

export default class Interactive {

	static hittest(raycaster, down) {
		const debugService = DebugService.getService();
		if (Interactive.down !== down) {
			Interactive.down = down;
			Interactive.lock = false;
		}
		// !!! da rivedere per consentire eventi multipli (nav-items)
		const items = Interactive.items.filter(x => !x.freezed);
		const intersections = raycaster.intersectObjects(items);
		let key, hit;
		const hash = {};
		// let has = false;
		intersections.forEach((intersection, i) => {
			const object = intersection.object;
			// console.log('Interactive.hittest', i, object.name);
			// has = has || object.name.indexOf('nav') !== -1;
			key = object.uuid;
			if (i === 0) {
				if (Interactive.lastIntersectedObject !== object) {
					Interactive.lastIntersectedObject = object;
					hit = object;
					debugService.setMessage(hit.name || hit.id);
					// haptic feedback
				} else if (
					object.intersection && (
						Math.abs(object.intersection.point.x - intersection.point.x) > 0.01 ||
						Math.abs(object.intersection.point.y - intersection.point.y) > 0.01
					)
				) {
					object.intersection = intersection;
					object.emit('move', object);
				}
			}
			hash[key] = intersection;
		});
		if (intersections.length === 0) {
			Interactive.lastIntersectedObject = null;
		}
		// console.log(has);
		items.forEach(x => {
			x.intersection = hash[x.uuid];
			x.over = (x === Interactive.lastIntersectedObject) || (!x.depthTest && x.intersection);
			x.down = down && x.over && !Interactive.lock;
			if (x.down) {
				Interactive.lock = true;
			}
		});
		return hit;
	}

	static dispose(object) {
		if (object) {
			const index = Interactive.items.indexOf(object);
			if (index !== -1) {
				Interactive.items.splice(index, 1);
			}
		}
	}

}

Interactive.items = [];
