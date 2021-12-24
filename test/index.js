const test = !(process.argv.length > 2 && process.argv[2] === 'quiet');
const { whenReady } = require('..')({test});

console.log('Starting some long-running processes...');
if (test) console.log("(try 'npm run test-quiet' for cleaner output)");

whenReady(() => {
    console.log('This is callback 1.');
});

whenReady(() => {
    console.log('This is callback 2.');
});

require('./process.js');
require('./process2.js');