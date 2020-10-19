import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import { environment } from '../environment';
import { UserService } from '../user/user.service';

export default class AccessComponent extends Component {

	onInit() {
		this.state = {
			status: 'access',
		};
		/*
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			console.log('AccessComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
		*/
	}

	onSelfServiceTourRequest() {
		this.initRequestForm();
		this.state.status = 'self-service-tour';
		this.pushChanges();
	}

	onGuidedTourRequest() {
		this.initRequestForm();
		this.state.status = 'guided-tour';
		this.pushChanges();
	}

	onGuidedTourAccess() {
		UserService.logout$().pipe(
			first(),
		).subscribe(() => {
			window.location.href = environment.url.guidedTour;
		});
	}

	onLogin() {
		this.initLoginForm();
		this.state.status = 'login';
		this.pushChanges();
	}

	initRequestForm() {
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}

		const form = this.form = new FormGroup({
			firstName: new FormControl(null, Validators.RequiredValidator()),
			lastName: new FormControl(null, Validators.RequiredValidator()),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			role: new FormControl(null, Validators.RequiredValidator()),
			privacy: new FormControl(null, Validators.RequiredTrueValidator()),
			checkRequest: window.antiforgery || '',
			checkField: '',
		});

		const data = this.data = window.data || {
			roles: [
				{ id: 1, name: 'Show room' },
				{ id: 2, name: 'Architetto' },
				{ id: 3, name: 'Interior designer' },
				{ id: 4, name: 'Privato' },
				{ id: 5, name: 'Altro' }
			],
		};

		const controls = this.controls = form.controls;
		const options = data.roles.slice();
		options.unshift({ id: null, name: 'Seleziona' });
		controls.role.options = options;

		this.formSubscription = form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			this.pushChanges();
		});

		this.error = null;
	}

	initLoginForm() {
		if (this.formSubscription) {
			this.formSubscription.unsubscribe();
		}

		const form = this.form = new FormGroup({
			username: new FormControl(null, Validators.RequiredValidator()),
			password: new FormControl(null, Validators.RequiredValidator()),
			checkRequest: window.antiforgery || '',
			checkField: '',
		});

		const controls = this.controls = form.controls;

		this.formSubscription = form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			this.pushChanges();
		});

		this.error = null;
	}

	test() {
		if (this.state.status === 'login') {
			this.form.patch({
				username: 'publisher',
				password: 'publisher',
				checkRequest: window.antiforgery || '',
				checkField: ''
			});
		} else {
			this.form.patch({
				firstName: 'Jhon',
				lastName: 'Appleseed',
				email: 'jhonappleseed@gmail.com',
				role: this.controls.role.options.find(x => x.id !== null).id,
				privacy: true,
				checkRequest: window.antiforgery || '',
				checkField: ''
			});
		}
	}

	reset() {
		this.form.reset();
	}

	onBack() {
		this.state.status = 'access';
		this.pushChanges();
	}

	onSubmit() {
		if (this.form.valid) {
			this.form.submitted = true;
			const payload = this.form.value;
			const status = this.state.status;
			UserService.resolve$(payload, status).pipe(
				first(),
			).subscribe(response => {
				console.log('AccessComponent.onSubmit', response);
				switch (status) {
					case 'guided-tour':
						this.state.status = 'guided-tour-success';
						this.pushChanges();
						break;
					case 'self-service-tour':
						window.location.href = environment.url.selfServiceTour;
						break;
					case 'login':
						window.location.href = environment.url.guidedTour;
						break;
				}
				this.form.reset();
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

}

AccessComponent.meta = {
	selector: '[access-component]',
};
