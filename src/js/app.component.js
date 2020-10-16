import { Component, getContext } from 'rxcomp';
import { environment } from './environment';

export default class AppComponent extends Component {
	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		environment.STATIC = window.STATIC;
	}
}

AppComponent.meta = {
	selector: '[app-component]',
};
