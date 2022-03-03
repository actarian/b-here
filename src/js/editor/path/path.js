
export class Path {

	static allowedProps = ['id', 'name', 'items'];

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
		this.items = (this.items || []);
		this.originalItems = this.items.slice();
	}

	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (View.allowedProps.indexOf(key) !== -1) {
				switch (key) {
					default:
						payload[key] = this[key];
				}
			}
		});
		return payload;
	}
}

export function mapPath(map) {
	map = new Path(map);
	return map;
}
