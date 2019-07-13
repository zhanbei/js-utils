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

exports.loadStyle = (styleUrl) => {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.async = true;
		link.onload = resolve;
		link.onerror = reject;
		link.href = styleUrl;
		document.getElementsByTagName('head')[0].appendChild(link);
	});
};
