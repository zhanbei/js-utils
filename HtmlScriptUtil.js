'use strict';

// Load and execute a script in a html document asynchronously.
// @see https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
exports.loadAndExecuteScript = (scriptUrl, callback) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.onload = callback;
	script.src = scriptUrl;
	document.getElementsByTagName('head')[0].appendChild(script);
};

// @see #exports.loadAndExecuteScript();
exports.loadStyleAsynchronously = (styleUrl, callback) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.async = true;
	link.onload = callback;
	link.href = styleUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
};
