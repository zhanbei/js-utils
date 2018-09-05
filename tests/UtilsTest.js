'use strict';

const assert = require('assert');
const newConsoleLogger = require('../ConsoleLogger');
const ConsoleLogger = newConsoleLogger();
ConsoleLogger.setMinLoggingLevel(ConsoleLogger.LoggerVerbose);
const ErrorUtil = require('../ErrorUtil');
const ClockUtils = require('../ClockUtil');
const ReadableIntervalUtil = require('../IntervalTimeUtil');

const logger = new ConsoleLogger('Testing');

function testClockUtil() {
	ClockUtils.waitForALittleWhile(() => Math.random() > 0.1, 500, 5, () => logger.log('Waiting')).then(() => {
		logger.info('Finished');
	}).catch(ex => {
		ErrorUtil.handleError('Waiting for clock timed out!', ex);
		logger.alert('Waiting for clock timed out!', ex);
	});
}

function testIntervalTimeUtil() {
	const test = (interval, expected) => {
		assert.strictEqual(ReadableIntervalUtil.getReadableIntervalTime(interval), expected, `Unexpected human-readable string: [${expected}] from given interval: [${interval}].`);
	};
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

testClockUtil();
testIntervalTimeUtil();
