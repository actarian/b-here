import { switchMap } from 'rxjs/operators';
import { environment } from '../environment';
import { HttpService } from '../http/http.service';
import { LanguageService } from '../language/language.service';

export class GenericService {

	static currentLanguagePage$(key) {
		return LanguageService.lang$.pipe(
			switchMap(lang => {
				return this.page$(lang, key);
			}),
		);
	}

	static page$(lang, key) {
		const url = (environment.flags.production ? `/api/${lang}/pages/${key}/` : `./api/${lang}/pages/${key}.json`);
		return HttpService.get$(url);
	}

}
