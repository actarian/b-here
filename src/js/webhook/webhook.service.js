import { EMPTY, forkJoin, fromEvent, of } from 'rxjs';
import { catchError, filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { HttpService } from '../http/http.service';
import StateService from '../state/state.service';

let UID = 0;

export class WebhookEvent {

	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}

	toJson() {
		return JSON.stringify(this);
	}

	static newEvent(action, data, extra) {
		console.log('WebhookEvent.newEvent', action, data, extra);
		const event = new WebhookEvent();
		event.action = action;
		event.data = data;
		event.extra = typeof extra === 'string' ? JSON.parse(extra) : extra;
		// ( meetingId, userSessionId, userRole, fullName, itemId, skuId, action:InfoPoint  )
		event.meetingId = StateService.state.link;
		event.userSessionId = StateService.state.uid;
		event.userRole = StateService.state.role;
		event.fullName = StateService.state.name;
		const timestamp = new Date().getTime();
		event.timestamp = timestamp;
		event.id = `${timestamp}-${++UID}`;
		return event;
	}

	static parseEvent(event) {
		if (event && 'data' in event) {
			const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
			if ('action' in message) {
				return new WebhookEvent(message);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

}
export class WebhookService {

	static event$_ = fromEvent(window, 'message').pipe(
		map(event => {
			const parsedEvent = WebhookEvent.parseEvent(event);
			return parsedEvent;
		}),
		filter(x => x !== null),
		shareReplay(1),
	);

	static internal$_(event) {
		return of(event).pipe(
			tap(event => {
				console.log('WebhookService.internal$_.postMessage', event);
				if (window.parent) {
					window.parent.postMessage(event.action, event.toJson());
				}
			}),
			switchMap(event => {
				return this.event$_.pipe(
					filter(event => event.id === event.id),
					first(),
				);
			}),
			map(response => {
				console.log('WebhookService.internal$_.handleResponse_', event, response);
				return this.handleResponse_(event, response);
			}),
			catchError(error => {
				return this.handleError_(event, error);
			}),
		)
	}

	static send$_(uri, event) {
		HttpService.post$(uri, event).pipe(
			map(response => {
				return this.handleResponse_(event, response);
			}),
			catchError(error => {
				return this.handleError_(event, error);
			}),
		);
	}

	static send$(action, payload, extra) {
		console.log('WebhookService.send$', action, payload, extra);
		if (this.enabled) {
			const event = WebhookEvent.newEvent(action, payload, extra);
			const uris = environment.webhook.uris;
			const observables = uris.map(x => x === 'internal' ? this.internal$_(event) : this.send$_(x, event));
			return forkJoin(observables);
		} else {
			return of(EMPTY);
		}
	}

	static handleResponse_(event, remoteResponse) {
		console.log('WebhookService.handleResponse_', remoteResponse);
		const response = Object.assign({}, event);
		response.remoteStatus = 1;
		response.remoteResponse = remoteResponse;
		return response;
	}

	static handleError_(event, error) {
		const response = Object.assign({}, event);
		response.remoteStatus = 0;
		response.remoteError = error;
		return of(response);
	}

	static get enabled() {
		return environment.webhook && environment.webhook.uris && environment.webhook.uris.length > 0;
	}

}
