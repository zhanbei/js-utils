'use strict';

let mSelectionEnabledSwitch = true;
let mDocumentOnSelectStart = document.onselectstart;
const mNoDocumentSelection = () => false;

const enableTextSelection = () => {
	if (mSelectionEnabledSwitch) {return;}
	mSelectionEnabledSwitch = true;
	document.onselectstart = mDocumentOnSelectStart;
};

const disableTextSelection = () => {
	if (!mSelectionEnabledSwitch) {return;}
	mSelectionEnabledSwitch = false;
	mDocumentOnSelectStart = document.onselectstart;
	document.onselectstart = mNoDocumentSelection;
};

/**
 * The utils for the document.onselectstart to disable/enable text selection in a web page.
 * @see https://stackoverflow.com/questions/16805684/javascript-disable-text-select
 *
 * @type {{enableSelection: function, disableSelection: function}}
 */
module.exports = {
	enableTextSelection, disableTextSelection,
};
