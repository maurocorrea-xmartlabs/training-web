'use strict'

var promise = new Promise(function (fullfill, reject) {     
    setTimeout(function () {
        fullfill('FULFILLED!')
    }, 300);
});

promise.then(console.log);