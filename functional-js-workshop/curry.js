'use strict'

function curryN(fn, n){
    n = n || fn.length;

    function curried(prevArgs){
        return function(){
            let currArgs = prevArgs.concat(Array.prototype.slice.call(arguments));
            if(currArgs.length >= n){
                return fn.apply(this, currArgs);
            }else{
                return curried(currArgs);
            }
        }
    }

    return curried([]);
}

module.exports = curryN;