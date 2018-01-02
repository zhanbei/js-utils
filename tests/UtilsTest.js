'use strict';

const ClockUtils = require('./../ClockUtils');
const ErrorUtils = require('./../ErrorUtils');

ClockUtils.waitForALittleWhile(() => true, 1500, 6, () => console.log('Waiting')).then(() => {
	console.log('Finished');
}).catch(ex => ErrorUtils.handleError('', ex));

