import EmittableSprite from './emittable.sprite';
import Interactive from './interactive';

// const defaultEvent = {};

export default class InteractiveSprite extends EmittableSprite {

	/*
	static hittest(raycaster, down = false, event = defaultEvent) {
		const debugService = DebugService.getService();
		if (InteractiveSprite.down !== down) {
			InteractiveSprite.down = down;
			InteractiveSprite.lock = false;
		}
		// !!! da rivedere per consentire eventi multipli (nav-items)
		const items = InteractiveSprite.items.filter(x => !x.freezed);
		const intersections = raycaster.intersectObjects(items);
		let key, hit;
		const hash = {};
		// let has = false;
		intersections.forEach((intersection, i) => {
			// console.log(intersection);
			const object = intersection.object;
			// console.log('InteractiveSprite.hittest', i, object.name);
			// has = has || object.name.indexOf('nav') !== -1;
			key = object.uuid;
			if (i === 0) {
				if (InteractiveSprite.lastIntersectedObject !== object) {
					InteractiveSprite.lastIntersectedObject = object;
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
			InteractiveSprite.lastIntersectedObject = null;
		}
		// console.log(has);
		items.forEach(x => {
			x.intersection = hash[x.uuid];
			x.over = (x === InteractiveSprite.lastIntersectedObject) || (!x.depthTest && x.intersection);
			x.down = down && x.over && !InteractiveSprite.lock;
			if (x.down) {
				InteractiveSprite.lock = true;
			}
		});
		return hit;
	}

	static dispose(object) {
		if (object) {
			const index = InteractiveSprite.items.indexOf(object);
			if (index !== -1) {
				InteractiveSprite.items.splice(index, 1);
			}
		}
	}
	*/

	constructor(material) {
		super(material);
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

/*
InteractiveSprite.items = [];
InteractiveSprite.hittest = interactiveHittest.bind(InteractiveSprite);
InteractiveSprite.dispose = interactiveDispose.bind(InteractiveSprite);
*/
