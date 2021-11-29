import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import { MeetingUrl } from '../meeting/meeting-url';
import StateService from '../state/state.service';

export default class AgoraNameComponent extends Component {
	onInit() {
		const meetingUrl = new MeetingUrl();
		const name = meetingUrl.name;
		this.state = {};
		const form = this.form = new FormGroup({
			name: new FormControl(name, [Validators.PatternValidator(/^\w{2,}\s\w{2,}/), Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraNameComponent.changes$', form.value);
			this.pushChanges();
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AgoraNameComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onNext(event) {
		const name = this.controls.name.value;
		MeetingUrl.replaceWithName(name);
		this.name.next(name);
	}
}

AgoraNameComponent.meta = {
	selector: '[agora-name]',
	outputs: ['name'],
};
