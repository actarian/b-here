import { from, merge, of, Subject, throwError } from 'rxjs';
import { catchError, delay, first, map, switchMap, tap } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { LabelPipe } from '../label/label.pipe';
import StateService from '../state/state.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { RoleType } from '../user/user';
import AgoraService from './agora.service';

const TIMEOUT = 100;
const FORCE_ERROR = false;

export class AgoraChecklistService {

	static checklist$() {
		return StateService.state$.pipe(
			first(),
			map(state => {
				const event = {
					shouldCheckAudio: true,
					shouldCheckVideo: true,
					key: 'checklist_audio_video',
					uid: null,
					checklist: {
						browser: null,
						https: null,
						video: null,
						audio: null,
						rtc: null,
						rtm: null,
					},
					errors: {},
				};
				if (state.role === RoleType.Viewer) {
					event.shouldCheckAudio = false;
					event.shouldCheckVideo = false;
				}
				if (DeviceService.platform === DevicePlatform.VRHeadset) {
					event.shouldCheckAudio = true;
					event.shouldCheckVideo = false;
				}
				event.key = `checklist${event.shouldCheckAudio ? '_audio' : ''}${event.shouldCheckVideo ? '_video' : ''}`;
				return event;
			}),
			switchMap(event => {
				const checklist = LocalStorageService.get(event.key);
				if (checklist === true) {
					Object.keys(event.checklist).forEach(key => {
						event.checklist[key] = true;
					});
				}
				return of(event);
			}),
		);
	}

	static isChecked(event) {
		const isChecked = Object.keys(event.checklist).reduce((p, c, i) => {
			const checked = p && event.checklist[c];
			switch (c) {
				case 'audio':
					return checked || !event.shouldCheckAudio;
				case 'video':
					return checked || !event.shouldCheckVideo;
				default:
					return checked;
			}
		}, true);
		return isChecked;
	}

	static isChecked$() {
		return this.checklist$().pipe(
			map(event => this.isChecked(event)),
		);
	}

	static checkEvent$() {
		return this.checklist$().pipe(
			switchMap(event => {
				const checklist = Object.keys(event.checklist).reduce((p, c, i) => {
					return p && event.checklist[c];
				}, true);
				if (checklist === true) {
					return of(event);
				} else {
					LocalStorageService.set(event.key, false);
					const event$ = new Subject();
					const check$ = of(event).pipe(
						delay(1000),
						switchMap(event => {
							event$.next(event);
							return this.checkBrowserEvent$(event);
						}),
						switchMap(event => {
							event$.next(event);
							return this.checkHttpsEvent$(event);
						}),
						switchMap(event => {
							event$.next(event);
							return this.checkAudioEvent$(event);
						}),
						switchMap(event => {
							event$.next(event);
							return this.checkVideoEvent$(event);
						}),
						switchMap(event => {
							event$.next(event);
							return this.checkRtcEvent$(event);
						}),
						switchMap(event => {
							event$.next(event);
							return this.checkRtmEvent$(event);
						}),
						tap(event => {
							// console.log('AgoraChecklistService', event);
							LocalStorageService.set(event.key, true);
						}),
					);
					return merge(event$, check$);
				}
			}),
		);
	}

	static check$() {
		return this.checklist$().pipe(
			switchMap(event => {
				const checklist = Object.keys(event.checklist).reduce((p, c, i) => {
					return p && event.checklist[c];
				}, true);
				if (checklist === true) {
					return of(event);
				} else {
					LocalStorageService.set(event.key, false);
					return of(event).pipe(
						delay(1000),
						switchMap(event => this.checkBrowserEvent$(event)),
						switchMap(event => this.checkHttpsEvent$(event)),
						switchMap(event => this.checkAudioEvent$(event)),
						switchMap(event => this.checkVideoEvent$(event)),
						switchMap(event => this.checkRtcEvent$(event)),
						switchMap(event => this.checkRtmEvent$(event)),
						tap(event => {
							// console.log('AgoraChecklistService', event);
							LocalStorageService.set(event.key, true);
						}),
					)
				}
			}),
		);
	}

	static checkBrowser$() {
		if (FORCE_ERROR) {
			return of(false);
		}
		const browser = AgoraRTC.checkSystemRequirements();
		return of(browser);
	}

	static checkBrowserEvent$(event) {
		return this.checkBrowser$().pipe(
			switchMap(browser => {
				event.checklist.browser = browser;
				if (browser) {
					return of(event).pipe(delay(TIMEOUT));
				} else {
					event.errors.browser = LabelPipe.transform('bhere_browser_error');
					return this.checkHttpsEvent$(event).pipe(
						switchMap(event => {
							if (FORCE_ERROR) {
								return of(event);
							} else {
								return throwError(event);
							}
						}),
					);
				}
			}),
			catchError(error => {
				console.log('checkBrowserEvent$.error', error);
				event.checklist.browser = false;
				event.errors.browser = LabelPipe.transform('bhere_browser_error');
				return throwError(event);
			}),
		)
	}

	static checkHttps$() {
		if (FORCE_ERROR) {
			return of(false);
		}
		const https = window.location.protocol === 'https:';
		return of(https);
	}

	static checkHttpsEvent$(event) {
		return this.checkHttps$().pipe(
			switchMap(https => {
				event.checklist.https = https;
				if (https) {
					return of(event).pipe(delay(TIMEOUT));
				} else {
					event.errors.https = LabelPipe.transform('bhere_https_error');
					if (FORCE_ERROR) {
						return of(event);
					} else {
						return throwError(event);
					}
				}
			}),
			catchError(error => {
				console.log('checkHttpsEvent$.error', error);
				event.checklist.https = false;
				event.errors.https = LabelPipe.transform('bhere_https_error');
				return throwError(event);
			}),
		)
	}

	static checkAudio$() {
		if (FORCE_ERROR) {
			return of(false);
		}
		return from(AgoraService.getDevices()).pipe(
			map(devices => {
				const audioinput = devices.find(x => x.kind === 'audioinput' && x.deviceId);
				return audioinput != null;
			})
		);
	}

	static checkAudioEvent$(event) {
		// console.log('checkAudioEvent$', event);
		if (event.shouldCheckAudio) {
			return this.checkAudio$().pipe(
				switchMap(audio => {
					event.checklist.audio = audio;
					if (audio) {
						return of(event).pipe(delay(TIMEOUT));
					} else {
						event.errors.audio = LabelPipe.transform('bhere_audio_error');
						// console.log('checkAudioEvent$.error', event);
						if (FORCE_ERROR) {
							return of(event);
						} else {
							return throwError(event);
						}
					}
				}),
				catchError(error => {
					console.log('checkAudioEvent$.error', error);
					event.checklist.audio = false;
					event.errors.audio = LabelPipe.transform('bhere_audio_error');
					return throwError(event);
				}),
			)
		} else {
			return of(event);
		}
	}

	static checkVideo$() {
		if (FORCE_ERROR) {
			return of(false);
		}
		return from(AgoraService.getDevices()).pipe(
			map(devices => {
				const videoinput = devices.find(x => x.kind === 'videoinput' && x.deviceId);
				return videoinput != null;
			})
		);
	}

	static checkVideoEvent$(event) {
		if (event.shouldCheckVideo) {
			return this.checkVideo$().pipe(
				switchMap(video => {
					event.checklist.video = video;
					if (video) {
						return of(event).pipe(delay(TIMEOUT));
					} else {
						event.errors.video = LabelPipe.transform('bhere_video_error');
						if (FORCE_ERROR) {
							return of(event);
						} else {
							return throwError(event);
						}
					}
				}),
				catchError(error => {
					console.log('checkVideoEvent$.error', error);
					event.checklist.video = false;
					event.errors.video = LabelPipe.transform('bhere_video_error');
					return throwError(event);
				}),
			);
		} else {
			return of(event);
		}
	}

	static checkRtc$() {
		if (FORCE_ERROR) {
			return of(false);
		}
		return from(AgoraService.checkRtcConnection());
	}

	static checkRtcEvent$(event) {
		return this.checkRtc$().pipe(
			switchMap(uid => {
				event.uid = uid;
				event.checklist.rtc = uid !== false;
				if (uid) {
					return of(event).pipe(delay(TIMEOUT));
				} else {
					event.errors.rtc = LabelPipe.transform('bhere_rtc_error');
					if (FORCE_ERROR) {
						return of(event);
					} else {
						return throwError(event);
					}
				}
			}),
			catchError(error => {
				console.log('checkRtcEvent$.error', error);
				event.checklist.rtc = false;
				event.errors.rtc = LabelPipe.transform('bhere_rtc_error');
				return throwError(event);
			}),
		)
	}

	static checkRtm$(uid) {
		if (FORCE_ERROR) {
			return of(false);
		}
		return from(AgoraService.checkRtmConnection(uid));
	}

	static checkRtmEvent$(event) {
		return this.checkRtm$(event.uid).pipe(
			switchMap(uid => {
				event.checklist.rtm = uid !== false;
				if (uid) {
					return of(event);
				} else {
					event.errors.rtm = LabelPipe.transform('bhere_rtm_error');
					return throwError(event);
				}
			}),
			catchError(error => {
				console.log('checkRtmEvent$.error', error);
				event.checklist.rtm = false;
				event.errors.rtm = LabelPipe.transform('bhere_rtm_error');
				return throwError(event);
			}),
		)
	}

}
