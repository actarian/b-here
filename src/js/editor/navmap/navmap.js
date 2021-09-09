import { mapViewItem } from '../../view/view';

export class Navmap {

	static allowedProps = ['id', 'name', 'asset', 'items'];

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
		this.items = (this.items || []).map(item => mapViewItem(item));
		this.originalItems = this.items.slice();
	}

	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (View.allowedProps.indexOf(key) !== -1) {
				switch (key) {
					case 'items':
						payload[key] = this[key].map(item => mapViewItem(item).payload);
						break;
					default:
						payload[key] = this[key];
				}
			}
		});
		return payload;
	}
}

export function mapNavmap(map) {
	map = new Navmap(map);
	return map;
}
