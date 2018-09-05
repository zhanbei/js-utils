'use strict';

// Different levels of logging.
// @see https://logging.apache.org/log4j/2.x/manual/customloglevels.html
const LoggerVerbose = {
	level: 0,
	tag: 'VERBOSE',
	logger: console.log,
};
const LoggerDebug = {
	level: 1,
	tag: ' DEBUG ',
	logger: console.info,
};
const LoggerInfo = {
	level: 2,
	// Some important information to be logged out.
	tag: ' INFOR ',
	logger: console.info,
};
const LoggerWarning = {
	level: 3,
	tag: 'WARNING',
	logger: console.warn,
};
const LoggerError = {
	level: 4,
	tag: ' ERROR ',
	logger: console.error,
};
const LoggerSilent = {
	level: 5,
	tag: 'SILENT',
	logger: null,
};

// All valid loggers with their levels being set from 0 to 5 in order of [0, 1, 2, 3, 4, 5].
const LOGGERS = [LoggerVerbose, LoggerDebug, LoggerInfo, LoggerWarning, LoggerWarning, LoggerSilent];

module.exports = () => class ConsoleLogger {
	static LoggerDebug = LoggerDebug;
	static LoggerInfo = LoggerInfo;
	static LoggerWarning = LoggerWarning;
	static LoggerError = LoggerError;
	static LoggerSilent = LoggerSilent;
	// Use the verbose logger by default.
	static CurrentLoggerLevel = LoggerVerbose.level;

	constructor(tag) {
		this.mTag = tag;
	}

	mTag = 'Logger';

	// Set level of logging; level may be one of [0, 1, 2, 3, 4, 5].
	static setMinLoggingLevel(level) {
		if (level.level) {level = level.level;}
		const logger = LOGGERS.find(logger => logger.level === level) || LoggerVerbose;
		ConsoleLogger.CurrentLoggerLevel = logger.level;
	};

	// @see https://developer.mozilla.org/en-US/docs/Web/API/console
	_log(logger, ...msgs) {
		if (logger.level < ConsoleLogger.CurrentLoggerLevel) {return;}
		logger.logger('-> [%s] [%s] [#%s]', new Date().toLocaleTimeString(), logger.tag, this.mTag, ...msgs);
	}

	log(...msgs) {
		this._log(LoggerVerbose, ...msgs);
	}

	debug(...msgs) {
		this._log(LoggerDebug, ...msgs);
	}

	info(...msgs) {
		this._log(LoggerInfo, ...msgs);
	}

	warn(...msgs) {
		this._log(LoggerWarning, ...msgs);
	}

	error(...msgs) {
		this._log(LoggerError, msgs);
	}
};
