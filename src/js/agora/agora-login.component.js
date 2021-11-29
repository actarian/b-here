import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import LabelPipe from '../label/label.pipe';
import { MeetingUrl } from '../meeting/meeting-url';
import StateService from '../state/state.service';
import { UserService } from '../user/user.service';

export default class AgoraLoginComponent extends Component {

	onInit() {
		const form = this.form = new FormGroup({
			username: new FormControl(null, Validators.RequiredValidator()),
			password: new FormControl(null, Validators.RequiredValidator()),
			checkRequest: window.antiforgery || '',
			checkField: '',
		});

		const controls = this.controls = form.controls;

		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			this.pushChanges();
		});

		this.error = null;
	}

	test() {
		this.form.patch({
			username: 'publisher',
			password: 'publisher',
			checkRequest: window.antiforgery || '',
			checkField: ''
		});
	}

	reset() {
		this.form.reset();
	}

	onSubmit() {
		if (this.form.valid) {
			const payload = this.form.value;
			this.form.submitted = true;
			this.error = null;
			this.pushChanges();
			UserService.login$(payload).pipe(
				first(),
			).subscribe(user => {
				if (StateService.state.role === user.type) {
					// this.login.next(user);
					this.onNext(user);
					this.form.reset();
				} else {
					this.error = { friendlyMessage: LabelPipe.transform('error_credentials') };
					this.pushChanges();
				}
			}, error => {
				console.log('AccessComponent.error', error);
				this.error = error;
				this.pushChanges();
			});
		} else {
			this.form.touched = true;
		}
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onNext(user) {
		MeetingUrl.replaceWithUser(user);
		this.login.next(user);
	}
}

AgoraLoginComponent.meta = {
	selector: '[agora-login]',
	outputs: ['login'],
};
