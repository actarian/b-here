import { Pipe } from 'rxcomp';
import { environment } from '../environment';

export class LabelPipe extends Pipe {

	static get labels() {
		return environment.labels;
	}

	static transform(key) {
		switch (key) {
			case '@copy':
				return this.getCopy();
		}
		const labels = LabelPipe.labels;
		let label = labels[key] != null ? labels[key] : key; // `#${key}#`;
		if (typeof label === 'string' && label.indexOf('@copy') !== -1) {
			label = label.replace('@copy', this.getCopy());
		}
		return label;
	}

	static getKeys(...keys) {
		return LabelPipe.transform(keys.map(x => x.replace('-', '_')).join('_'));
	}

	static getCopy() {
		return `©${new Date().getFullYear()}`;
	}
}

LabelPipe.meta = {
	name: 'label',
};
