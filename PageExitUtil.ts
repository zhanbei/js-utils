//

let mHint = 'Confirm to leave this page?';

export const setExitPageReminder = (hint?: string) =>
	hint ? mHint = hint : undefined;

export const enableExitPageReminder = () =>
	window.onbeforeunload = () => mHint;

export const disableExitPageReminder = () =>
	window.onbeforeunload = null;

const enablePageCloseReminder = (hint?: string) => {
	setExitPageReminder(hint);
	enableExitPageReminder();
};

// As for kinds of browsers do not support custom alert on leave site, and even some do not support alert on exit.
// We use a alternative way(routes listening) to achieve the goal to remind users about something important.
const enablePageBackReminder = (
	hint?: string, title: string = document.title, url: string = '#' + Math.random(),
) => {
	const pushHistoryPage = () => {
		const state = {title, url};
		window.history.pushState(state, title, url);
	};

	pushHistoryPage();

	window.addEventListener('popstate', (e) => {
		// e.stopPropagation();
		// e.preventDefault();
		if (!confirm(hint || 'Sure to exit the current page?')) {
			pushHistoryPage();
			return;
		}
	}, false);
};

// Use the all available way to keep the page alive with user's agreement.
const enablePageExitReminder = (hint?: string) => {
	enablePageCloseReminder(hint);
	enablePageBackReminder(hint);
};

export const PageExitUtil = {
	enablePageExitReminder,
	enablePageCloseReminder,
	enablePageBackReminder,
};
