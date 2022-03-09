import { Pipe } from 'rxcomp';

export default class RoutePipe extends Pipe {

	static transform(key) {
		switch (key) {
			case 'index':
				return 'it.access';
			default:
				return 'it.' + key;
				break;
		}
		// const url = environment.url;
		// return url[key] || `#${key}`;
	}

}

RoutePipe.meta = {
	name: 'route',
};
