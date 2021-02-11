import { Component } from 'rxcomp';

export default class AgoraCheckComponent extends Component {}

AgoraCheckComponent.meta = {
	selector: '[agora-check]',
	inputs: ['value'],
	template: /* html */ `
		<svg *if="value == null" class="checkmark idle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
		</svg>
		<svg *if="value === true" class="checkmark success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
			<path class="checkmark__icon" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke-linecap="round"/>
		</svg>
		<svg *if="value === false" class="checkmark error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
			<path class="checkmark__icon" stroke-linecap="round" fill="none" d="M16 16 36 36 M36 16 16 36"/>
		</svg>
	`
};
