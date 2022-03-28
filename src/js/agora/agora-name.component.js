import { Component } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environment';
import { fieldsToFormGroup, patchFields } from '../forms/controls.component';
import { MeetingUrl } from '../meeting/meeting-url';
import StateService from '../state/state.service';

export default class AgoraNameComponent extends Component {

	onInit() {
		const meetingUrl = new MeetingUrl();
		this.state = {};

		const fields = this.fields = [];

		if (environment.flags.useExtendedUserInfo) {
			const firstName = meetingUrl.firstName;
			const lastName = meetingUrl.lastName;
			const email = meetingUrl.email;
			fields.push(
				{ type: 'text', name: 'firstName', label: 'access_first_name', required: true, value: firstName, test: 'Jhon' },
				{ type: 'text', name: 'lastName', label: 'access_last_name', required: true, value: lastName, test: 'Appleseed' },
				{ type: 'email', name: 'email', label: 'access_email', required: true, value: email, test: 'jhonappleseed@gmail.com' },
			);
		} else {
			const name = meetingUrl.name;
			fields.push(
				{ type: 'text', name: 'name', label: 'bhere_name_and_surname', pattern: /^\w{2,}\s\w{2,}/, required: true, value: name, test: 'Jhon Appleseed' },
			);
		}

		fields.push(
			{ type: 'checkbox', name: 'privacy', label: 'access_privacy_disclaimer', required: true, test: true },
			{ type: 'hidden', name: 'checkField', value: '', test: '' },
			{ type: 'none', name: 'checkRequest', value: environment.antiforgery || '', test: environment.antiforgery || '' }
		);

		const form = this.form = fieldsToFormGroup(fields);

		/*
		const form = this.form = new FormGroup({
			name: new FormControl(name, [Validators.PatternValidator(/^\w{2,}\s\w{2,}/), Validators.RequiredValidator()]),
		});
		*/

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

	test() {
		patchFields(this.fields, this.form);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onNext(event) {
		let name;
		let options;
		if (environment.flags.useExtendedUserInfo) {
			options = {
				firstName: this.controls.firstName.value,
				lastName: this.controls.lastName.value,
				email: this.controls.email.value,
			};
			name = `${options.firstName} ${options.lastName}`;
		} else {
			options = {
				name: this.controls.name.value,
			};
			name = options.name;
		}
		MeetingUrl.replaceWithOptions(options);
		this.name.next(name);
	}

}

AgoraNameComponent.meta = {
	selector: '[agora-name]',
	outputs: ['name'],
	template: /* html */`
	<div class="group--info" *if="form">
		<form class="form" [formGroup]="form" (submit)="isValid() && onNext($event)" name="form" role="form" novalidate autocomplete="off">
			<div class="group--info__content stagger--childs">
				<!-- controls -->
				<div controls [formGroup]="form" [fields]="fields"></div>
				<!-- NAME -->
				<!--
				<div class="group--form group--form--addon" [class]="{ required: controls.name.validators.length }">
					<label [innerHTML]="'bhere_fill_fullname' | label"></label>
					<input type="text" class="control--text" [formControl]="controls.name" [placeholder]="'bhere_name_and_surname' | label" />
				</div>
				<div class="info" *if="!controls.name.valid" [innerHTML]="'bhere_fill_name_and_surname' | label"></div>
				-->
				<div class="info" *if="!isValid()"><span [innerHTML]="'bhere_fill_name_and_surname' | label"></span></div>
				<div class="info" *if="isValid()"><span [innerHTML]="'bhere_proceed_as' | label"></span> <span [innerHTML]="controls.name.value"></span></div>
				<button type="submit" class="btn--next" [class]="{ disabled: !isValid() }">
					<span [innerHTML]="'bhere_proceed' | label"></span>
				</button>
				<test-component [form]="form" (test)="test($event)" (reset)="reset($event)"></test-component>
			</div>
		</form>
	</div>
	`
};
