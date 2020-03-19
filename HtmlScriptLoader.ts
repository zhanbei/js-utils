'use strict';

// Load and execute a script in a html document asynchronously.
// @see https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
export const loadAndExecuteScript = (scriptUrl: string, callback: (...params: any[]) => any, onError?: (...params: any[]) => any) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.onload = callback;
	if (onError) {script.onerror = onError;}
	script.src = scriptUrl;
	document.getElementsByTagName('head')[0].appendChild(script);
};

export const loadScript = (scriptUrl: string) => new Promise((resolve, reject) => {
	loadAndExecuteScript(scriptUrl, resolve, reject);
});
