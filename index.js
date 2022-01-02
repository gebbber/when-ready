const waiters = {};

module.exports = (waiter, options={test:false}) => {
    
    const inst = waiter || ''; //permissible object key name

    if (!waiters[inst]) waiters[inst] = {callbacks: [], ready: {}, pointer: null, startTime: Date.now()};
    
    return (process) => {

        if (typeof process === 'string') {
            
            // new process that can be ready or not ready; defaults to notReady; return ready(), notReady()
            if (typeof waiters[inst].ready[process] === 'undefined') {
                waiters[inst].ready[process] = false;
                if (options.test) console.log('  ', elapsed(waiters[inst].startTime),`added process '${process}' (not ready) to waiter '${inst}'`);
            } else if (options.test) console.log('  ', elapsed(waiters[inst].startTime),`process '${process}' referred to again in separate location`);
                
            return {
                ready: () => {
                    waiters[inst].ready[process] = true;
                    if (options.test) console.log('  ', elapsed(waiters[inst].startTime), `process '${process}' of waiter '${inst}' explicitly set 'ready'`);
                },
                notReady: () => {
                    waiters[inst].ready[process] = false;
                    if (options.test) console.log('  ', elapsed(waiters[inst].startTime), `process '${process}' of waiter '${inst}' explicitly set 'notReady'`);
                }
            }

        } else return {
            
            whenReady: (callback) => {

                if (typeof callback === 'function') waiters[inst].callbacks.push(callback);
                if (options.test) console.log('  ', elapsed(waiters[inst].startTime), `added a callback to waiter '${inst}'`);
                
                if (!waiters[inst].pointer && waiters[inst].callbacks.length)
                    waiters[inst].pointer = setInterval(()=>checkReadyState(inst), 0);

            }

        }

    }

}

function checkReadyState(inst) {
    let readyState = true;
    for (const process in waiters[inst].ready) readyState = readyState && waiters[inst].ready[process];
    if (readyState) (waiters[inst].callbacks.shift())();
    if (!waiters[inst].callbacks.length) clearInterval(waiters[inst].pointer);
}

function elapsed(startTime) {
    const ms = (Date.now()) - startTime;
    const s = Math.floor(ms/1000);
    return `${s}.${pad(ms-1000*s,3)} sec:`;
}

function pad(n,digits) {
    let st = n.toString();
    while (st.length < digits) st = '0' + st;
    return st;
}