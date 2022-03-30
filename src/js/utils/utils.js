
export class Utils {

	static merge(target, source) {
		// override null values
		if (source === null) {
			return source;
		}
		// assign new values
		if (!target) {
			if (source && typeof source === 'object') {
				return Object.assign({}, source);
			} else {
				return source;
			}
		}
		// merge objects
		if (source && typeof source === 'object') {
			Object.keys(source).forEach(key => {
				const value = source[key];
				if (typeof value === 'object' && !Array.isArray(value)) {
					target[key] = this.merge(target[key], value);
				} else {
					target[key] = value;
				}
			});
		}
		return target;
	}

}
