'use strict'
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

const parsedData = parseData(data); //parseamos data a un array con los dos arrays de números

let result = 0;
for(let i = 0; i<parsedData[0].length; i++){ //vamos chequeando cuantas veces aparece cada número de la izquierda en el array de la derecha
    let currentValue1 = parsedData[0][i];
    let counter = 0;
    for (let j = 0; j<parsedData[1].length; j++){
        let currentValue2 = parsedData[1][j];
        if(currentValue1 === currentValue2){
            counter++;
        }
    }
    result+= currentValue1 * counter;
}

console.log(result);

fs.writeFileSync('output.txt', String(result));

function parseData(data){ //Ponemos todos los datos dentro de dos arrays adentro de un array [[1,2,3,...],[1,2,3,...]]
    let parsedData = data.split('\n').map(str => str.split('   '));
    const firstArray = [];
    const secondArray = [];
    for(const elem of parsedData){
        firstArray.push(Number(elem[0]));
        secondArray.push(Number(elem[1]));
    }
    parsedData = [firstArray, secondArray];
    return parsedData;
}