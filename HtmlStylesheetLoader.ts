'use strict';

// @see #HtmlScriptLoader.loadAndExecuteScript();
export const loadStyleAsynchronously = (styleUrl: string, callback: (...params: any[]) => any, onError?: (...params: any[]) => any) => {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	// link.async = true;
	link.onload = callback;
	if (onError) {link.onerror = onError;}
	link.href = styleUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
};

export const loadStyle = (styleUrl: string) => new Promise((resolve, reject) => {
	loadStyleAsynchronously(styleUrl, resolve, reject);
});
