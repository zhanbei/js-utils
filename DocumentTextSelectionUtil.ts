'use strict';

declare const document: { onselectstart: any };

let mSelectionEnabledSwitch = true;
let mDocumentOnSelectStart = document.onselectstart;
const mNoDocumentSelection = () => false;

// The utils for the document.onselectstart to disable/enable text selection in a web page.
// @see https://stackoverflow.com/questions/16805684/javascript-disable-text-select
export const enableTextSelection = () => {
	if (mSelectionEnabledSwitch) {return;}
	mSelectionEnabledSwitch = true;
	document.onselectstart = mDocumentOnSelectStart;
};

export const disableTextSelection = () => {
	if (!mSelectionEnabledSwitch) {return;}
	mSelectionEnabledSwitch = false;
	mDocumentOnSelectStart = document.onselectstart;
	document.onselectstart = mNoDocumentSelection;
};
