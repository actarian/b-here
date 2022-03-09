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
	template: /* html */`
	<div class="group--info" *if="form">
		<form class="form" [formGroup]="form" (submit)="isValid() && onNext($event)" name="form" role="form" novalidate autocomplete="off">
			<div class="group--info__content stagger--childs">
				<!-- NAME -->
				<div class="group--form group--form--addon" [class]="{ required: controls.name.validators.length }">
					<label [innerHTML]="'bhere_fill_fullname' | label"></label>
					<input type="text" class="control--text" [formControl]="controls.name" [placeholder]="'bhere_name_and_surname' | label" />
				</div>
				<div class="info" *if="!controls.name.valid" [innerHTML]="'bhere_fill_name_and_surname' | label"></div>
				<div class="info" *if="isValid()">prosegui come <span [innerHTML]="controls.name.value"></span></div>
				<button type="submit" class="btn--next" [class]="{ disabled: !isValid() }">
					<span [innerHTML]="'bhere_proceed' | label"></span>
				</button>
			</div>
		</form>
	</div>
	`
};
