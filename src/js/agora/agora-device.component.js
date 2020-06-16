import { Component } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import AgoraService from './agora.service';

export default class AgoraDeviceComponent extends Component {

	onInit() {
		this.state = {};
		this.devices = { videos: [], audios: [] };
		this.stream = null;
		this.form = null;
		const agora = this.agora = AgoraService.getSingleton();
		if (agora) {
			agora.state$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(state => {
				// console.log('AgoraDeviceComponent.state', state);
				this.state = state;
				this.pushChanges();
			});
			agora.devices$().subscribe(devices => {
				// console.log(devices);
				this.devices = devices;
				this.initForm(devices);
				this.pushChanges();
			});
		}
	}

	initForm(devices) {
		const form = this.form = new FormGroup({
			audio: new FormControl(null, Validators.RequiredValidator()),
			video: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		controls.video.options = devices.videos.map(x => {
			return {
				id: x.deviceId,
				name: x.label,
			};
		});
		controls.audio.options = devices.audios.map(x => {
			return {
				id: x.deviceId,
				name: x.label,
			};
		});
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraDeviceComponent.changes$', form.value);
			this.pushChanges();
		});
	}

	availableVideos() {
		return this.state.devices ? this.state.devices.videos : [];
	}

	availableAudios() {
		return this.state.devices ? this.state.devices.audios : [];
	}

	onStream(stream) {
		this.stream = stream;
	}

	onEnter(event) {
		const preferences = this.form.value;
		const devices = this.devices;
		devices.video = devices.videos.find(x => x.deviceId === preferences.video);
		devices.audio = devices.audios.find(x => x.deviceId === preferences.audio);
		this.enter.next(devices);
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	// onDestroy() {}

}

AgoraDeviceComponent.meta = {
	selector: '[agora-device]',
	outputs: ['enter'],
};
