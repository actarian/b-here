import { ReplaySubject } from 'rxjs';

export class MessageService {
	static message$ = new ReplaySubject(1);
	static message(message) {
		this.message$.next(message);
	}

	static in$ = new ReplaySubject(1);
	static in(message) {
		// console.log('MessageService.in', message);
		this.in$.next(message);
	}
	static send = MessageService.in;
	static sendBack(message) {
		message = Object.assign({}, message, { remoteId: message.clientId });
		// console.log('MessageService.sendBack', message);
		this.in$.next(message);
	}

	static out$ = new ReplaySubject(1);
	static out(message) {
		this.out$.next(message);
	}
}
