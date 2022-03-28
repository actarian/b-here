import { Directive, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// import { RouteSegment } from '../route/route-segment';
import { RouterService } from './router.service';

export class RouterLinkDirective extends Directive {

	path;
	segments;
	routerLink_;

	get routerLink() {
		return this.routerLink_;
	}

	set routerLink(routerLink) {
		this.routerLink_ = Array.isArray(routerLink) ? routerLink : [routerLink];
		// this.segments = this.getSegments(this.routerLink_);
	}

	onInit() {
		// const { node, module } = getContext(this);
		// console.log('RouterLinkDirective.onInit', this.routerLink, node, module);
		this.routerLink$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe();
	}

	onChanges() {
		const { node } = getContext(this);
		// const routerLink = Array.isArray(this.routerLink) ? this.routerLink : [this.routerLink];
		const routerLink = this.routerLink;
		if (routerLink.length) {
			const routeUrl = RouterService.buildUrl(...routerLink);
			// RouterService.isActive(name, params, [strictEquality], [ignoreQueryParams])
			// console.log('RouterLinkDirective.routeUrl', routeUrl);
			node.setAttribute('href', routeUrl);
		} else {
			node.setAttribute('href', '');
		}
	}

	routerLink$() {
		const { node } = getContext(this);
		return fromEvent(node, 'click').pipe(
			map((event) => {
				// console.log('RouterLinkDirective.routerLink$', this.routerLink);
				RouterService.setRouterLink(...this.routerLink);
				event.preventDefault();
				return false;
			})
		);
	}

	getSegments(routerLink) {
		// console.log('RouterLinkDirective.getSegments', routerLink);
		const segments = [];
		routerLink.forEach(item => {
			if (typeof item === 'string') {
				const regExp = /([^:]+)|\:([^\/]+)/g;
				const matches = item.matchAll(regExp);
				const components = [];
				for (let match of matches) {
					const g1 = match[1];
					const g2 = match[2];
					if (g1) {
						components.push(g1);
					} else if (g2) {
						const param = {};
						param[g2] = null;
						components.push(param);
					}
				}
			} else {
				segments.push(new RouteSegment('', {}));
			}
		});
		return segments;
	}

	static meta = {
		selector: '[routerLink]',
		inputs: ['routerLink'],
	};
}

/*
get urlTree(): UrlTree {
	return RouterService.createUrlTree(this.routerLink, {
		relativeTo: this.route,
		queryParams: this.queryParams,
		fragment: this.fragment,
		preserveQueryParams: this.preserve,
		queryParamsHandling: this.queryParamsHandling,
		preserveFragment: this.preserveFragment,
	});
}
*/
