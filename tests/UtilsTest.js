'use strict';

const assert = require('assert');
const ClockUtils = require('../ClockUtil');
const ErrorUtils = require('../ErrorUtil');
const ReadableIntervalUtil = require('../IntervalTimeUtil');


function testClockUtil() {
	ClockUtils.waitForALittleWhile(() => true, 1500, 6, () => console.log('Waiting')).then(() => {
		console.log('Finished');
	}).catch(ex => ErrorUtils.handleError('', ex));
}

function testIntervalTimeUtil() {
	const test = (interval, expected) => {
		assert.strictEqual(ReadableIntervalUtil.getReadableIntervalTime(interval), expected, `Unexpected human-readable string: [${expected}] from given interval: [${interval}].`)
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
