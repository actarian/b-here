import { Component } from 'rxcomp';
// import UserService from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import LocationService from '../location/location.service';
import AgoraService from './agora.service';

export default class AgoraNameComponent extends Component {

	onInit() {
		this.state = {};
		const form = this.form = new FormGroup({
			name: new FormControl(null, [Validators.PatternValidator(/^\w{2,}\s\w{2,}/), Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraNameComponent.changes$', form.value);
			this.pushChanges();
		});
		const agora = this.agora = AgoraService.getSingleton();
		if (agora) {
			agora.state$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(state => {
				// console.log('AgoraNameComponent.state', state);
				this.state = state;
				this.pushChanges();
			});
		}
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid;
	}

	onNext(event) {
		this.replaceUrl();
		this.name.next(this.controls.name.value);
	}

	replaceUrl() {
		if ('history' in window) {
			const role = LocationService.get('role') || null;
			const link = LocationService.get('link') || null;
			const url = `${window.location.origin}${window.location.pathname}?link=${link}&name=${this.controls.name.value}` + (role ? `&role=${role}` : '');
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	// onDestroy() {}

}

AgoraNameComponent.meta = {
	selector: '[agora-name]',
	outputs: ['name'],
};
