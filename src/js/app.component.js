import { Component, getContext } from 'rxcomp';
import AccessCodeComponent from './access/access-code.component';
import AccessComponent from './access/access.component';
import AgoraComponent from './agora/agora.component';
import EditorComponent from './editor/editor.component';
import { SVG_CHUNK } from './svg/svg.chunks';
import TryInARComponent from './try-in-ar/try-in-ar.component';

export default class AppComponent extends Component {

	onInit() {
		this.routes = [
			{ name: 'index', path: '/', forwardTo: 'it' },
			{ name: 'it', path: '/it', defaultParams: { mode: 'access' }, factory: AccessComponent },
			{ name: 'it.meeting', path: '/tour-guidato?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { mode: 'guidedTour' }, factory: AgoraComponent },
			{ name: 'it.access', path: '/accesso', defaultParams: { mode: 'access' }, factory: AccessComponent },
			{ name: 'it.accessCode', path: '/codice-di-accesso', defaultParams: { mode: 'accessCode' }, factory: AccessCodeComponent },
			{ name: 'it.guidedTour', path: '/tour-guidato', defaultParams: { mode: 'guidedTour' }, factory: AgoraComponent },
			{ name: 'it.selfServiceTour', path: '/tour-self-service', defaultParams: { mode: 'selfServiceTour' }, factory: AgoraComponent },
			{ name: 'it.embed', path: '/embed', defaultParams: { mode: 'embed' }, factory: AgoraComponent },
			{ name: 'it.tryInAr', path: '/try-in-ar', defaultParams: { mode: 'tryInAr' }, factory: TryInARComponent },
			{ name: 'it.editor', path: '/editor', defaultParams: { mode: 'editor' }, factory: EditorComponent },
			{ name: 'en', path: '/en', defaultParams: { mode: 'access' }, factory: AccessComponent },
			// { path: '**', component: AccessComponent },
		];
		const { node } = getContext(this);
		node.classList.remove('hidden');
	}

}

AppComponent.meta = {
	selector: '[app-component]',
	template: /* html */ `
		<!-- svg -->
		${SVG_CHUNK}
		<!-- header -->
		<router-outlet [routes]="routes"></router-outlet>
		<!-- footer -->
		<div class="toast-outlet" toast-outlet></div>
		<div class="modal-outlet" modal-outlet></div>
	`
};
