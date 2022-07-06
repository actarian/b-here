import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { AppRoutesInit } from './app.routes';
import { AssetGroupTypeInit } from './asset/asset';
import { environment } from './environment';
import { LanguageService } from './language/language.service';
import { RouterService } from './router/router.service';
import { SVG_CHUNK } from './svg/svg.chunks';

export default class AppComponent extends Component {

	onInit() {
		const routes = AppRoutesInit();
		RouterService.useBrowser(routes);

		AssetGroupTypeInit();

		RouterService.event$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			const route = event.route;
			if (route && route.params.mode === 'embed') {
				environment.flags.like = false;
			}
			LanguageService.setRoute(route, routes);
		});

		LanguageService.lang$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(_ => {
			this.pushChanges();
		});

		const { node } = getContext(this);
		node.classList.remove('hidden');
	}

}

AppComponent.meta = {
	selector: '[b-here-component]',
	template: /* html */ `
		<!-- svg -->
		${SVG_CHUNK}
		<!-- header -->
		<router-outlet></router-outlet>
		<!-- footer -->
		<div class="toast-outlet" toast-outlet></div>
		<div class="modal-outlet" modal-outlet></div>
	`
};
