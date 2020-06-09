import { Component } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import LocationService from '../location/location.service';
import AgoraService from './agora.service';

export default class AgoraLinkComponent extends Component {

	onInit() {
		this.state = {};
		const form = this.form = new FormGroup({
			link: new FormControl(null, [Validators.PatternValidator(/^\d{9}-\d{13}$/), Validators.RequiredValidator()]),
			// link: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraLinkComponent.changes$', form.value);
			this.pushChanges();
		});
		const agora = this.agora = AgoraService.getSingleton();
		agora.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AgoraLinkComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
	}

	onGenerateMeetingId($event) {
		// const timestamp = (performance.now() * 10000000000000).toString();
		const timestamp = new Date().valueOf().toString();
		this.form.patch({
			link: `${this.padded(this.state.publisherId, 9)}-${timestamp}`,
		});
		/*
		this.controls.link.value = `${this.padded(this.state.publisherId, 9)}-${timestamp}`;
		setTimeout(() => {
			this.pushChanges();
		}, 1);
		*/
	}

	onCopyToClipBoard(event) {
		const input = document.createElement('input');
		input.style.position = 'absolute';
		input.style.top = '1000vh';
		// input.style.visibility = 'hidden';
		document.querySelector('body').appendChild(input);
		input.value = this.generateLink();
		input.focus();
		input.select();
		input.setSelectionRange(0, 99999);
		document.execCommand("copy");
		input.parentNode.removeChild(input);
		alert(`link copiato!\n ${input.value}`);
	}

	onNext(event) {
		if ('history' in window) {
			const role = LocationService.get('role') || null;
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', this.generateLink(role));
		}
		this.link.next(this.controls.link.value);
	}

	generateLink(role) {
		return `${window.location.origin}${window.location.pathname}?link=${this.controls.link.value}` + (role ? `&role=${role}` : '');
	}

	padded(num, size) {
		const s = '000000000' + num;
		return s.substr(s.length - size);
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	// onDestroy() {}

}

AgoraLinkComponent.meta = {
	selector: '[agora-link]',
	outputs: ['link'],
};
