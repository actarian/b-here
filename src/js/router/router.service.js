import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { EMPTY, from } from 'rxjs';
import { startWith } from 'rxjs/operators';

export class RouterService {

	static routes = [];

	static router_ = null;
	static get router() {
		return this.router_;
	}

	static get route() {
		let route = null;
		const router = this.router_;
		if (router) {
			route = router.getState();
			// console.log('RouterService.get.route', route);
		}
		return route;
	}

	/*
	static event$_ = new Subject();
	static event$() {
		const router = this.router_;
		if (router) {
			return from(router).pipe(
				startWith({ route: router.getState(), previousRoute: null }),
				tap(event => {
					// console.log('RouterService.event$', event);
					this.event$_.next(event);
				}),
			);
		} else {
			return EMPTY;
		}
	}
	*/

	static useBrowser(routes) {
		if (!(Array.isArray(routes) && routes.length)) {
			this.event$ = EMPTY;
			return;
		}
		this.routes = routes;
		const router = createRouter(routes, {
			allowNotFound: false,
			autoCleanUp: true,
			defaultRoute: 'index',
			defaultParams: {},
			queryParams: {
				arrayFormat: 'default',
				nullFormat: 'default',
				booleanFormat: 'default'
			},
			queryParamsMode: 'default',
			trailingSlashMode: 'default',
			strictTrailingSlash: false,
			caseSensitive: false,
			urlParamsEncoding: 'default'
		});
		this.router_ = router;
		router.usePlugin(browserPlugin({
			useHash: false
		}));
		router.start();
		this.event$ = from(router).pipe(
			startWith({ route: router.getState(), previousRoute: null }),
			// tap(event => { console.log('RouterService.event$', event); }),
		);
	}

	static useBrowser$(routes) {
		this.useBrowser(routes);
		return this.event$;
	}

	static setRouterLink(routerLink = 'it.access', routeParams = null, options = { reload: true }) {
		const router = this.router_;
		if (router) {
			// router.matchUrl(routerLink);
			try {
				router.navigate(routerLink, routeParams, options);
			} catch (error) {
				console.log('RouterService.setRouterLink.error', error);
			}
		}
		// console.log('RouterService.setRouterLink', router, routerLink, routeParams, options);
	}

	static replaceHistoryState(name, params) {
		const router = this.router_;
		if (router) {
			// router.matchUrl(routerLink);
			try {
				router.replaceHistoryState(name, params);
			} catch (error) {
				console.log('RouterService.replaceHistoryState.error', error);
			}
		}
	}

	static setCurrentParams(params) {
		const router = this.router_;
		if (router) {
			try {
				const route = this.route;
				if (route) {
					router.replaceHistoryState(route.name, params);
				}
			} catch (error) {
				console.log('RouterService.setCurrentParams.error', error);
			}
		}
	}

	static buildPath(route, params = null) {
		let path = null;
		const router = this.router_;
		if (router) {
			try {
				path = router.buildPath(route, params);
			} catch (error) {
				console.log('RouterService.buildPath.error', error);
			}
		}
		// console.log('RouterService.buildPath', path, route, params);
		// router.buildUrl(routeName, routeParams)
		return path;
	}

	static buildUrl(routeName, routeParams = null) {
		let url = null;
		const router = this.router_;
		if (router) {
			try {
				url = router.buildUrl(routeName, routeParams);
			} catch (error) {
				console.log('RouterService.buildUrl.error', error);
			}
		}
		// console.log('RouterService.buildUrl', url, routeName, routeParams);
		return url;
	}

	static isActive(name, params, strictEquality = false, ignoreQueryParams = true) {
		let active = false;
		const router = this.router_;
		if (router) {
			try {
				active = router.isActive(name, params, strictEquality, ignoreQueryParams);
			} catch (error) {
				console.log('RouterService.isActive.error', error);
			}
		}
		// console.log('RouterService.isActive', active, name, params, strictEquality, ignoreQueryParams);
		return active;
	}

}
