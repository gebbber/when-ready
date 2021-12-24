const {ready} = require('..')('process2');

// notReady(); is optional

setTimeout(() => {
    ready();
}, 3000); //ready after 3 seconds