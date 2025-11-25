'use strict';
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

const parsedData = parseData(data); //parse data to a two arrays of numbers

const result = parsedData[0].reduce((accumulator, id1, i) => {
    const id2 = parsedData[1][i];
    return accumulator + Math.abs(id1 - id2);
}, 0);

fs.writeFileSync('output.txt', String(result));

function parseData(data){
    let parsedData = data.split('\n').map(str => str.split('   '));
    const firstArray = parsedData.map((d) => Number(d[0])).sort();
    const secondArray = parsedData.map((d) => Number(d[1])).sort();
    parsedData = [firstArray, secondArray];
    return parsedData;
}