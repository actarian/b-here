
export const RoleType = {
	Publisher: 'publisher',
	Attendee: 'attendee',
	Streamer: 'streamer',
	Viewer: 'viewer',
	SelfService: 'self-service',
};

export class User {
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
