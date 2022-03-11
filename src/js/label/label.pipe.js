import { Pipe } from 'rxcomp';
import { environment } from '../environment';

export default class LabelPipe extends Pipe {

	static get labels() {
		return environment.labels;
	}

	static transform(key) {
		const labels = LabelPipe.labels;
		return labels[key] || key; // `#${key}#`;
	}

	static getKeys(...keys) {
		return LabelPipe.transform(keys.map(x => x.replace('-', '_')).join('_'));
	}
}

LabelPipe.meta = {
	name: 'label',
};
