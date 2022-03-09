import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import StateService from '../state/state.service';
import AgoraService from './agora.service';

export default class AgoraDeviceComponent extends Component {

	get hasPreview() {
		return this.platform !== DevicePlatform.IOS && this.platform !== DevicePlatform.VRHeadset; // && this.form && this.form.value.video;
	}

	onInit() {
		this.platform = DeviceService.platform;
		this.isHttps = window.location.protocol === 'https:';
		this.state = {};
		this.devices = { videos: [], audios: [] };
		this.stream = null;
		this.form = null;
		if (this.isHttps) {
			const agora = this.agora = AgoraService.getSingleton();
			StateService.state$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(state => {
				// console.log('AgoraDeviceComponent.state', state);
				this.state = state;
				this.pushChanges();
			});
			if (agora) {
				agora.devices$().subscribe(devices => {
					// console.log(devices);
					this.devices = devices;
					this.initForm(devices);
					this.pushChanges();
				}, error => {
					console.log('AgoraDeviceComponent.devices$.error', error);
					// alert('AgoraDeviceComponent ' + error); // !!!
				});
			}
		}
	}

	openHttps(event) {
		window.location.href = window.location.href.replace('http://', 'https://').replace(':5000', ':6443');
	}

	initForm(devices) {
		const form = this.form = new FormGroup({
			video: new FormControl(null, devices.videos.length ? Validators.RequiredValidator() : undefined),
			audio: new FormControl(null, devices.audios.length ? Validators.RequiredValidator() : undefined),
		});
		const controls = this.controls = form.controls;
		const videoOptions = devices.videos.map(x => {
			return {
				id: x.deviceId,
				name: x.label,
			};
		});
		if (videoOptions.length > 0) {
			videoOptions.unshift({
				id: null, name: 'bhere_select_video', // LabelPipe.transform('bhere_select_video')
			});
		}
		controls.video.options = videoOptions;
		const audioOptions = devices.audios.map(x => {
			return {
				id: x.deviceId,
				name: x.label,
			};
		});
		if (audioOptions.length > 0) {
			audioOptions.unshift({
				id: null, name: 'bhere_select_audio', // LabelPipe.transform('bhere_select_audio')
			});
		}
		controls.audio.options = audioOptions;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraDeviceComponent.changes$', form.value);
			this.pushChanges();
		});
	}

	onStreamDidChange(event) {
		this.stream = null;
		this.pushChanges();
	}

	onStream(stream) {
		this.stream = stream;
		this.pushChanges();
	}

	isValid() {
		const isValid = this.form.valid && (this.stream || !this.hasPreview);
		return isValid;
	}

	onEnter(event) {
		const preferences = this.form.value;
		const devices = this.devices;
		devices.video = devices.videos.find(x => x.deviceId === preferences.video);
		devices.audio = devices.audios.find(x => x.deviceId === preferences.audio);
		this.enter.next(devices);
	}

}

AgoraDeviceComponent.meta = {
	selector: '[agora-device]',
	outputs: ['enter'],
	template: /* html */`
	<div class="group--info" *if="!isHttps">
		<div class="group--info__content stagger--childs">
			<div class="title" [innerHTML]="'bhere_invalid_protocol' | label"></div>
			<div class="info" [innerHTML]="'bhere_reload_in_https' | label"></div>
			<button type="button" class="btn--connect" (click)="openHttps($event)">
				<span [innerHTML]="'bhere_reload' | label"></span>
			</button>
		</div>
	</div>
	<div class="group--info" *if="form">
		<form class="form" [formGroup]="form" (submit)="isValid() && onEnter($event)" name="form" role="form" novalidate autocomplete="off">
			<!-- PREVIEW -->
			<div class="agora-device-preview" agora-device-preview [video]="controls.video.value" [audio]="controls.audio.value" (stream)="onStream($event)" (change)="onStreamDidChange($event)" *if="this.hasPreview">
				<video class="video" muted></video>
				<div class="audio"></div>
			</div>
			<div class="group--info__content stagger--childs">
				<!-- VIDEO -->
				<div control-custom-select [control]="controls.video" label="Video" *if="devices.videos.length"></div>
				<!-- AUDIO -->
				<div control-custom-select [control]="controls.audio" label="Audio" *if="devices.audios.length"></div>
				<div class="info" *if="!isValid()" [innerHTML]="'bhere_select_video_audio' | label"></div>
				<div class="info" *if="isValid()" [innerHTML]="'bhere_video_audio_connected' | label"></div>
				<button type="submit" class="btn--connect" [class]="{ disabled: !isValid() }">
					<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#call"></use></svg>
					<span *if="!state.connecting" [innerHTML]="'bhere_enter' | label"></span>
					<span *if="state.connecting" [innerHTML]="'bhere_connecting' | label"></span>
				</button>
			</div>
		</form>
	</div>
	`
};
