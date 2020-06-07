//

import {getReadableIntervalTime} from './IntervalTimeUtil';

const addLeadingZeros = (v: number, size: number): string => {
	const s = '000000000' + v;
	return s.substr(s.length - size);
};

const formatAsMonthDay = (timestamp: string | number | Date, seperator: string = '-') => {
	const d = new Date(timestamp);
	return `${addLeadingZeros(d.getMonth() + 1, 2)}${seperator}${addLeadingZeros(d.getDate(), 2)}`;
};

const formatAsHourMinute = (timestamp: string | number | Date, seperator: string = ':') => {
	const d = new Date(timestamp);
	return `${addLeadingZeros(d.getHours(), 2)}${seperator}${addLeadingZeros(d.getMinutes(), 2)}`;
};

const getReadableUsedTime = (usedTimeInMillisecond: number): string => {
	const usedTime = Math.floor(usedTimeInMillisecond / 1000);
	const min = Math.floor(usedTime / 60);
	return `${min ? min + '分' : ''}${usedTime % 60}秒`;
};

export const ReadableDate = {
	addLeadingZeros,

	formatAsMonthDay, formatAsHourMinute,

	getReadableUsedTime,
	getReadableIntervalTime,
};