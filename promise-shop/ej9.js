'use strict'

function parsePromised(json){
    return new Promise(function (fulfill, reject){
        try{
            fulfill(JSON.parse(json));
        }catch (err){
            reject(err.message);
        }
    });
}

var input = process.argv[2];
parsePromised(input).
    then(null, console.log);