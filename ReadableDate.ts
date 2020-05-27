//


const addLeadingZeros = (v: number, size: number): string => {
	const s = '000000000' + v;
	return s.substr(s.length - size);
};

const getReadableUsedTime = (usedTimeInMillisecond: number): string => {
	const usedTime = Math.floor(usedTimeInMillisecond / 1000);
	const min = Math.floor(usedTime / 60);
	return `${min ? min + '分' : ''}${usedTime % 60}秒`;
};

export const ReadableDate = {
	addLeadingZeros,
	getReadableUsedTime,
};