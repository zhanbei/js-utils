'use strict';

const ClockUtils = require('../ClockUtil');
const ErrorUtils = require('../ErrorUtil');
const ReadableIntervalUtil = require('../IntervalTimeUtil');


function testClockUtil() {
	ClockUtils.waitForALittleWhile(() => true, 1500, 6, () => console.log('Waiting')).then(() => {
		console.log('Finished');
	}).catch(ex => ErrorUtils.handleError('', ex));
}

function testIntervalTimeUtil() {
	console.log(ReadableIntervalUtil.getReadableIntervalTime(10));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(60));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(65));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(301));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(600));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(610));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(32320));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(132890));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(143920890));
	console.log(ReadableIntervalUtil.getReadableIntervalTime(13234232890));
}

testClockUtil();
testIntervalTimeUtil();
