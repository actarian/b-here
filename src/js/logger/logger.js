import { environment } from '../environment.js';

export const LoggerLevel = {
	NONE: 0,
	ERROR: 1,
	WARN: 2,
	INFO: 3,
	LOG: 4,
	ALL: 5,
};

export class Logger {

	static level_ = LoggerLevel.ALL;

	static setLevel(level) {
		this.level_ = level;
	}

	static getLevel() {
		if (environment.flags.production) {
			return LoggerLevel.ERROR;
		} else {
			return this.level_;
		}
	}

	static error(...args) {
		if (this.getLevel() >= LoggerLevel.ERROR) {
			console.error(...args);
		}
	}

	static warn(...args) {
		if (this.getLevel() >= LoggerLevel.WARN) {
			console.warn(...args);
		}
	}

	static info(...args) {
		if (this.getLevel() >= LoggerLevel.INFO) {
			console.info(...args);
		}
	}

	static log(...args) {
		if (this.getLevel() >= LoggerLevel.LOG) {
			console.log(...args);
		}
	}

}
