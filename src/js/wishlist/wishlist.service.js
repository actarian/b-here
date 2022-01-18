import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';

let items$_ = null;

export class WishlistService {

	static get items$() {
		if (!items$_) {
			const items = LocalStorageService.get('wishlist') || [];
			items$_ = new BehaviorSubject(items);
		}
		return items$_;
	}

	static getItems() {
		return this.items$.getValue();
	}

	static indexOf(item) {
		const items = this.getItems();
		return items.reduce((p, c, i) => {
			return (p === -1 && c.viewId === item.viewId && c.itemId === item.itemId) ? i : p;
		}, -1);
	}

	static has(item) {
		return this.indexOf(item) !== -1;
	}

	static add$(item) {
		const items = this.getItems();
		if (!this.has(item)) {
			items.push(item);
			LocalStorageService.set('wishlist', items);
			this.items$.next(items);
		}
		return this.items$;
	}

	static remove$(item) {
		const items = this.getItems();
		const index = this.indexOf(item);
		if (index !== -1) {
			items.splice(index, 1);
			LocalStorageService.set('wishlist', items);
			this.items$.next(items);
		}
		return this.items$;
	}

	static toggle$(item) {
		const items = this.getItems();
		const index = this.indexOf(item);
		if (index !== -1) {
			items.splice(index, 1);
			LocalStorageService.set('wishlist', items);
			this.items$.next(items);
		} else {
			items.push(item);
			LocalStorageService.set('wishlist', items);
			this.items$.next(items);
		}
		return this.items$;
	}

}
