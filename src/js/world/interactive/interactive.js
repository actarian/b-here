import DebugService from '../debug.service';

const defaultEvent = {};

export default class Interactive {

	/*
	static hittest(raycaster, down = false, event = defaultEvent) {
		const debugService = DebugService.getService();
		if (Interactive.down !== down) {
			Interactive.down = down;
			Interactive.lock = false;
		}
		const items = Interactive.items.filter(x => !x.freezed);
		const intersections = raycaster.intersectObjects(items);
		let key, hit;
		const hash = {};
		intersections.forEach((intersection, i) => {
			const object = intersection.object;
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
		items.forEach(x => {
			x.intersection = hash[x.uuid];
			x.over = (x === Interactive.lastIntersectedObject) || (!x.depthTest && x.intersection && (!Interactive.lastIntersectedObject || Interactive.lastIntersectedObject.depthTest));
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
	*/

}

Interactive.items = [];
Interactive.hittest = interactiveHittest.bind(Interactive);
Interactive.dispose = interactiveDispose.bind(Interactive);

export function interactiveHittest(raycaster, down = false, event = defaultEvent) {
	const debugService = DebugService.getService();
	if (this.down !== down) {
		this.down = down;
		this.lock = false;
	}
	const items = this.items.filter(x => !x.freezed);
	const intersections = raycaster.intersectObjects(items);
	let key, hit;
	const hash = {};
	intersections.forEach((intersection, i) => {
		const object = intersection.object;
		key = object.uuid;
		if (i === 0) {
			if (this.lastIntersectedObject !== object) {
				this.lastIntersectedObject = object;
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
		this.lastIntersectedObject = null;
	}
	items.forEach(x => {
		x.intersection = hash[x.uuid];
		x.over = (x === this.lastIntersectedObject) || (!x.depthTest && x.intersection && (!this.lastIntersectedObject || this.lastIntersectedObject.depthTest));
		x.down = down && x.over && !this.lock;
		if (x.down) {
			this.lock = true;
		}
	});

	return hit;
}

export function interactiveDispose(object) {
	if (object) {
		const index = this.items.indexOf(object);
		if (index !== -1) {
			this.items.splice(index, 1);
		}
	}
}
