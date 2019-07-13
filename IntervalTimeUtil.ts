'use strict';

// Connect b to the end of a while b is not null.
const connect = (a: string, b: string) => b ? `${a} and ${b}` : a;
const addUnit = (value: number, unit: string) => value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;

// Get the human readable string from a interval time, which consists of (max)two different
//  units(seconds/minutes/hours/days/...), like:
// - 10 -> 10 Seconds
// - 60 -> 1 Minute
// - 65 -> 1 Minute and 5 Seconds
// - 301 -> 5 Minutes and 1 Second
// - 600 -> 10 Minutes
// - 610 -> 10 Minutes and 10 Seconds
// - 32320 -> 8 Hours and 58 Minutes
// - 132890 -> 1 Day and 12 Hours
// - 143920890 -> 4 Years and 7 Months
// - 13234232890 -> 425 Years and 5 Months
export const getReadableIntervalTime = (value: number) => {
	const seconds = value % 60 === 0 ? '' : addUnit(value % 60, 'Second');
	value = Math.floor(value / 60);
	if (value <= 0) {return seconds;}

	// Has non-zero minutes.
	const minutes = value % 60 === 0 ? '' : addUnit(value % 60, 'Minute');
	value = Math.floor(value / 60);
	if (value <= 0) {return connect(minutes, seconds);}

	// Has non-zero hours.
	const hours = value % 24 === 0 ? '' : addUnit(value % 24, 'Hour');
	value = Math.floor(value / 24);
	if (value <= 0) {
		return connect(hours, minutes);
	}

	// Has non-zero days.
	const days = value % 30 === 0 ? '' : addUnit(value % 30, 'Day');
	value = Math.floor(value / 30);
	if (value <= 0) {
		return connect(days, hours);
	}

	// Has non-zero months.
	const months = value % 12 === 0 ? '' : addUnit(value % 12, 'Month');
	value = Math.floor(value / 12);
	if (value <= 0) {return connect(months, days);}

	// Has non-zero years.
	const years = addUnit(value, 'Year');
	return connect(years, months);
};