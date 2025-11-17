'use strict'

function onRejected(error){
    console.log(error.message);
}

var promise1 = new Promise(function (fulfill, reject) {
    throw new Error('ERROR TO PRINT');
}).catch(function (err) {
    console.log(err.message)
})

var promise2 = Promise.resolve(console.log('RESOLVED'));

function onReject(err){
    console.log(err.message)
}
var promise3 = Promise.reject(new Error ('REJECTED'));
promise3.catch(onReject)

