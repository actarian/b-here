import { BehaviorSubject } from 'rxjs';

export default class StateService {
	static state$ = new BehaviorSubject({});
	static set state(state) {
		this.state$.next(state);
	}
	static get state() {
		return this.state$.getValue();
	}
	static patchState(state) {
		state = Object.assign({}, this.state, state);
		this.state = state;
	}
}
