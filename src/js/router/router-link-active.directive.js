import { Directive, getContext } from 'rxcomp';
import { RouterLinkDirective } from './router-link.directive';
import { RouterService } from './router.service';

export default class RouterLinkActiveDirective extends Directive {

	routerLinkActive;
	keys = [];

	onChanges() {
		// console.log('RouterLinkActive.onChanges');
		const { node } = getContext(this);
		node.classList.remove.apply(node.classList, this.keys);
		let keys = [];
		const active = this.isActive();
		if (active) {
			const object = this.routerLinkActive;
			if (typeof object === 'object') {
				for (let key in object) {
					if (object[key]) {
						keys.push(key);
					}
				}
			} else if (typeof object === 'string') {
				keys = object.split(' ').filter(x => x.length);
			}
		}
		node.classList.add.apply(node.classList, keys);
		this.keys = keys;
		// console.log('RouterLinkActive.onChanges', active, keys);
	}

	isActive() {
		const path = RouterService.getPath(this.host.routerLink);
		const isActive = path.route?.snapshot != null;
		// console.log('RouterLinkActive.isActive', isActive, path.route);
		return isActive;
	}

	static meta = {
		selector: '[routerLinkActive],[[routerLinkActive]]',
		hosts: { host: RouterLinkDirective },
		inputs: ['routerLinkActive'],
	};

}
