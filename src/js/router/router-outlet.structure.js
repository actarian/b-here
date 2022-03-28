import { getContext, Structure } from 'rxcomp';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
// import View, { EnterTransition, LeaveTransition, OnceTransition } from '../core/view';
// import { transitionOnce, transitionOnced } from '../transition/transition';
import { RouterService } from './router.service';

export class RouterOutletStructure extends Structure {

	// host;
	// outlet;
	// element;
	// instance;
	// route$_ = new ReplaySubject(1);

	getFactory(route) {
		let factory = null;
		const routes = RouterService.routes;
		const originalRoute = routes.find(x => x.name === route.name);
		if (originalRoute) {
			factory = originalRoute.factory;
		}
		// console.log('RouterOutletStructure.getFactory', originalRoute, routes, route);
		return factory;
	}

	onInit() {
		this.route$().pipe(
			switchMap(route => this.factory$(route)),
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('RouterOutletStructure.route$', event);
		});
		/*
		this.route$().pipe(
			switchMap(snapshot => this.factory$(snapshot)),
			takeUntil(this.unsubscribe$)
		).subscribe(() => {
			// console.log(`RouterOutletStructure ActivatedRoutes: ["${RouterService.flatRoutes.filter(x => x.snapshot).map(x => x.snapshot?.extractedUrl).join('", "')}"]`);
		});
		if (this.host) {
			this.route$_.next(this.host.route.childRoute);
		}
		*/
	}

	route$() {
		return RouterService.event$.pipe(
			map(event => {
				const route = event.route;
				this.route = route;
				// console.log('RouterOutletStructure.route', route);
				return route;
			}),
		);
		/*
		const routes = this.routes;
		// console.log('RouterOutletStructure.route$', routes);
		if (routes) {
			return RouterService.useBrowser$(routes).pipe(
				map(event => {
					// console.log('RouterOutletStructure.route$', event);
					return event.route;
				}),
			);
		} else {
			return EMPTY;
		}
		*/
	}

	factory$(route) {
		const factory = this.getFactory(route);
		// console.log('RouterOutletStructure.factory$', route, factory);
		const { module, node } = getContext(this);
		if (true || this.factory_ !== factory) {
			this.factory_ = factory;
			return of(factory).pipe(
				tap(() => {
					if (this.element) {
						this.element.parentNode.removeChild(this.element);
						module.remove(this.element, this);
						this.element = undefined;
						this.instance = undefined;
					}
				}),
				map(() => {
					if (factory && factory.meta.template) {
						let element = document.createElement('div');
						element.innerHTML = factory.meta.template;
						if (element.children.length === 1) {
							element = element.firstElementChild;
						}
						node.appendChild(element);
						const instance = module.makeInstance(element, factory, factory.meta.selector, this, undefined, { route });
						module.compile(element, instance);
						this.instance = instance;
						this.element = element;
						return { element, instance };
					}
				})
			);
		} else {
			return EMPTY;
		}
	}

	onChanges() {
		/*
		if (this.host) {
			this.route$_.next(this.host.route.childRoute);
		}
		*/
	}

	/*
	route$() {
		const source = this.host ? this.route$_ : RouterService.route$;
		return source.pipe(
			filter((snapshot) => {
				this.route_ = snapshot; // !!!
				if (this.snapshot_ && snapshot && this.snapshot_.component === snapshot.component) {
					this.snapshot_.next(snapshot);
					return false;
				} else {
					this.snapshot_ = snapshot;
					return true;
				}
			}),
		);
	}
	*/

	/*
	factory$(snapshot) {
		const { module, node } = getContext(this);
		const factory = snapshot.component;
		if (this.factory_ !== factory) {
			this.factory_ = factory;
			return this.onLeave$_(snapshot, this.element, this.instance).pipe(
				tap(() => {
					if (this.element) {
						this.element.parentNode.removeChild(this.element);
						module.remove(this.element, this);
						this.element = undefined;
						this.instance = undefined;
					}
				}),
				switchMap(() => {
					if (snapshot && factory && factory.meta.template) {
						let element = document.createElement('div');
						element.innerHTML = factory.meta.template;
						if (element.children.length === 1) {
							element = element.firstElementChild;
						}
						node.appendChild(element);
						const instance = module.makeInstance(element, factory, factory.meta.selector, this, undefined, { route: snapshot });
						module.compile(element, instance);
						this.instance = instance;
						this.element = element;
						snapshot.element = element;
						return this.onOnce$_(snapshot, element, instance).pipe(
							switchMap(() => {
								return this.onEnter$_(snapshot, element, instance);
							})
						);
					} else {
						return of(void 0);
					}
				})
			);
		} else {
			return of(void 0);
		}
	}
	*/

	/*
	onOnce$_(snapshot, element, instance) {
		if (!transitionOnced() && instance instanceof View && element) {
			transitionOnce();
			const factory = instance.constructor;
			const transition = factory.transitions.find((x) => x instanceof OnceTransition && x.matcher(snapshot.previousRoute?.path));
			return transition ? asObservable([element, snapshot.previousRoute], transition.callback.bind(instance)) : of(void 0);
		} else {
			return of(void 0);
		}
	}

	onEnter$_(snapshot, element, instance) {
		if (instance instanceof View && element) {
			const factory = instance.constructor;
			const transition = factory.transitions.find((x) => x instanceof EnterTransition && x.matcher(snapshot.previousRoute?.path));
			return transition ? asObservable([element, snapshot.previousRoute], transition.callback.bind(instance)) : of(void 0);
		} else {
			return of(void 0);
		}
	}

	onLeave$_(snapshot, element, instance) {
		if (instance instanceof View && element) {
			const factory = instance.constructor;
			const transition = factory.transitions.find((x) => x instanceof LeaveTransition && x.matcher(snapshot?.path));
			return transition ? asObservable([element, snapshot], transition.callback.bind(instance)) : of(void 0);
		} else {
			return of(void 0);
		}
	}
	*/

	static meta = {
		selector: 'router-outlet,[router-outlet]',
		hosts: { host: RouterOutletStructure },
	};
}
