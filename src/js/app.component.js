import { Component, getContext } from 'rxcomp';
import { DEBUG, EDITOR } from './environment';

export default class AppComponent extends Component {
	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.debug = DEBUG;
		this.editor = EDITOR;
	}
}

AppComponent.meta = {
	selector: '[app-component]',
};
