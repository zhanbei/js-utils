'use strict';

// The typed event listener class to listen and trigger events.
//
// Supporting up to 3 params triggered as values.
//
// type ListenerCallback = Function;
// type Listener_Callback = ((...params: [T, T2, T3]) => any)
export class EventListener<T = void, T2 = void, T3 = void> {
	private mListeners: ((...params: [T, T2, T3]) => any)[] = [];
	private mTempListeners: ((...params: [T, T2, T3]) => any)[] = [];

	constructor() {
		['addListener', 'addTempListener', 'removeListener', 'triggerEvent'].map(method => this[method] = this[method].bind(this));
	}

	addListener(listener: ((...params: [T, T2, T3]) => any), isTempListener?: boolean) {
		if (isTempListener) {
			this.mTempListeners.push(listener);
		} else {
			this.mListeners.push(listener);
		}
	}

	addTempListener(listener: ((...params: [T, T2, T3]) => any)) {
		return this.addListener(listener, true);
	}

	removeListener(listener: ((...params: [T, T2, T3]) => any)) {
		let index = this.mListeners.indexOf(listener);
		if (index > -1) {this.mListeners.splice(index, 1);}
	}

	// Trigger the listeners with the received params.
	triggerEvent(...params: [T, T2, T3]) {
		this.mListeners.map(listener => listener && listener(...params));
		const temp = this.mTempListeners;
		this.mTempListeners = [];
		temp.map(listener => listener && listener(...params));
	}
}
