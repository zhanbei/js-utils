'use strict';

// @see #HtmlScriptLoader.loadAndExecuteScript();
exports.loadStyleAsynchronously = (styleUrl, callback) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.async = true;
	link.onload = callback;
	link.href = styleUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
};
