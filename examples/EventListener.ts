'use strict';

import {EventListener} from '../EventListener';

const mEventListener = new EventListener<string, number>();

mEventListener.addListener(() => {
	console.log('A permanent event is triggered:');
});

mEventListener.addListener((...params) => {
	console.log('A permanent event is triggered:', params);
});

mEventListener.addTempListener((...params) => {
	console.log('A temp event is triggered:', params);
});
mEventListener.addListener((...params) => {
	console.log('Another temp event is triggered:', params);
}, true);

mEventListener.triggerEvent('s1', 1);

mEventListener.triggerEvent('s3', 2);
mEventListener.triggerEvent('s5', 3);
