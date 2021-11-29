import StateService from '../state/state.service';
import { RoleType } from '../user/user';

export const MEETING_ID_VALIDATOR = /^\d{9}-\d{4}-\d{13}$/;

export class MeetingId {

	get roleIndex() {
		return MeetingId.getRoleIndex(this.role);
	}
	set roleIndex(roleIndex) {
		const roleIndex_ = MeetingId.getRoleIndex(this.role);
		if (roleIndex_ !== roleIndex) {
			const key = Object.keys(RoleType)[roleIndex];
			this.role = RoleType[key];
		}
	}

	constructor(options) {
		this.userId = StateService.state.user ? StateService.state.user.id : 0;
		this.role = StateService.state.role || RoleType.Viewer;
		this.timestamp = new Date().valueOf().toString();
		// this.timestamp = (performance.now() * 10000000000000).toString();
		if (typeof options === 'string') {
			if (options.match(MEETING_ID_VALIDATOR)) {
				options = MeetingId.decompose(options);
			} else {
				console.warn('MeetingId', 'invalid meetingId', options);
				return null;
			}
		}
		if (typeof options === 'object') {
			if (options.id) {
				this.id = options.id;
			}
			if (options.userId) {
				this.userId = options.userId;
			}
			if (options.role) {
				this.role = options.role;
			}
			if (options.roleIndex) {
				this.roleIndex = options.roleIndex;
			}
			if (options.timestamp) {
				this.timestamp = options.timestamp;
			}
		}
	}

	toString() {
		return MeetingId.compose(this.userId, this.roleIndex, this.timestamp);
	}

	toRoles() {
		const userId = this.userId;
		const timestamp = this.timestamp;
		return {
			id: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.Publisher), timestamp),
			idAttendee: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.Attendee), timestamp),
			idStreamer: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.Streamer), timestamp),
			idViewer: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.Viewer), timestamp),
			idSmartDevice: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.SmartDevice), timestamp),
			idSelfService: MeetingId.compose(userId, MeetingId.getRoleIndex(RoleType.SelfService), timestamp),
		};
	}

	static compose(userId, roleIndex, timestamp) {
		return `${MeetingId.padded(userId, 9)}-${MeetingId.padded(roleIndex, 4)}-${timestamp}`;
	}

	static decompose(meetingId) {
		const components = meetingId.split('-');
		return {
			userId: parseInt(components[0]),
			roleIndex: parseInt(components[1]),
			timestamp: parseInt(components[2]),
		};
	}

	static generateMeetingId() {
		const meetingId = new MeetingId();
		return meetingId.toRoles();
	}

	static getRoleIndex(role) {
		return Object.keys(RoleType).reduce((p, c, i) => {
			return RoleType[c] === role ? i : p;
		}, -1);
	}

	static padded(num, size) {
		const s = '000000000' + num;
		return s.substr(s.length - size);
	}
}
