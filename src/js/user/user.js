
export const RoleType = {
	Publisher: 'publisher',
	Attendee: 'attendee',
	Streamer: 'streamer',
	Guest: 'guest',
	SelfService: 'self-service',
};

export class User {
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
