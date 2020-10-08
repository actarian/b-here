import { Component } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { takeUntil } from 'rxjs/operators';
import LocationService from '../location/location.service';
import StateService from '../state/state.service';

export default class AgoraNameComponent extends Component {
	onInit() {
		const name = LocationService.get('name') || null;
		this.state = {};
		const form = this.form = new FormGroup({
			name: new FormControl(name, [Validators.PatternValidator(/^\w{2,}\s\w{2,}/), Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraNameComponent.changes$', form.value);
			this.pushChanges();
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AgoraNameComponent.state', state);
			this.state = state;
			this.pushChanges();
		});
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
			// console.log('AgoraNameComponent.url', url);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
	}
}

AgoraNameComponent.meta = {
	selector: '[agora-name]',
	outputs: ['name'],
};
