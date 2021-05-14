import { BehaviorSubject, Observable, of } from 'rxjs';
import { expand, filter, finalize, map, share, tap, withLatestFrom } from 'rxjs/operators';

const BUFF_SIZE = 512;

export default class AudioStreamService {

	static get context() {
		if (!this.context_ && 'AudioContext' in window) {
			this.context_ = new AudioContext();
		}
		return this.context_;
	}

	/*
	static get processorNode() {
		if (!this.processorNode_) {
			this.processorNode_ = this.context.createScriptProcessor(BUFF_SIZE, 1, 1);
		}
		return this.processorNode_;
	}
	*/

	/*
	static get gain() {
		if (!this.gain_) {
			this.gain_ = this.context.createGain();
		}
		return this.gain_;
	}
	*/

	static get analyser() {
		if (!this.analyser_) {
			try {
				this.analyser_ = this.context.createAnalyser();
			} catch (error) {
				console.log('AudioStreamService.analyser', error);
			};
		}
		return this.analyser_;
	}

	static addSource(streamOrElement) {
		const key = streamOrElement instanceof MediaStream ? streamOrElement.id : streamOrElement;
		if (!this.sources_[key]) {
			if (streamOrElement instanceof MediaStream) {
				this.sources_[key] = this.context.createMediaStreamSource(streamOrElement.clone());
			} else {
				this.sources_[key] = this.context.createMediaElementSource(streamOrElement);
			}
			// this.sources_[key] = streamOrElement instanceof MediaStream ? this.context.createMediaStreamSource(streamOrElement) : this.context.createMediaElementSource(streamOrElement);
		}
		return this.sources_[key];
	}

	static removeSource(streamOrElement) {
		const key = streamOrElement instanceof MediaStream ? streamOrElement.id : streamOrElement;
		return this.removeSourceKey(key);
	}

	static removeSourceKey(key) {
		// console.log('AudioStreamService.removeSourceKey', key);
		let source;
		if (this.sources_[key]) {
			source = this.sources_[key];
			/*
			if (source.mediaStream) {
				source.mediaStream.stop();
			}
			source.stop();
			*/
			if (this.analyser) {
				source.disconnect(this.analyser);
			}
			source.disconnect();
			delete this.sources_[key];
		}
		return source;
	}

	static frequency$(streamOrElement, fftSize = 64) {
		if (fftSize % 2 === 1) {
			throw ('AudioStreamService.error', 'wrong fftSize', fftSize);
		}
		const state = new Uint8Array(fftSize / 2);
		const context = this.context;
		if (context) {
			const analyser = this.analyser;
			if (analyser) {
				// Connect the output of the analyser to the destination
				// analyser.connect(context.destination); // no audio !
				// console.log(analyser.fftSize); // 2048 by default
				// console.log(analyser.frequencyBinCount); // will give us 1024 data points
				analyser.fftSize = fftSize; // 64
				// console.log(analyser.frequencyBinCount); // fftSize/2 = 32 data points
				const source = this.addSource(streamOrElement);
				// source.connect(context.destination); // no audio!
				// Connect the output of the source to the input of the analyser
				source.connect(analyser);
			}
			const state$ = new BehaviorSubject(state);
			return AudioStreamService.frame$.pipe(
				withLatestFrom(state$),
				map(([deltaTime, state]) => {
					if (analyser) {
						// Get the new frequency data
						analyser.getByteFrequencyData(state);
						/*
						const max = state.reduce((p, c, i) => {
							return Math.max(c, p);
						}, 0);
						if (max > 0) {
							// console.log(max);
						}
						*/
						// Update the visualisation
					}
					return state;
				}),
				tap((state) => state$.next(state)),
				finalize(() => {
					this.removeSource(streamOrElement);
				}),
			);
		} else {
			return of(state);
		}
	}

	// unused
	static volume$(streamOrElement) {
		const state = { volume: 0, clipped: false };
		const context = this.context;
		// console.log('AudioStreamService.volume$', context, state);
		if (context) {
			const source = this.addSource(streamOrElement);
			const meter = AudioStreamService.audioMeterCreate();
			source.connect(meter);
			const state$ = new BehaviorSubject(state);
			return AudioStreamService.frame$.pipe(
				withLatestFrom(state$),
				map(([deltaTime, state]) => {
					state.clipped = meter.checkClipping();
					state.volume = meter.volume;
					return state;
				}),
				tap((state) => state$.next(state)),
				finalize(() => {
					this.removeSource(streamOrElement);
				}),
			);
		} else {
			return of(state);
		}
	}

	// unused
	static audioMeterCreate(clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
		const context = this.context;
		if (context) {
			const processor = context.createScriptProcessor(512);
			processor.onaudioprocess = this.audioMeterProcess;
			processor.checkClipping = this.audioMeterClip;
			processor.dispose = this.audioMeterDispose;
			processor.clipping = false;
			processor.lastClip = 0;
			processor.volume = 0;
			processor.clipLevel = clipLevel;
			processor.averaging = averaging;
			processor.clipLag = clipLag;
			// this will have no effect, since we don't copy the input to the output,
			// but works around a current Chrome bug.
			processor.connect(context.destination);
			return processor;
		}
	}

	static audioMeterProcess(event) {
		const buffer = event.inputBuffer.getChannelData(0);
		const bufferLength = buffer.length;
		let sum = 0;
		let x;

		// Do a root-mean-square on the samples: sum up the squares...
		for (let i = 0; i < bufferLength; i++) {
			x = buffer[i];
			if (Math.abs(x) >= this.clipLevel) {
				this.clipping = true;
				this.lastClip = window.performance.now();
			}
			sum += x * x;
		}

		// ... then take the square root of the sum.
		const rms = Math.sqrt(sum / bufferLength);

		// Now smooth this out with the averaging factor applied
		// to the previous sample - take the max here because we
		// want 'fast attack, slow release.'
		this.volume = Math.max(rms, this.volume * this.averaging);
	}

	static audioMeterClip() {
		if (!this.clipping) {
			return false;
		}
		if ((this.lastClip + this.clipLag) < window.performance.now()) {
			this.clipping = false;
		}
		return this.clipping;
	}

	static audioMeterDispose() {
		this.disconnect();
		this.onaudioprocess = null;
	}

	static step$(previous) {
		/**
		 * This function returns an observable that will emit the next frame once the
		 * browser has returned an animation frame step. Given the previous frame it calculates
		 * the delta time, and we also clamp it to 30FPS in case we get long frames.
		 */
		return Observable.create((observer) => {
			requestAnimationFrame((startTime) => {
				// Millis to seconds
				const deltaTime = previous ? (startTime - previous.startTime) / 1000 : 0;
				observer.next({
					startTime,
					deltaTime
				});
			});
		}).pipe(
			map(frame => {
				if (frame.deltaTime > (1 / 30)) {
					frame.deltaTime = 1 / 30;
				}
				return frame;
			})
		);
	}

	static dispose() {
		Object.keys(this.sources_).forEach(key => {
			this.removeSourceKey(key);
		});
		const analyser = this.analyser;
		if (analyser) {
			analyser.disconnect();
		}
		this.sources_ = {};
		// this.context_.close().then(() => console.log('AudioStreamService.dispose'));
		// this.context_ = null;
	}

}

AudioStreamService.sources_ = {};
AudioStreamService.frame$ = of(undefined).pipe(
	expand((value) => AudioStreamService.step$(value)),
	// Expand emits the first value provided to it, and in this
	//  case we just want to ignore the undefined input frame
	filter(frame => frame !== undefined),
	map(frame => frame.deltaTime),
	share()
);
