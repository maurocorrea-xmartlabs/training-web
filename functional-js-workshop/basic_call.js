'use strict'

function duckCount(){
    const args = Array.prototype.slice.call(arguments); //convertir arguments a array
    if(args.length == 0){
        return 0;
    }
    const rest = args.slice(1);
    let element = args[0];
    let hasProperty = Object.prototype.hasOwnProperty.call(element, 'quack');

    if (hasProperty){
        return 1 + duckCount.apply(null, rest);
    }else{
        return duckCount.apply(null, rest);
    }
}

module.exports = duckCount;