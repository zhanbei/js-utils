//

const UNITS_1000 = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const UNITS_1024 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const UNITS_CN = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

// @see https://duckduckgo.com/?q=js+readable+filesize&ia=web&iax=qa
const getReadableFileSize = (bytes: number, si?: boolean): string => {
	bytes = +bytes;
	const thresh = si ? 1000 : 1024;
	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}
	// const units = si ? UNITS_1000 : UNITS_1024;
	const units = UNITS_CN;
	let u = -1;
	do {
		bytes /= thresh;
		++u;
	} while (Math.abs(bytes) >= thresh && u < units.length - 1);
	return bytes.toFixed(2) + ' ' + units[u];
};

const getFilePlainName = (name: string): string => {
	const index = name.lastIndexOf('.');
	return index < 0 ? name : name.substr(0, index);
};

export const ReadableFile = {
	getReadableFileSize,
	getFilePlainName,
};
