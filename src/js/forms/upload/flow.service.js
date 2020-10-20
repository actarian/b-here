import { fromEvent, merge, ReplaySubject, Subject } from "rxjs";
import { map, shareReplay, startWith } from "rxjs/operators";

export default class FlowService {

	constructor(options) {
		this.flow = new Flow(options);
		this.flow$ = new ReplaySubject(1);
		this.pauseOrResumeEvent$ = new Subject();
		/*
		this.events$ = this.flow$.pipe(
			switchMap(flow => merge(this.flowEvents(flow), this.customFlowEvents()))
		);
		*/
		this.events$ = merge(this.flowEvents(this.flow), this.customFlowEvents()).pipe(
			shareReplay(1),
		)
		this.transfers$ = this.events$.pipe(
			map(() => this.flow.files),
			map((files = []) => ({
				transfers: files.map(flowFile => flowFile2Transfer(flowFile)),
				flow: this.flow,
				totalProgress: this.flow.progress()
			})),
			shareReplay(1)
		);
		this.hasItems$ = this.transfers$.pipe(
			map(state => state.transfers.some(file => !file.success), startWith(false))
		);
	}

	fromEvent_(target, name) {
		return fromEvent(target, name).pipe(
			map(event => ({ type: name, event })),
		);
	}

	flowEvents(flow) {
		const events = [
			this.fromEvent_(flow, 'fileSuccess'),
			this.fromEvent_(flow, 'fileProgress'),
			this.fromEvent_(flow, 'fileAdded'),
			this.fromEvent_(flow, 'filesAdded'),
			this.fromEvent_(flow, 'filesSubmitted'),
			this.fromEvent_(flow, 'fileRemoved'),
			this.fromEvent_(flow, 'fileRetry'),
			this.fromEvent_(flow, 'fileError'),
			this.fromEvent_(flow, 'uploadStart'),
			this.fromEvent_(flow, 'complete'),
			this.fromEvent_(flow, 'progress')
		];
		return merge(...events);
	}

	customFlowEvents() {
		const pauseOrResumeEvent$ = this.pauseOrResumeEvent$.pipe(
			map(() => ({ type: 'pauseOrResume' })),
		);
		const newFlowInstanceEvent$ = this.flow$.pipe(
			map(() => ({ type: 'newFlowJsInstance' })),
		);
		return merge(pauseOrResumeEvent$, newFlowInstanceEvent$);
	}

	upload() {
		this.flow.upload();
	}

	cancel() {
		this.flow.cancel();
	}

	cancelFile(file) {
		file.flowFile.cancel();
	}

	pauseFile(file) {
		file.flowFile.pause();
		this.pauseOrResumeEvent$.next();
	}

	resumeFile(file) {
		file.flowFile.resume();
		this.pauseOrResumeEvent$.next();
	}

	removeFile(file) {
		this.flow.removeFile(file);
	}

}

export function flowFile2Transfer(flowFile) {
	return {
		id: flowFile.uniqueIdentifier,
		name: flowFile.name,
		progress: flowFile.progress(),
		averageSpeed: flowFile.averageSpeed,
		currentSpeed: flowFile.currentSpeed,
		size: flowFile.size,
		paused: flowFile.paused,
		error: flowFile.error,
		complete: flowFile.isComplete(),
		success: flowFile.isComplete() && !flowFile.error,
		timeRemaining: flowFile.timeRemaining(),
		flowFile
	};
}
