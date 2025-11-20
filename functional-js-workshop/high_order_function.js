'use strict'

//Versión recursiva
function repeat(operation, num){
    if(num > 0){
        operation;
        repeat(operation, num - 1);
    }
}

//Versión no recursiva (usando loop)
function repeatNoRec(operation, num){
    for(let i = 0; i < num; i++){
        operation;
    }
}

module.exports = repeat;