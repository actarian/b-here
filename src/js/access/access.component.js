import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import { environment, STATIC } from '../environment';
import { fieldsToFormGroup, patchFields } from '../forms/controls.component';
import RoutePipe from '../router/route.pipe';
import RouterOutletStructure from '../router/router-outlet.structure';
import RouterService from '../router/router.service';
import { UserService } from '../user/user.service';

export default class AccessComponent extends Component {

	onInit() {
		console.log('AccessComponent.onInit');
		this.state = {
			status: 'access',
		};
		/*
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AccessComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
		*/
	}

	onSelfServiceTourRequest() {
		this.initRequestForm();
		this.state.status = 'self-service-tour';
		this.pushChanges();
		if (STATIC && window.navigator.userAgent.indexOf('OculusBrowser') !== -1) {
			this.test();
			this.onSubmit();
		}
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
			RouterService.setRouterLink(RoutePipe.transform(':lang.guidedTour'));
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

		const data = this.data = environment.data || {
			roles: [
				{ id: 1, name: 'Show room' },
				{ id: 2, name: 'Architetto' },
				{ id: 3, name: 'Interior designer' },
				{ id: 4, name: 'Privato' },
				{ id: 5, name: 'Altro' }
			],
		};

		const fields = this.fields = environment.fields || [
			{ type: 'text', name: 'firstName', label: 'access_first_name', required: true, test: 'Jhon' },
			{ type: 'text', name: 'lastName', label: 'access_last_name', required: true, test: 'Appleseed' },
			{ type: 'email', name: 'email', label: 'access_email', required: true, test: 'jhonappleseed@gmail.com' },
			{ type: 'custom-select', name: 'role', label: 'access_role', required: true, options: data.roles, test: data.roles[0].id },
			{ type: 'checkbox', name: 'privacy', label: 'access_privacy_disclaimer', required: true, test: true },
		];

		fields.push(
			{ type: 'hidden', name: 'checkField', value: '', test: '' },
			{ type: 'none', name: 'checkRequest', value: environment.antiforgery || '', test: environment.antiforgery || '' }
		);

		const form = this.form = fieldsToFormGroup(fields);
		/*
		const form = this.form = new FormGroup({
			firstName: new FormControl(null, Validators.RequiredValidator()),
			lastName: new FormControl(null, Validators.RequiredValidator()),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			role: new FormControl(null, Validators.RequiredValidator()),
			privacy: new FormControl(null, Validators.RequiredTrueValidator()),
			checkRequest: window.antiforgery || '',
			checkField: '',
		});
		*/

		const controls = this.controls = form.controls;
		/*
		const options = data.roles.slice();
		options.unshift({ id: null, name: 'select', // LabelPipe.transform('select') });
		controls.role.options = options;
		*/

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
			patchFields(this.fields, this.form);
			/*
			this.form.patch({
				firstName: 'Jhon',
				lastName: 'Appleseed',
				email: 'jhonappleseed@gmail.com',
				role: this.controls.role.options.find(x => x.id !== null).id,
				privacy: true,
				checkRequest: window.antiforgery || '',
				checkField: ''
			});
			*/
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
				// console.log('AccessComponent.onSubmit', response);
				switch (status) {
					case 'guided-tour':
						this.state.status = 'guided-tour-success';
						this.pushChanges();
						break;
					case 'self-service-tour':
						RouterService.setRouterLink(RoutePipe.transform(':lang.selfServiceTour'));
						break;
					case 'login':
						RouterService.setRouterLink(RoutePipe.transform(':lang.guidedTour'));
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
	hosts: { host: RouterOutletStructure },
	template: /*html*/ `
		<div class="page page--access">
			<!-- background -->
			<div class="background" [class]="{ 'background--image': ('background.image' | env), 'background--video': ('background.video' | env) }" *if="state.status != 'connected'">
				<img [src]="'background.image' | env" *if="'background.image' | env" />
				<video [src]="'background.video' | env" *if="'background.video' | env" oncanplay="this.muted = true; this.classList.add('ready');" playsinline autoplay muted loop></video>
			</div>
			<!-- access -->
			<div class="ui ui--info ui--info-centered" *if="state.status == 'access'">
				<div class="group--info">
					<div class="group--info__content stagger--childs">
						<div class="title" [innerHTML]="'access_title' | label"></div>
						<div *if="'selfService' | flag">
							<button type="button" class="btn--next" (click)="onSelfServiceTourRequest($event)">
								<span [innerHTML]="'access_tour' | label"></span>
							</button>
							<div class="info" [innerHTML]="'access_or' | label"></div>
						</div>
						<div *if="'guidedTourRequest' | flag">
							<button type="button" class="btn--next" (click)="onGuidedTourRequest($event)">
								<span [innerHTML]="'access_guided_tour' | label"></span>
							</button>
							<div class="info" [innerHTML]="'access_has_meeting_id' | label"></div>
						</div>
						<button type="button" class="btn--next" (click)="onGuidedTourAccess($event)">
							<span [innerHTML]="'access_guided_tour_cta' | label"></span>
						</button>
					</div>
				</div>
				<button type="button" class="btn--absolute" (click)="onLogin($event)">
					<span [innerHTML]="'access_cta' | label"></span> <svg class="lock" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#lock"></use></svg>
				</button>
			</div>
			<!-- guided-tour -->
			<div class="ui ui--info" *if="state.status == 'self-service-tour' || state.status == 'guided-tour'">
				<div class="group--info">
					<form class="form" [formGroup]="form" (submit)="isValid() && onSubmit()" name="form" role="form" novalidate autocomplete="off">
						<div class="group--info__content stagger--childs">
							<div class="title" *if="state.status == 'self-service-tour'" [innerHTML]="'access_fill_fields' | label"></div>
							<div class="title" *if="state.status == 'guided-tour'" [innerHTML]="'access_guided_tour_request' | label"></div>
							<!-- controls -->
							<div controls [formGroup]="form" [fields]="fields"></div>
							<div class="group--error" *if="error">
								<span class="status-code" [innerHTML]="error.statusCode"></span>
								<span class="status-message" [innerHTML]="error.statusMessage"></span>
								<span class="friendly-message" [innerHTML]="error.friendlyMessage"></span>
							</div>
							<div class="info" *if="isValid()" [innerHTML]="'access_take_part' | label"></div>
							<button type="submit" class="btn--next" [class]="{ disabled: !isValid() }">
								<span *if="!form.submitted" [innerHTML]="'access_send' | label"></span>
								<span *if="form.submitted" [innerHTML]="'access_sent' | label"></span>
							</button>
							<button type="button" class="btn--mode" (click)="onBack($event)">
								<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#arrow-prev"></use></svg>
								<span [innerHTML]="'access_back' | label"></span>
							</button>
							<test-component [form]="form" (test)="test($event)" (reset)="reset($event)"></test-component>
						</div>
					</form>
				</div>
			</div>
			<!-- guided-tour success -->
			<div class="ui ui--info ui--info-centered" *if="state.status == 'guided-tour-success'">
				<div class="group--info">
					<div class="group--info__content stagger--childs">
						<div class="title" [innerHTML]="'access_request_sent' | label"></div>
						<div class="info" [innerHTML]="'access_info_request' | label"></div>
						<button type="button" class="btn--mode" (click)="onBack($event)">
							<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#arrow-prev"></use></svg>
							<span [innerHTML]="'access_back' | label"></span>
						</button>
					</div>
				</div>
			</div>
			<!-- login -->
			<div class="ui ui--info ui--info-centered" *if="state.status == 'login'">
				<div class="group--info">
					<form class="form" [formGroup]="form" (submit)="isValid() && onSubmit()" name="form" role="form" novalidate autocomplete="off">
						<div class="group--info__content stagger--childs">
							<div class="title" [innerHTML]="'access_login' | label"></div>
							<input name="checkField" [formControl]="controls.checkField" value="" type="text" style="display:none !important;" />
							<div control-text [control]="controls.username" [label]="'access_username' | label"></div>
							<div control-password [control]="controls.password" [label]="'access_password' | label"></div>
							<div class="group--error" *if="error">
								<span class="status-code" [innerHTML]="error.statusCode"></span>
								<span class="status-message" [innerHTML]="error.statusMessage"></span>
								<span class="friendly-message" [innerHTML]="error.friendlyMessage"></span>
							</div>
							<div class="info" *if="isValid()" [innerHTML]="'access_cta' | label"></div>
							<button type="submit" class="btn--next" [class]="{ disabled: !isValid() }">
								<span [innerHTML]="'access_cta' | label"></span>
							</button>
							<button type="button" class="btn--mode" (click)="onBack($event)">
								<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#arrow-prev"></use></svg>
								<span [innerHTML]="'access_back' | label"></span>
							</button>
							<test-component [form]="form" (test)="test($event)" (reset)="reset($event)"></test-component>
						</div>
					</form>
				</div>
			</div>
			<div class="btn--logo" (click)="onBack($event)">
				<img [src]="'logo' | env" *if="'logo' | env" />
				<svg viewBox="0 0 270 98" *if="!('logo' | env)"><use xlink:href="#b-here"></use></svg>
			</div>
			<!-- credits -->
				<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener" *if="state.status != 'connected'">
				<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
			</a>
			<!-- language -->
			<div class="group--language" language (set)="pushChanges()" *if="state.status != 'connected'"></div>
		</div>
	`
};
