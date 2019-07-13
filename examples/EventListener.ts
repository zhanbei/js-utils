'use strict';

import {EventListener} from '../EventListener';

const mEventListener = new EventListener();

mEventListener.addListener(() => {
	console.log('A permanent event is triggered.');
});

mEventListener.addTempListener(() => {
	console.log('A temp event is triggered.');
});


mEventListener.triggerEvent();

mEventListener.addListener(() => {
	console.log('Another temp event is triggered.');
}, true);

mEventListener.triggerEvent();
mEventListener.triggerEvent();
