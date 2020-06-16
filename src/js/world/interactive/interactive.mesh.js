/* jshint esversion: 6 */
/* global window, document */

import EmittableMesh from './emittable.mesh';

export default class InteractiveMesh extends EmittableMesh {

	static hittest(raycaster, down) {
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
					// haptic feedback
				} else if (object.intersection.point.x !== intersection.point.x || object.intersection.point.y !== intersection.point.y) {
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
			x.down = down && x.over;
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
		// this.renderOrder = 10;
		InteractiveMesh.items.push(this);
	}

	get over() {
		return this.over_;
	}
	set over(over) {
		if (over) {
			this.emit('hit', this);
		}
		if (this.over_ !== over) {
			this.over_ = over;
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
		if (this.down_ !== down) {
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
