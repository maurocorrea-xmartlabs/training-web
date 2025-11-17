function attachTitle(arg){
    return 'DR. ' + arg;
}

var promise1 = new Promise(function (fulfill, reject) {
    fulfill('MANHATTAN')
});

promise1
    .then(attachTitle)
    .then(console.log);