function all(prom1, prom2){
    var prom = new Promise(function (fulfill, reject) {
        var counter = 0;
        var values = [];
        prom1.then(function (value){
            values.push(value);
            counter++;
            if (counter == 2) fulfill (values);
        })
        prom2.then(function (value){
            values.push(value);
            counter++;
            if(counter == 2) fulfill (values);
        })
    })   
    return prom;
}

all(getPromise1(), getPromise2()).then(console.log);