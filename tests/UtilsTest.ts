'use strict';

import * as assert from 'assert';
import {IConsoleLogger, newConsoleLogger} from '../ConsoleLogger';
import {waitForALittleWhile} from '../ClockUtil';
import {getReadableIntervalTime} from '../IntervalTimeUtil';
import {EventListener} from '../EventListener';

const ConsoleLogger = newConsoleLogger();
ConsoleLogger.setMinLoggingLevel(ConsoleLogger.LoggerVerbose);
const StrictConsoleLogger = newConsoleLogger();
StrictConsoleLogger.setMinLoggingLevel(StrictConsoleLogger.LoggerWarning);

const logger = new ConsoleLogger('Testing');

function testClockUtil() {
	waitForALittleWhile(() => Math.random() > 0.1, 500, 5, () => logger.log('Waiting')).then(() => {
		logger.info('Finished');
	}).catch((ex: any) => {
		logger.alert('Waiting for clock timed out!', ex);
	});
}

function testIntervalTimeUtil() {
	const test = (interval: number, expected: string) => {
		assert.strictEqual(getReadableIntervalTime(interval), expected, `Unexpected human-readable string: [${expected}] from given interval: [${interval}].`);
	};
	// assert.strictEqual('a', 'b', 'Passing a failed condition to test the assert functionality.');
	test(10, '10 Seconds');
	test(60, '1 Minute');
	test(65, '1 Minute and 5 Seconds');
	test(301, '5 Minutes and 1 Second');
	test(600, '10 Minutes');
	test(610, '10 Minutes and 10 Seconds');
	test(32320, '8 Hours and 58 Minutes');
	test(132890, '1 Day and 12 Hours');
	test(143920890, '4 Years and 7 Months');
	test(13234232890, '425 Years and 5 Months');
}

const testEventListener = () => {
	const listener = new EventListener<string>();
	listener.addListener((param: any) => logger.log('Event being triggered for a permanent listener!', param));
	listener.addTempListener((param: any) => logger.log('Event being triggered for a temporary listener!', param));
	listener.addListener((param: any) => logger.log('Event being triggered for another permanent listener!', param));
	listener.addTempListener((param: any) => logger.log('Event being triggered for another temporary listener!', param));
	listener.triggerEvent('first event!');
	listener.triggerEvent('second event!');
};

const testLoggers = () => {
	const vl = new ConsoleLogger('Verbose Logger');
	const sl = new StrictConsoleLogger('Strict Logger');
	const event = 'A event to print in different logging levels.';
	const printInDifferentLoggingLevels = (logger: IConsoleLogger, event: string) => {
		logger.log(event);
		logger.debug(event);
		logger.info(event);
		logger.warn(event);
		logger.error(event);
		logger.alert(event);
	};
	printInDifferentLoggingLevels(vl, event);
	printInDifferentLoggingLevels(sl, event);
};

testClockUtil();
testIntervalTimeUtil();
testEventListener();
testLoggers();
