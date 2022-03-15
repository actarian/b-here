import { Pipe } from 'rxcomp';
import { environment } from '../environment';

export default class SlugPipe extends Pipe {

	static transform(key) {
		const slug = environment.slug;
		return slug[key] || `#${key}`;
	}

}

SlugPipe.meta = {
	name: 'slug',
};
