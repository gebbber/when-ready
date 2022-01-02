// process2 can be referred to in a second file without 

setTimeout(() => {
    const {ready} = require('..')()('process2');
},2500);
