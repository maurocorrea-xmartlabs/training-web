'use strict'

var promise = new Promise(function (fullfill, reject) {
    fullfill('I FIRED');
    reject(new Error ('I DID NOT FIRED'));
});

function onRejected(error){
    console.log(error.message);
}

promise.then(console.log, onRejected);