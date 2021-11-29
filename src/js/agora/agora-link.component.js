import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import { MeetingId, MEETING_ID_VALIDATOR } from '../meeting/meeting-id';
import { MeetingUrl } from '../meeting/meeting-url';
import StateService from '../state/state.service';

export default class AgoraLinkComponent extends Component {

	onInit() {
		this.state = {};
		const form = this.form = new FormGroup({
			id: new FormControl(null, [Validators.PatternValidator(MEETING_ID_VALIDATOR), Validators.RequiredValidator()]),
			idAttendee: null,
			idStreamer: null,
			idViewer: null,
			idSmartDevice: null,
			// id: new FormControl(null),
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
		const meetingId = new MeetingId();
		const meetingIdRoles = meetingId.toRoles();
		this.form.patch(meetingIdRoles);
	}

	onInputDidChange($event) {
		// console.log('onInputDidChange', this.form.get('id').value, this.form.get('id').valid);
		if (this.state.role !== 'publisher') {
			return;
		}
		setTimeout(() => {
			if (this.form.get('id').valid) {
				const value = this.form.get('id').value;
				const meetingId = new MeetingId(value);
				const meetingIdRoles = meetingId.toRoles();
				this.form.patch(meetingIdRoles);
			} else {
				this.form.get('idAttendee').reset();
				this.form.get('idStreamer').reset();
				this.form.get('idViewer').reset();
				this.form.get('idSmartDevice').reset();
			}
		}, 1);
	}

	onCopyToClipBoard(id, asAccessCode = false) {
		const meetingUrl = new MeetingUrl({ link: id });
		meetingUrl.copyToClipBoard(asAccessCode);
	}

	onNext(event) {
		let meetingId = this.controls.id.value;
		MeetingUrl.replaceWithLink(meetingId);
		this.link.next(meetingId);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}
}

AgoraLinkComponent.meta = {
	selector: '[agora-link]',
	outputs: ['link'],
};
