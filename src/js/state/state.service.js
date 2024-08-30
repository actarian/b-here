import { BehaviorSubject } from 'rxjs';
import { RoleType } from '../user/user';

export default class StateService {
	static state$ = new BehaviorSubject({});
	static set state(state) {
		this.state$.next(state);
	}
	static get state() {
		return this.state$.getValue();
	}

	static get controlled() {
		return (this.state.controlling && this.state.controlling !== this.state.uid);
	}

	static get controlling() {
		return (this.state.controlling && this.state.controlling === this.state.uid);
	}

	static get silencing() {
		return this.state.silencing;
	}

	static get silenced() {
		return (this.state.silencing && this.state.role === RoleType.Streamer);
	}

	static get spyed() {
		return (this.state.spying && this.state.spying === this.state.uid);
	}

	static get spying() {
		return (this.state.spying && this.state.spying !== this.state.uid && this.state.role === RoleType.Publisher);
	}

	static get locked() {
		return this.controlled || this.spying;
	}

	static patchState(state) {
		state = Object.assign({}, this.state, state);
		this.state = state;
	}
}
