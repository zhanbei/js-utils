//

let mHint = 'Confirm to leave this page?';

export const setExitPageReminder = (hint?: string) =>
	hint ? mHint = hint : undefined;

export const enableExitPageReminder = () =>
	window.onbeforeunload = () => mHint;
enableExitPageReminder();

export const disableExitPageReminder = () =>
	window.onbeforeunload = null;
