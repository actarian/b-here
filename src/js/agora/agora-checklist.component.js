import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import { DeviceService } from '../device/device.service';
import LabelPipe from '../label/label.pipe';
import LocalStorageService from '../local-storage/local-storage.service';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';
import AgoraService from './agora.service';

const TIMEOUT = 100;

export default class AgoraChecklistComponent extends Component {

	onInit() {
		this.platform = DeviceService.platform; // !!!
		this.checklist = {};
		this.errors = {};
		this.state = {};
		this.busy = true;
		this.shouldCheckDevices = true;
		LocalStorageService.set('checklist', false);
		StateService.state$.pipe(
			first(),
		).subscribe(state => {
			// console.log('AgoraChecklistComponent', state);
			this.state = state;
			if (state.role === RoleType.Viewer) {
				this.shouldCheckDevices = false;
			}
			this.pushChanges();
			setTimeout(() => {
				this.checkBrowser();
			}, 1000);
		});
	}

	checkBrowser() {
		const browser = AgoraRTC.checkSystemRequirements();
		this.checklist.browser = browser;
		if (browser) {
			setTimeout(() => {
				this.checkHttps();
			}, TIMEOUT);
		} else {
			this.errors.browser = LabelPipe.transform('bhere_browser_error');
			this.checkHttps(true);
			this.checkAudio(true);
			this.checkVideo(true);
			this.checkRtc(true);
			this.checkRtm(true);
		}
		this.pushChanges();
	}

	checkHttps(skip) {
		const https = window.location.protocol === 'https:';
		this.checklist.https = https;
		if (skip) {
			if (!https) {
				this.errors.https = LabelPipe.transform('bhere_https_error');
			}
		} else if (https) {
			setTimeout(() => {
				if (this.shouldCheckDevices) {
					this.checkAudio();
				} else {
					this.checkRtc();
				}
			}, TIMEOUT);
			this.pushChanges();
		} else {
			this.errors.https = LabelPipe.transform('bhere_https_error');
			this.checkAudio(true);
			this.checkVideo(true);
			this.checkRtc(true);
			this.checkRtm(true);
			this.pushChanges();
		}
	}

	checkAudio(skip) {
		if (skip) {
			this.checklist.audio = false;
		} else {
			AgoraService.getDevices().then((devices) => {
				// console.log('checkAudio', devices);
				const audioinput = devices.find(x => x.kind === 'audioinput' && x.deviceId);
				this.checklist.audio = audioinput != null;
				this.pushChanges();
				setTimeout(() => {
					this.checkVideo();
				}, TIMEOUT);
			}).catch((error) => {
				this.checklist.audio = false;
				this.errors.audio = error;
				this.pushChanges();
				setTimeout(() => {
					this.checkVideo();
				}, TIMEOUT);
			});
			/*
			AgoraRTC.getDevices((devices) => {
				// console.log('checkAudio', devices);
				const audioinput = devices.find(x => x.kind === 'audioinput' && x.deviceId);
				this.checklist.audio = audioinput != null;
				this.pushChanges();
				setTimeout(() => {
					this.checkVideo();
				}, TIMEOUT);
			}, (error) => {
				this.checklist.audio = false;
				this.errors.audio = error;
				this.pushChanges();
				setTimeout(() => {
					this.checkVideo();
				}, TIMEOUT);
			});
			*/
		}
	}

	checkVideo(skip) {
		if (skip) {
			this.checklist.video = false;
		} else {
			AgoraService.getDevices().then((devices) => {
				// console.log('checkVideo', devices);
				const videoinput = devices.find(x => x.kind === 'videoinput' && x.deviceId);
				this.checklist.video = videoinput != null;
				setTimeout(() => {
					this.checkRtc();
				}, TIMEOUT);
				this.pushChanges();
			}).catch((error) => {
				this.checklist.video = false;
				this.errors.video = error;
				setTimeout(() => {
					this.checkRtc();
				}, TIMEOUT);
				this.pushChanges();
			});
			/*
			AgoraRTC.getDevices((devices) => {
				// console.log('checkVideo', devices);
				const videoinput = devices.find(x => x.kind === 'videoinput' && x.deviceId);
				this.checklist.video = videoinput != null;
				setTimeout(() => {
					this.checkRtc();
				}, TIMEOUT);
				this.pushChanges();
			}, (error) => {
				this.checklist.video = false;
				this.errors.video = error;
				setTimeout(() => {
					this.checkRtc();
				}, TIMEOUT);
				this.pushChanges();
			});
			*/
		}
	}

	checkRtc(skip) {
		if (skip) {
			this.checklist.rtc = false;
		} else {
			AgoraService.checkRtcConnection().then(uid => {
				this.checklist.rtc = true;
				this.pushChanges();
				setTimeout(() => {
					this.checkRtm(false, uid);
				}, TIMEOUT);
			}).catch((error) => {
				this.checklist.rtc = false;
				this.errors.rtc = error;
				this.checkRtm(true);
				this.pushChanges();
			});
		}
	}

	checkRtm(skip, uid) {
		if (skip) {
			this.checklist.rtm = false;
			this.onComplete();
		} else {
			AgoraService.checkRtmConnection(uid).then(_ => {
				this.checklist.rtm = true;
			}).catch((error) => {
				this.checklist.rtm = false;
				this.errors.rtm = error;
			}).finally(() => {
				this.onComplete();
			});
		}
	}

	onComplete() {
		// console.log('AgoraChecklistComponent.onComplete');
		const success = Object.keys(this.checklist).reduce((p, c) => {
			return p && this.checklist[c];
		}, true);
		this.checklist.success = success;
		this.checklist.error = !success;
		this.busy = false;
		this.pushChanges();
		if (this.state.role === RoleType.SmartDevice) {
			this.onNext();
		}
	}

	onNext() {
		if (this.checklist.success) {
			LocalStorageService.set('checklist', true);
		}
		this.checked.next(this.checklist);
	}

	openHttps() {
		window.location.href = window.location.href.replace('http://', 'https://').replace(':5000', ':6443');
	}
}

AgoraChecklistComponent.meta = {
	selector: '[agora-checklist]',
	outputs: ['checked'],
};
