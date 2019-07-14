'use strict';

// Different levels of logging.
// @see https://logging.apache.org/log4j/2.x/manual/customloglevels.html
interface ILogger {
	level: number;
	tag: string;
	print?: Function;
}

let _id = 0;
const newLogger = (tag: string, print?: Function): ILogger => ({level: _id++, tag: tag, print: print});

// Consider to export all these default logger.
const LoggerVerbose = newLogger('VERBOSE', console.log);
const LoggerDebug = newLogger(' DEBUG ', console.info);
const LoggerInfo = newLogger(' INFOR ', console.info);
const LoggerWarning = newLogger('WARNING', console.warn);
const LoggerError = newLogger(' ERROR ', console.error);
const LoggerAlert = newLogger(' ALERT ', console.error);
const LoggerSilent = newLogger('SILENT', undefined);

export interface IConsoleLogger {
	// Declare the Static Members
	// @see https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
	// LoggerVerbose: ILogger;
	// LoggerDebug: ILogger;
	// LoggerInfo: ILogger;
	// LoggerWarning: ILogger;
	// LoggerError: ILogger;
	// LoggerSilent: ILogger;
	// CurrentLoggerLevel: number;
	log: Function;
	debug: Function;
	info: Function;
	warn: Function;
	error: Function;
	alert: Function;
}

// Use Case:
// By calling this function, you get a brand-new logger constructor with your own preferences.
// Hence you create your own logger instances with different tags while share the same set of differences.
// Use the verbose logger by default.
export const newConsoleLogger = (loggingLevel: number = LoggerVerbose.level) => class ConsoleLogger implements IConsoleLogger {
	static LoggerVerbose = LoggerVerbose;
	static LoggerDebug = LoggerDebug;
	static LoggerInfo = LoggerInfo;
	static LoggerWarning = LoggerWarning;
	static LoggerError = LoggerError;
	static LoggerAlert = LoggerAlert;
	static LoggerSilent = LoggerSilent;
	static CurrentLoggerLevel = loggingLevel;

	private readonly mTag: string;

	// A tag is required for loggers.
	constructor(tag: string) {
		this.mTag = tag;
	}

	// Set level of logging; level may be one of [0, 1, 2, 3, 4, 5].
	static setMinLoggingLevel(param: number | ILogger) {
		const level = typeof param === 'object' ? param.level : param;
		// All valid loggers with their levels being set in order.
		const LOGGERS = [ConsoleLogger.LoggerVerbose, ConsoleLogger.LoggerDebug, ConsoleLogger.LoggerInfo, ConsoleLogger.LoggerWarning, ConsoleLogger.LoggerError, ConsoleLogger.LoggerAlert, ConsoleLogger.LoggerSilent];
		const logger = LOGGERS.find(logger => logger.level === level);
		if (!logger) {
			console.error('Failed to find the expected logger by the given logging level, hence using the #LoggerError as the preferred logger.');
			ConsoleLogger.CurrentLoggerLevel = LoggerError.level;
		} else {
			ConsoleLogger.CurrentLoggerLevel = logger.level;
		}
	};

	// The overall logging method.
	// A timer printing empty lines may be used to separate noncontinuous events.
	// The continuous events may be grouped together with a same timestamps.
	// @see https://developer.mozilla.org/en-US/docs/Web/API/console
	private _log(logger: ILogger, ...msgs: any[]) {
		if (!logger.print) {return;}
		if (logger.level < ConsoleLogger.CurrentLoggerLevel) {return;}
		logger.print('-> [%s] [%s] [#%s]', new Date().toLocaleTimeString(), logger.tag, this.mTag, ...msgs);
	}

	log(...msgs: any[]) {
		this._log(LoggerVerbose, ...msgs);
	}

	debug(...msgs: any[]) {
		this._log(LoggerDebug, ...msgs);
	}

	info(...msgs: any[]) {
		this._log(LoggerInfo, ...msgs);
	}

	warn(...msgs: any[]) {
		this._log(LoggerWarning, ...msgs);
	}

	error(...msgs: any[]) {
		this._log(LoggerError, ...msgs);
	}

	// Alert the notice(which is the first param of the error messages) and logging out the error messages.
	alert(notice: string, ...msgs: any[]) {
		this._log(LoggerAlert, notice, ...msgs);
		if (typeof alert === 'function') {alert(notice);}
	}
};
