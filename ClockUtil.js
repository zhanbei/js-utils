'use strict';

/**
 * Waiting for *isKeepWaitingFunc()===false* for *interval* milliseconds for *times* times,
 * and call *intervalFunc* before each waiting cycle, if it is set.
 *
 * @param isKeepWaitingFunc{function} the keep waiting flag to be checked before each cycle.
 * @param interval{int} milliseconds waited for each cycle.
 * @param times{int} times waited until triggered a timeout promise rejection.
 * @param intervalFunc{function|null} function to be executed before each waiting cycle.
 * @returns {Promise<null>} JavaScript Promise.
 */
exports.waitForALittleWhile = (isKeepWaitingFunc, interval, times, intervalFunc) => {
	return new Promise((resolve, reject) => {
		let i = 0;
		const fn = () => {
			if (isKeepWaitingFunc()) {
				if (i >= times) {
					reject('Timeout');
					return
				}
				if (intervalFunc) {intervalFunc();}
				i++;
				setTimeout(fn, interval || 200);
				return
			}
			resolve();
		};
		fn();
	});
};

