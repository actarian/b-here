import { switchMap } from 'rxjs/operators';
import { environment } from '../environment';
import { HttpService } from '../http/http.service';
import { LanguageService } from '../language/language.service';

export class GenericService {

	static currentLanguagePage$(mode) {
		return LanguageService.lang$.pipe(
			switchMap(lang => {
				return this.page$(lang, mode);
			}),
		);
	}

	static page$(lang, mode) {
		const url = (environment.flags.production ? `/api/${lang}/${mode}/` : `./api/${lang}/${mode}.json`);
		return HttpService.get$(url);
	}

}
