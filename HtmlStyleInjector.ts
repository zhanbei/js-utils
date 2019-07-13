'use strict';

// @see https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
export const injectStyle = (css: string) => {
	const head = document.head || document.getElementsByTagName('head')[0];
	const style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
};
