import { Component, getContext } from 'rxcomp';
import { DEBUG } from './environment';

export default class AppComponent extends Component {
	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.debug = DEBUG;
	}
}

AppComponent.meta = {
	selector: '[app-component]',
};
