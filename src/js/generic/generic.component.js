import { Component } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { CHUNK_COPYRIGHT, CHUNK_CREDITS, CHUNK_LANGUAGE, CHUNK_LOGO } from '../agora/agora.component.chunks';
import { RouterOutletStructure } from '../router/router-outlet.structure';
import { GenericService } from './generic.service';

export class GenericComponent extends Component {

	onInit() {
		this.route = this.host ? this.host.route : null;
		this.state = { status: 'generic' };
		this.page = null;
		GenericService.currentLanguagePage$(this.route.params.mode).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(page => {
			this.page = page;
			this.pushChanges();
		});
	}

}

GenericComponent.meta = {
	selector: '[generic-component]',
	hosts: { host: RouterOutletStructure },
	template: /*html*/ `
		<div class="page page--generic">
			<!-- generic -->
			<div class="ui ui--generic" *if="page">
				<div class="group--generic">
					<div class="group--generic__content stagger--childs">
						<h1 class="title" [innerHTML]="page.title"></h1>
						<div class="description" [innerHTML]="page.description"></div>
					</div>
				</div>
			</div>
			<header>
				${CHUNK_LOGO}
				${CHUNK_LANGUAGE}
			</header>
			<footer>
				<span class="group--colophon" *if="state.status != 'connected'">
					${CHUNK_CREDITS}
					${CHUNK_COPYRIGHT}
				</span>
			</footer>
		</div>
	`
};
