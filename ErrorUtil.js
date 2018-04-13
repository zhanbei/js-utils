'use strict';

/**
 * Print exception with tag and alert user if in the browser runtime.
 *
 * @param errorTag{string} Error tag or detail
 * @param ex{object|null} Extra exception detail to print to stdout.
 */
exports.handleError = (errorTag, ex) => {
	console.error(errorTag, ex);
	if (typeof alert === 'function') {alert(errorTag);}
};
