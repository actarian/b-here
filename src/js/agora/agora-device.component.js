import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import StateService from '../state/state.service';
import AgoraService from './agora.service';

export default class AgoraDeviceComponent extends Component {

	onInit() {
		this.isIOS = AgoraDeviceComponent.isIOS();
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
				id: null, name: 'Seleziona una sorgente video'
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
				id: null, name: 'Seleziona una sorgente audio'
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
		const isValid = this.form.valid && (this.stream || this.isIOS);
		return isValid;
	}

	onEnter(event) {
		const preferences = this.form.value;
		const devices = this.devices;
		devices.video = devices.videos.find(x => x.deviceId === preferences.video);
		devices.audio = devices.audios.find(x => x.deviceId === preferences.audio);
		this.enter.next(devices);
	}

	static isIOS() {
		return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
	}
}

AgoraDeviceComponent.meta = {
	selector: '[agora-device]',
	outputs: ['enter'],
};
