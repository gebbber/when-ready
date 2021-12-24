const ready = {};
const callbacks = [];
let pointer = null;
let test = false;
const startTime = Date.now();

module.exports = (arg) => {

    const processName = (arg && typeof arg === 'string') ? arg : undefined;
    if (arg && arg.test) test = true;
        
    if (processName && typeof processName === 'string') {

        // Set up a new process, 'processName', and return ready/notReady functions
        if (typeof ready[processName] === 'undefined') {
            ready[processName] = false;
            if (test) console.log('  ', elapsed(),'added',processName,'(not ready)');
        } else if (test) console.log('  ', elapsed(),processName, 'referred to again in separate module');
            

        return {
            ready: () => {
                ready[processName] = true;
                if (test) console.log('  ', elapsed(), processName+": explicitly set 'ready'");
            },
            notReady: () => {
                ready[processName] = false;
                if (test) console.log('  ', elapsed(), processName+": explicitly set 'not ready'");
            }
        };

    } else {


        return {
            whenReady: (callback) => {
                if (callback && typeof callback === 'function') {
                    
                    callbacks.push(callback);
                    if (test) console.log('  ', elapsed(), 'added a callback');

                    if (!pointer && callbacks.length) pointer = setInterval(checkReadyState, 0);

                }

            }
        }

    }
}

function checkReadyState() {

    let readyState = true;

    for (const process in ready) readyState = readyState && ready[process];

    if (readyState) (callbacks.shift())();

    if (!callbacks.length) clearInterval(pointer);
    
}

function elapsed() {
    const ms = (Date.now()) - startTime;
    const s = Math.floor(ms/1000);
    return `${s}.${pad(ms-1000*s,3)} sec:`;
}

function pad(n,digits) {
    let st = n.toString();
    while (st.length < digits) st = '0' + st;
    return st;
}