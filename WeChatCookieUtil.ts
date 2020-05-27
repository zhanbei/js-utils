//

const ckutil = require('js-cookie');

window['_js-cookie'] = ckutil;
// up = User Preferences
const getCookieKey = (key: string) => '_wxck_' + key;
const getCookie2Key = (key: string) => '_wx2ck_' + key;

const doSet = (key: string, value: string) => {
	const options = {path: '/'};
	ckutil.set(getCookieKey(key), value, options);
	ckutil.set(getCookie2Key(key), value, options);
};
const doGet = (key: string): string | undefined => {
	const a = ckutil.get(getCookieKey(key));
	if (a) {
		doSet(key, a);
		return a;
	}
	const b = ckutil.get(getCookie2Key(key));
	if (b) {doSet(key, b);}
	return b;
};

const doStashPatch = (key: string, patch: object) => {
	doSet(key, JSON.stringify(patch));
};
const getStashedPatch = (key: string): object | undefined => {
	const value = doGet(key);
	if (!value || !value.startsWith('{')) {return;}
	return JSON.parse(value);
};

export const WeChatCookieUtil = {
	doGet, doSet,
	doStashPatch,
	getStashedPatch,
};
