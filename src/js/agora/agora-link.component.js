import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import PathService from '../editor/path/path.service';
import { environment } from '../environment';
import { MeetingId, MEETING_ID_VALIDATOR } from '../meeting/meeting-id';
import { MeetingUrl } from '../meeting/meeting-url';
import SlugPipe from '../slug/slug.pipe';
import StateService from '../state/state.service';

export default class AgoraLinkComponent extends Component {

	get selfServiceTourUrl() {
		const pathId = this.form.get('path').value;
		return `${SlugPipe.transform('selfServiceTour')}${pathId ? `?pathId=${pathId}` : ''}`;
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
};
