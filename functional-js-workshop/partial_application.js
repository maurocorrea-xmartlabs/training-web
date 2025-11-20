'use strict'

function logger(namespace){
    return function () {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(namespace);
        console.log.apply(null, args);
    }
}

module.exports = logger;