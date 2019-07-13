'use strict';

// @see #HtmlScriptLoader.loadAndExecuteScript();
export const loadStyleAsynchronously = (styleUrl: string, callback: (...params: any[]) => any) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	// link.async = true;
	link.onload = callback;
	link.href = styleUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
};

export const loadStyle = (styleUrl: string) => {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		// link.async = true;
		link.onload = resolve;
		link.onerror = reject;
		link.href = styleUrl;
		document.getElementsByTagName('head')[0].appendChild(link);
	});
};
