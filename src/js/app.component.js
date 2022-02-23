import { Component, getContext } from 'rxcomp';

export default class AppComponent extends Component {
	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
	}
}

AppComponent.meta = {
	selector: '[app-component]',
	template: /* html */ `
		<!-- header -->
		<router-outlet></router-outlet>
		<!-- footer -->
		<div class="toast-outlet" toast-outlet></div>
		<div class="modal-outlet" modal-outlet></div>
	`
};
