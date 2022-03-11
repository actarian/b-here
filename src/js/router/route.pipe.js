import { Pipe } from 'rxcomp';
import { LanguageService } from '../language/language.service';

export default class RoutePipe extends Pipe {

	static transform(key) {
		return key.replace(':lang', LanguageService.selectedLanguage);
	}

}

RoutePipe.meta = {
	name: 'route',
};
