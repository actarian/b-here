import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UIMode } from '../agora/agora.types';
import { environment } from '../environment';
import { HttpService } from '../http/http.service';
import { MeetingUrl } from '../meeting/meeting-url';
import { RoleType, User } from './user';

export class UserService {

	static setUser(user) {
		this.user$.next(user);
	}

	static me$() {
		return HttpService.get$('/api/user/me').pipe(
			map((user) => this.mapUser(user)),
			catchError(error => {
				// console.log('UserService.me$.error', error);
				if (error.status === 404 || error.statusCode === 404) {
					return of(null);
				} else {
					throw (error);
				}
			}),
			switchMap(user => {
				this.setUser(user);
				return this.user$;
			}),
		);
	}

	static login$(payload) {
		return HttpService.post$('/api/user/login', payload).pipe(
			map((user) => this.mapUser(user)),
			tap((user) => this.setUser(user)),
		);
	}

	static logout$() {
		return HttpService.get$('/api/user/logout').pipe(
			map((user) => this.mapUser(user)),
			tap((user) => this.setUser(null)),
		);
	}

	static guidedTour$(payload) {
		return HttpService.post$('/api/user/guided-tour', payload).pipe(
			map((user) => this.mapUser(user)),
			tap((user) => this.setUser(user)),
		);
	}

	static selfServiceTour$(payload) {
		return HttpService.post$('/api/user/self-service-tour', payload).pipe(
			map((user) => this.mapUser(user)),
			tap((user) => this.setUser(user)),
		);
	}

	static selfServiceSupportRequest$(user, meetingId, link) {
		const payload = { user, meetingId, link };
		return HttpService.post$('/api/user/self-service-support-request', payload).pipe(
			tap(_ => {
				if (!environment.flags.production) {
					fetch(environment.template.email.supportRequest)
						.then(response => response.text())
						.then(html => {
							html = html.replace('{{username}}', MeetingUrl.getName(user));
							html = html.replace('{{href}}', link);
							const parser = new DOMParser();
							const newDocument = parser.parseFromString(html, 'text/html');
							setTimeout(() => {
								// const newWindow = window.open(window.location.origin + environment.template.email.supportRequest, '_blank');
								const newWindow = window.open();
								newWindow.document.head.innerHTML = newDocument.querySelector('head').innerHTML;
								newWindow.document.body.innerHTML = newDocument.querySelector('body').innerHTML;
							}, 3000);
						});
				}
			}),
		);
	}

	static resolve$(payload, status) {
		if (status === 'login') {
			return this.login$(payload);
		}
		if (status === 'guided-tour') {
			return this.guidedTour$(payload);
		}
		if (status === 'self-service-tour') {
			return this.selfServiceTour$(payload);
		}
	}

	static log$(payload) {
		return HttpService.post$('/api/user/log', payload);
	}

	static temporaryUser$(roleType = RoleType.Embed) {
		return of({
			id: this.uuid(),
			type: roleType,
			username: roleType,
			// firstName: 'Jhon',
			// lastName: 'Appleseed',
		}).pipe(
			map((user) => this.mapUser(user)),
			switchMap(user => {
				// console.log('UserService.temporaryUser$', user);
				this.setUser(user);
				return this.user$;
			}),
		);
	}

	static overrideUser$(roleType = RoleType.Embed) {
		return this.me$().pipe(
			switchMap(user => {
				if (user) {
					user.type = roleType;
					user.username = roleType;
					return this.user$;
				}
				return this.temporaryUser$(roleType);
			}),
		);
	}

	static uuid() {
		return new Date().getTime();
		// return parseInt(process.hrtime.bigint().toString());
	}

	/*
	static retrieve$(payload) {
		return HttpService.post$('/api/user/retrievepassword', payload).pipe(
			map((user) => this.mapUser(user)),
		);
	}

	static register$(payload) {
		return HttpService.post$('/api/user/register', payload).pipe(
			map((user) => this.mapUser(user)),
		);
	}

	static update(payload) {
		return HttpService.post$('/api/user/updateprofile', payload).pipe(
			map((user) => this.mapUser(user)),
		);
	}
	*/

	static mapUser(user) {
		return new User(user);
	}

	static getMode(role) {
		let mode;
		switch (role) {
			case RoleType.Publisher:
			case RoleType.Attendee:
			case RoleType.Streamer:
			case RoleType.Viewer:
			case RoleType.Publisher:
			case RoleType.Publisher:
				mode = UIMode.VirtualTour;
				break;
			case RoleType.SelfService:
				mode = UIMode.SelfServiceTour;
				break;
			case RoleType.SmartDevice:
				mode = UIMode.LiveMeeting;
				break;
			case RoleType.Embed:
				mode = UIMode.Embed;
				break;
			default:
				mode = UIMode.None;
		}
		// console.log('UserService.getMode', role, mode);
		return mode;
	}

}

UserService.user$ = new BehaviorSubject(null);
