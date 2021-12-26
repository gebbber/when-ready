## General Use:
```javascript
const { whenReady } = require('@gebbber/when-ready')();

// When ready, do two things...
whenReady(() => {
    console.log('This is callback 1.');
});

whenReady(() => {
    console.log('This is callback 2.');
});

// Start some long-running processes...
require('./process.js');
require('./process2.js');
```


## `process1` is ready after 1.5 seconds:
```javascript
// process.js

const {ready, notReady} = require('@gebbber/when-ready')('process1');

notReady();

setTimeout(() => {
    ready();
}, 1500);
```


## `process2` is ready after 3 seconds:
```javascript
// process2.js
const {ready} = require('@gebbber/when-ready.')('process2');

setTimeout(() => {
    ready();
}, 3000); 
```