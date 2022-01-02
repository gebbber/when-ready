const {ready, notReady} = require('..')()('process1');

notReady();

setTimeout(() => {
    ready();
}, 1500); //ready after 1.5 seconds