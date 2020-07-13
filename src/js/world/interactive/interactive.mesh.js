/* jshint esversion: 6 */
/* global window, document */

import DebugService from '../debug.service';
import EmittableMesh from './emittable.mesh';
import Interactive from './interactive';

export default class InteractiveMesh extends EmittableMesh {

	static hittest(raycaster, down) {
		const debugService = DebugService.getService();
		if (InteractiveMesh.down !== down) {
			InteractiveMesh.down = down;
			InteractiveMesh.lock = false;
		}
		// !!! da rivedere per consentire eventi multipli (nav-items)
		const items = InteractiveMesh.items.filter(x => !x.freezed);
		const intersections = raycaster.intersectObjects(items);
		let key, hit;
		const hash = {};
		// let has = false;
		intersections.forEach((intersection, i) => {
			const object = intersection.object;
			// console.log('InteractiveMesh.hittest', i, object.name);
			// has = has || object.name.indexOf('nav') !== -1;
			key = object.uuid;
			if (i === 0) {
				if (InteractiveMesh.lastIntersectedObject !== object) {
					InteractiveMesh.lastIntersectedObject = object;
					hit = object;
					debugService.setMessage(hit.name || hit.id);
					// haptic feedback
				} else if (
					Math.abs(object.intersection.point.x - intersection.point.x) > 0.01 ||
					Math.abs(object.intersection.point.y - intersection.point.y) > 0.01
				) {
					object.intersection = intersection;
					object.emit('move', object);
				}
			}
			hash[key] = intersection;
		});
		// console.log(has);
		items.forEach(x => {
			x.intersection = hash[x.uuid];
			x.over = (x === InteractiveMesh.lastIntersectedObject) || (!x.depthTest && x.intersection);
			x.down = down && x.over && !InteractiveMesh.lock;
			if (x.down) {
				InteractiveMesh.lock = true;
			}
		});
		return hit;
	}

	static dispose(object) {
		if (object) {
			const index = InteractiveMesh.items.indexOf(object);
			if (index !== -1) {
				InteractiveMesh.items.splice(index, 1);
			}
		}
	}

	constructor(geometry, material) {
		super(geometry, material);
		this.depthTest = true;
		this.over_ = false;
		this.down_ = false;
		Interactive.items.push(this);
	}

	get over() {
		return this.over_;
	}
	set over(over) {
		if (this.over_ != over) {
			this.over_ = over;
			/*
			if (over) {
				this.emit('hit', this);
			}
			*/
			if (over) {
				this.emit('over', this);
			} else {
				this.emit('out', this);
			}
		}
	}

	get down() {
		return this.down_;
	}
	set down(down) {
		down = down && this.over;
		if (this.down_ != down) {
			this.down_ = down;
			if (down) {
				this.emit('down', this);
			} else {
				this.emit('up', this);
			}
		}
	}

}

InteractiveMesh.items = [];
