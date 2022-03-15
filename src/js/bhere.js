import { Browser } from 'rxcomp';
import { AppModule } from './app.module';
import { environment } from './environment';

export default class BHere {

	constructor(target, options) {
		if (typeof window === 'object') {
			if (options) {
				environment.merge(options);
			}
			this.bootstrap(target);
			// console.log('BHere', target, options);
		}
		this.environment = environment;
	}

	bootstrap(target) {
		if (typeof target === 'string') {
			target = document.querySelector(target);
		}
		if (!target) {
			target = document.createElement('div');
			target.setAttribute('b-here', '');
			document.body.appendChild(target);
		}
		target.innerHTML = /* html */`<div class="b-here hidden" b-here-component></div>`;
		this.target = target;
		Browser.bootstrap(AppModule);
	}
}

const USE_CHECK = false;
if (USE_CHECK) {

	function checkBHere() {
		const target = document.querySelector('[b-here]');
		if (target) {
			const bhere = new BHere(target);
		}
	}

	if (typeof window === 'object') {
		checkBHere();
	}

}
