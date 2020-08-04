//

import {getReadableIntervalTime} from './IntervalTimeUtil';

type ParamDate = number | string | Date | undefined;
const newDate = (date: ParamDate): Date =>
	date ? new Date(date) : new Date();

const addLeadingZeros = (v: number, size: number): string => {
	const s = '000000000' + v;
	return s.substr(s.length - size);
};

const formatAsMonthDay = (date?: ParamDate, seperator: string = '-') => {
	const d = newDate(date);
	return `${addLeadingZeros(d.getMonth() + 1, 2)}${seperator}${addLeadingZeros(d.getDate(), 2)}`;
};

const formatAsHourMinute = (date?: ParamDate, seperator: string = ':') => {
	const d = newDate(date);
	return `${addLeadingZeros(d.getHours(), 2)}${seperator}${addLeadingZeros(d.getMinutes(), 2)}`;
};

const getReadableMonthDay = (date?: ParamDate, month: string = '月', day: string = '月') => {
	const d = newDate(date);
	return `${d.getMonth() + 1}${month}${d.getDate()}${day}`;
};

const getReadableMonthDayHourMinute = (date?: ParamDate, month: string = '月', day: string = '月') => {
	const d = newDate(date);
	return `${d.getMonth() + 1}${month}${d.getDate()}${day} ${addLeadingZeros(d.getHours(), 2)}:${addLeadingZeros(d.getMinutes(), 2)}`;
};

const getReadableUsedTime = (usedTimeInMillisecond: number): string => {
	const usedTime = Math.floor(usedTimeInMillisecond / 1000);
	const min = Math.floor(usedTime / 60);
	return `${min ? min + '分' : ''}${usedTime % 60}秒`;
};

export const ReadableDate = {
	addLeadingZeros,

	formatAsMonthDay, formatAsHourMinute,
	getReadableMonthDay, getReadableMonthDayHourMinute,

	getReadableUsedTime,
	getReadableIntervalTime,
};