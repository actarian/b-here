import { Pipe } from 'rxcomp';
import { LanguageService } from '../language/language.service';

export class RoutePipe extends Pipe {

	static transform(key) {
		return key.replace(':lang', LanguageService.lang);
	}

}

RoutePipe.meta = {
	name: 'route',
};
