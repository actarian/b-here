import { Component } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { DeviceService } from '../device/device.service';
import { environment } from '../environment';
import ModalService from '../modal/modal.service';
import { RoleType } from '../user/user';
import { AgoraChecklistService } from './agora-checklist.service';

export default class AgoraChecklistComponent extends Component {

	onInit() {
		this.platform = DeviceService.platform;
		this.checklist = {};
		this.errors = {};
		this.state = {};
		this.busy = true;
		this.shouldCheckAudio = false;
		this.shouldCheckVideo = false;
		AgoraChecklistService.checkEvent$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			console.log('AgoraChecklistService', event, event.errors);
			this.shouldCheckAudio = event.shouldCheckAudio;
			this.shouldCheckVideo = event.shouldCheckVideo;
			this.checklist = event.checklist;
			this.errors = event.errors;
			// console.log(JSON.stringify(event.errors));
			const success = AgoraChecklistService.isChecked(event);
			if (success) {
				this.checklist.success = success;
				this.busy = false;
				this.pushChanges();
				if (this.state.role === RoleType.SmartDevice) {
					this.onNext();
				}
			} else {
				this.pushChanges();
			}
			// console.log(event);
		}, error => {
			// console.log('AgoraChecklistService.error', error);
			this.errors = error.errors;
			this.checklist.error = true;
			this.busy = false;
			this.pushChanges();
		});
	}

	onNext() {
		this.checked.next(this.checklist);
	}

	openHttps() {
		window.location.href = window.location.href.replace('http://', 'https://').replace(':5000', ':6443');
	}

	showFirewallConfiguration() {
		ModalService.open$({ src: environment.template.modal.configureFirewall }).pipe(
			first(),
		).subscribe();
	}
}

AgoraChecklistComponent.meta = {
	selector: '[agora-checklist]',
	outputs: ['checked'],
};
