import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environment';
import { HttpService } from '../http/http.service';

export class EmojiService {

	static emoji$() {
		if (EmojiService.items_ != null) {
			return of(EmojiService.items_);
		}
		return HttpService.get$(`${environment.assets}api/emoji/emoji.json`).pipe(
			map(items => {
				// items = items.slice(0, Math.min(80, items.length));
				EmojiService.items_ = items;
				return items;
			}),
		);
	}

}
