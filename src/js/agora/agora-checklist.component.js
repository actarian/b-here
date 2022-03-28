import { Component } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { DeviceService } from '../device/device.service';
import { ModalService } from '../modal/modal.service';
import { RoleType } from '../user/user';
import { AgoraChecklistService } from './agora-checklist.service';
import AgoraConfigureFirewallModalComponent from './agora-configure-firewall-modal.component';

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
			// console.log('AgoraChecklistService', event, event.errors);
			this.shouldCheckAudio = event.shouldCheckAudio;
			this.shouldCheckVideo = event.shouldCheckVideo;
			this.checklist = event.checklist;
			this.errors = event.errors || {};
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
			this.errors = error.errors || {};
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
		ModalService.open$({ template: AgoraConfigureFirewallModalComponent.chunk() }).pipe(
			first(),
		).subscribe();
	}
}

AgoraChecklistComponent.meta = {
	selector: '[agora-checklist]',
	outputs: ['checked'],
	template: /* html */`
	<div class="group--info">
		<div class="group--info__content stagger--childs">
			<div class="title" *if="busy" [innerHTML]="'bhere_checklist_busy' | label"></div>
			<div class="title" *if="checklist.success" [innerHTML]="'bhere_checklist_success' | label"></div>
			<div class="title" *if="checklist.error" [innerHTML]="'bhere_checklist_error' | label"></div>
			<ul class="group--checklist stagger--childs">
				<li class="checklist__item check"><span>Browser</span> <span agora-check [value]="checklist.browser"></span></li>
				<li class="checklist__item error" *if="errors.browser"><a class="btn--link" href="https://browsehappy.com/" target="_blank" rel="noopener" [innerHTML]="errors.browser"></a></li>
				<li class="checklist__item check"><span>Https</span> <span agora-check [value]="checklist.https"></span></li>
				<li class="checklist__item error" *if="errors.https"><a class="btn--link" (click)="openHttps()" [innerHTML]="errors.https"></a></li>
				<li class="checklist__item check" *if="shouldCheckAudio"><span>Audio</span> <span agora-check [value]="checklist.audio"></span></li>
				<li class="checklist__item error" *if="errors.audio"><span [innerHTML]="errors.audio"></span></li>
				<li class="checklist__item check" *if="shouldCheckVideo"><span>Video</span> <span agora-check [value]="checklist.video"></span></li>
				<li class="checklist__item error" *if="errors.video"><span [innerHTML]="errors.video"></span></li>
				<li class="checklist__item check"><span>Realtime Communication</span> <span agora-check [value]="checklist.rtc"></span></li>
				<li class="checklist__item error" *if="errors.rtc"><a class="btn--link" (click)="showFirewallConfiguration()" [innerHTML]="errors.rtc"></a></li>
				<li class="checklist__item check"><span>Realtime Messaging</span> <span agora-check [value]="checklist.rtm"></span></li>
				<li class="checklist__item error" *if="errors.rtm"><a class="btn--link" (click)="showFirewallConfiguration()" [innerHTML]="errors.rtm"></a></li>
			</ul>
			<button type="submit" class="btn--next" [class]="{ disabled: !checklist.success, ready: checklist.success }" (click)="onNext()">
				<span [innerHTML]="'bhere_proceed' | label"></span>
			</button>
		</div>
	</div>
	`
};
