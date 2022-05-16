import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import PathService from '../editor/path/path.service';
import { environment } from '../environment';
import { MeetingId, MEETING_ID_VALIDATOR } from '../meeting/meeting-id';
import { MeetingUrl } from '../meeting/meeting-url';
import { RoutePipe } from '../router/route.pipe';
import StateService from '../state/state.service';

export default class AgoraLinkComponent extends Component {

	get selfServiceTourRoute() {
		const pathId = this.form.get('path').value;
		const route = [RoutePipe.transform(':lang.selfServiceTour')];
		if (pathId) {
			route.push(MeetingUrl.validateParams({ pathId }));
		}
		return route;
	}

	onInit() {
		this.state = {};
		this.paths = [];
		this.pathId = null;
		this.form = null;
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AgoraLinkComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
		if (environment.flags.usePaths) {
			PathService.getCurrentPath$().pipe(
				first(),
				tap(),
				takeUntil(this.unsubscribe$),
			).subscribe(path => {
				this.paths = PathService.paths;
				this.pathId = path.id || '';
				this.onLoad();
			});
		} else {
			this.onLoad();
		}
	}

	onLoad() {
		const form = this.form = new FormGroup({
			path: this.pathId,
			id: new FormControl(null, [Validators.PatternValidator(MEETING_ID_VALIDATOR), Validators.RequiredValidator()]),
			idAttendee: null,
			idStreamer: null,
			idViewer: null,
			idSmartDevice: null,
			// id: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		const pathOptions = this.paths.map(x => {
			return {
				id: x.id || '',
				name: x.name,
			};
		});
		if (pathOptions.length > 0) {
			pathOptions.unshift({
				id: null, name: 'bhere_select_path', // LabelPipe.transform('bhere_select_path')
			});
		}
		controls.path.options = pathOptions;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraLinkComponent.changes$', form.value);
			// console.log(changes.path, changes.id);
			if (this.pathId !== changes.path && changes.id !== null) {
				this.pathId = changes.path;
				this.onGenerateMeetingId();
			}
			this.pushChanges();
		});
	}

	onGenerateMeetingId($event) {
		let pathId = this.pathId ? String(this.pathId) : null;
		pathId = pathId && pathId.length ? pathId : null;
		// console.log('onGenerateMeetingId', this.pathId, pathId);
		const meetingId = new MeetingId({ pathId });
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
	template: /* html */`
	<div class="group--info" *if="form">
		<form class="form" [formGroup]="form" (submit)="isValid() && onNext($event)" name="form" role="form" novalidate autocomplete="off">
			<div class="group--info__content stagger--childs">
				<div class="stagger--childs" *if="state.role !== 'publisher'">
					<div class="group--form group--form--addon" [class]="{ required: controls.id.validators.length, 'addon': controls.id.valid }">
						<label [innerHTML]="'bhere_insert_meeting_id' | label"></label>
						<input type="text" class="control--text" [formControl]="controls.id" [placeholder]="'bhere_meeting_id' | label" />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.id.value)" *if="controls.id.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
				</div>
				<div class="stagger--childs" *if="state.role === 'publisher'">
					<!-- PATH -->
					<div control-custom-select [control]="controls.path" [label]="'bhere_path' | label" *if="('usePaths' | flag) && paths.length"></div>
					<!--IDS -->
					<div class="group--form group--form--addon" [class]="{ required: controls.id.validators.length, 'addon': controls.id.valid }">
						<label><svg class="lock" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#lock"></use></svg> <span [innerHTML]="'bhere_insert_meeting_id' | label"></span></label>
						<input type="text" class="control--text" [formControl]="controls.id" [placeholder]="'bhere_meeting_id' | label" (change)="onInputDidChange($event)" />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.id.value)" *if="controls.id.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
					<div class="group--form group--form--addon addon" *if="('attendee' | flag) && controls.idAttendee.valid && controls.idAttendee.value !== null">
						<label><svg class="lock" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#lock"></use></svg> <span [innerHTML]="'bhere_attendee_meeting_id' | label"></span></label>
						<input type="text" class="control--text" [formControl]="controls.idAttendee" [placeholder]="'bhere_attendee_meeting_id' | label" readonly />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.idAttendee.value)" *if="controls.idAttendee.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
					<div class="group--form group--form--addon addon" *if="('streamer' | flag) && controls.idStreamer.valid && controls.idStreamer.value !== null">
						<label [innerHTML]="'bhere_streamer_meeting_id' | label"></label>
						<input type="text" class="control--text" [formControl]="controls.idStreamer" [placeholder]="'bhere_streamer_meeting_id' | label" readonly />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.idStreamer.value)" *if="controls.idStreamer.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
					<div class="group--form group--form--addon addon" *if="('viewer' | flag) && controls.idViewer.valid && controls.idViewer.value !== null">
						<label [innerHTML]="'bhere_viewer_meeting_id' | label"></label>
						<input type="text" class="control--text" [formControl]="controls.idViewer" [placeholder]="'bhere_viewer_meeting_id' | label" readonly />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.idViewer.value)" *if="controls.idViewer.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
					<div class="group--form group--form--addon addon" *if="('smartDevice' | flag) && controls.idSmartDevice.valid && controls.idSmartDevice.value !== null">
						<label [innerHTML]="'bhere_smart_device_meeting_id' | label"></label>
						<input type="text" class="control--text" [formControl]="controls.idSmartDevice" [placeholder]="'bhere_smart_device_meeting_id' | label" readonly />
						<div class="control--addon" (click)="onCopyToClipBoard(controls.idSmartDevice.value, true)" *if="controls.idSmartDevice.valid">
							<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
						</div>
					</div>
				</div>
				<div class="info" *if="controls.id.errors.required" [innerHTML]="'bhere_insert_meeting_id' | label"></div>
				<div class="info" *if="controls.id.errors.pattern" [innerHTML]="'bhere_invalid_meeting_id' | label"></div>
				<div class="info" *if="isValid()" [innerHTML]="'bhere_take_part_meeting' | label"></div>
				<button type="button" class="btn--generate" *if="state.role == 'publisher'" (click)="onGenerateMeetingId($event)">
					<span [innerHTML]="'bhere_generate_meeting_id' | label"></span>
				</button>
				<button type="submit" class="btn--next" [class]="{ disabled: !isValid() }">
					<span [innerHTML]="'bhere_take_part' | label"></span>
				</button>
				<a [routerLink]="selfServiceTourRoute" class="btn--secondary" *if="state.role === 'publisher'">
					<span [innerHTML]="'bhere_self_service' | label"></span>
				</a>
			</div>
		</form>
	</div>
	`
};
