import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';

export default class AgoraLinkComponent extends Component {

	onInit() {
		this.editorLink = environment.url.editor;
		this.state = {};
		const form = this.form = new FormGroup({
			link: new FormControl(null, [Validators.PatternValidator(/^\d{9}-\d{4}-\d{13}$/), Validators.RequiredValidator()]),
			linkStreamer: null,
			linkViewer: null,
			// link: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraLinkComponent.changes$', form.value);
			this.pushChanges();
		});
		StateService.state$.pipe(
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
			link: this.getRoleMeetingId(timestamp, RoleType.Publisher),
			linkStreamer: this.getRoleMeetingId(timestamp, RoleType.Streamer),
			linkViewer: this.getRoleMeetingId(timestamp, RoleType.Viewer),
		});
	}

	replaceRoleMeetingId(meetingId, role) {
		const components = meetingId.split('-');
		components[1] = this.padded(this.getRoleIndex(role), 4);
		return components.join('-');
	}

	getRoleMeetingId(timestamp, role) {
		return `${this.padded(this.state.user.id, 9)}-${this.padded(this.getRoleIndex(role), 4)}-${timestamp}`;
	}

	getRoleIndex(role) {
		return Object.keys(RoleType).reduce((p, c, i) => {
			return RoleType[c] === role ? i : p;
		}, -1);
	}

	onCopyToClipBoard(meetingId) {
		const input = document.createElement('input');
		input.style.position = 'absolute';
		input.style.top = '1000vh';
		// input.style.visibility = 'hidden';
		document.querySelector('body').appendChild(input);
		input.value = this.getUrl(meetingId, true);
		input.focus();
		input.select();
		input.setSelectionRange(0, 99999);
		document.execCommand('copy');
		input.parentNode.removeChild(input);
		alert(`link copiato!\n ${input.value}`);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onNext(event) {
		let meetingId = this.controls.link.value;
		/*
		if (this.state.role === RoleType.Publisher) {
			meetingId = this.replaceRoleMeetingId(meetingId, RoleType.Publisher);
		}
		*/
		this.replaceUrl(meetingId);
		this.link.next(meetingId);
	}

	getUrl(meetingId, shareable = false) {
		const role = LocationService.get('role') || null;
		const name = LocationService.get('name') || null;
		const url = `${window.location.origin}${window.location.pathname}?link=${meetingId}` + (name ? `&name=${name}` : '') + ((role && !shareable) ? `&role=${role}` : '');
		return url;
	}

	replaceUrl(meetingId) {
		if ('history' in window) {
			const url = this.getUrl(meetingId);
			// console.log('AgoraLinkComponent.url', url);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
	}

	padded(num, size) {
		const s = '000000000' + num;
		return s.substr(s.length - size);
	}
}

AgoraLinkComponent.meta = {
	selector: '[agora-link]',
	outputs: ['link'],
};
