'use strict'

module.exports = function (args, from, to){
    return Function.prototype.call.call(Array.prototype.slice, args, from, to);
}