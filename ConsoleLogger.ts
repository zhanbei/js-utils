'use strict';

// Different levels of logging.
// @see https://logging.apache.org/log4j/2.x/manual/customloglevels.html
interface ILogger {
	level: number;
	tag: string;
	print?: (...params: any[]) => any;
}

const newLogger = (level: number, tag: string, print: () => any): ILogger => ({level: level, tag: tag, print: print});

const LoggerVerbose = newLogger(0, 'VERBOSE', console.log);
const LoggerDebug = newLogger(1, ' DEBUG ', console.log);
const LoggerInfo = newLogger(2, ' INFOR ', console.log);
const LoggerWarning = newLogger(3, 'WARNING', console.log);
const LoggerError = newLogger(4, ' ERROR ', console.log);
const LoggerSilent = newLogger(5, 'SILENT', console.log);

// All valid loggers with their levels being set from 0 to 5 in order of [0, 1, 2, 3, 4, 5].
const LOGGERS = [LoggerVerbose, LoggerDebug, LoggerInfo, LoggerWarning, LoggerError, LoggerSilent];

export const newConsoleLogger = () => class ConsoleLogger {
	static LoggerVerbose = LoggerVerbose;
	static LoggerDebug = LoggerDebug;
	static LoggerInfo = LoggerInfo;
	static LoggerWarning = LoggerWarning;
	static LoggerError = LoggerError;
	static LoggerSilent = LoggerSilent;
	// Use the verbose logger by default.
	static CurrentLoggerLevel = LoggerVerbose.level;

	mTag: string;

	constructor(tag = 'DefaultLogger') {
		this.mTag = tag;
	}

	// Set level of logging; level may be one of [0, 1, 2, 3, 4, 5].
	static setMinLoggingLevel(param: number | ILogger) {
		const level = typeof param === 'object' ? param.level : param;
		const logger = LOGGERS.find(logger => logger.level === level) || LoggerError;
		ConsoleLogger.CurrentLoggerLevel = logger.level;
	};

	// @see https://developer.mozilla.org/en-US/docs/Web/API/console
	_log(logger: ILogger, ...msgs: any[]) {
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
		this._log(LoggerError, notice, ...msgs);
		if (typeof alert === 'function') {alert(notice);}
	}
};
