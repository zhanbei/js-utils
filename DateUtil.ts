//

// Get the total minutes elapsed of a day according to local time.
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const getMinutesOfDay = (d: Date): number =>
	d.getHours() * 60 + d.getMinutes();

// Get the total minutes elapsed of a day according to universal time.
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay
const getUTCMinutesOfDay = (d: Date): number =>
	d.getUTCHours() * 60 + d.getUTCMinutes();

export const DateUtil = {
	getMinutesOfDay,
	getUTCMinutesOfDay,
};