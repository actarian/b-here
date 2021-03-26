
export const RoleType = {
	Publisher: 'publisher',
	Attendee: 'attendee',
	Streamer: 'streamer',
	Viewer: 'viewer',
	SmartDevice: 'smart-device',
	SelfService: 'self-service',
	Embed: 'embed',
};

export class User {
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
