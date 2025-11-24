'use strict';
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

const parsedData = parseData(data); //parseamos data a un array con los dos arrays de números

let result = 0;
for (let i=0; i<parsedData[0].length; i++){ //vamos recorriendo los arrays ordenados ascendentemente a la par y sumando las diferencias
    const id1 = parsedData[0][i];
    const id2 = parsedData[1][i];
    result+= Math.abs(id1 - id2);
}


fs.writeFileSync('output.txt', String(result));

function parseData(data){
    let parsedData = data.split('\n').map(str => str.split('   '));
    const firstArray = [];
    const secondArray = [];
    for(const elem of parsedData){ //vamos poniendo los datos en 2 arrays distintos para poder ordenarlos
        firstArray.push(Number(elem[0]));
        secondArray.push(Number(elem[1]));
    }
    parsedData = [firstArray.sort(), secondArray.sort()];
    return parsedData;
}