//

type ParamDate = number | string | Date | undefined;
const newDate = (date: ParamDate): Date =>
	date ? new Date(date) : new Date();

// Get the total minutes elapsed of a day according to local time.
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const getMinutesOfDay = (d: Date): number =>
	d.getHours() * 60 + d.getMinutes();

// Get the total minutes elapsed of a day according to universal time.
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay
const getUTCMinutesOfDay = (d: Date): number =>
	d.getUTCHours() * 60 + d.getUTCMinutes();

const MINUTE_MILLISECONDS = 60 * 1000;
const DAY_MILLISECONDS = 24 * 3600 * 1000;

// Get the number ID of a day.
const getDayId = (date?: ParamDate): number => {
	const d = newDate(date);
	const nd = new Date(+d - d.getTimezoneOffset() * MINUTE_MILLISECONDS);
	nd.setUTCHours(0, 0, 0, 0);
	return Math.floor(+nd / DAY_MILLISECONDS);
};

// Get the number ID of a UTC day.
const getUTCDayId = (date?: ParamDate): number => {
	const d = newDate(date);
	d.setUTCHours(0, 0, 0, 0);
	return Math.floor(+d / DAY_MILLISECONDS);
};

// Get the UTC date from given dayId.
// Tue Jun 16 2020 00:00:00 GMT+0800 (China Standard Time)
const fromDayId = (dayId: number): Date =>
	new Date(dayId * DAY_MILLISECONDS + new Date().getTimezoneOffset() * MINUTE_MILLISECONDS);

// Get the UTC date from given dayId.
// Tue Jun 16 2020 08:00:00 GMT+0800 (China Standard Time)
const fromUTCDayId = (dayId: number): Date =>
	new Date(dayId * DAY_MILLISECONDS);

// Get the first day of the week, when the first day of a week is monday.
// @see https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
const getMonday = (date?: ParamDate): Date => {
	const d = newDate(date);
	d.setDate(d.getDate() - (d.getDay() || 7) + 1);
	return d;
};

// Get a number as week ID // -- use the monday ID as the week ID.
// Thu Jan 01 1970 08:00:00 GMT+0800 (China Standard Time)
const getWeekId = (date?: ParamDate): number =>
	Math.floor((getDayId(getMonday(date)) + 3) / 7);

// Get the UTC date of monday from given weekId.
const fromWeekId = (weekId: number): Date =>
	fromDayId(weekId * 7 - 3);

export const DateUtil = {
	getMinutesOfDay,
	getUTCMinutesOfDay,

	MINUTE_MILLISECONDS,
	DAY_MILLISECONDS,

	getDayId,
	getUTCDayId,
	fromDayId,
	fromUTCDayId,
	getMonday,
	getWeekId,
	fromWeekId,
};