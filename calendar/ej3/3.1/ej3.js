'use strict'

const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
const regex = /mul\(\d{1,3},\d{1,3}\)/g; //regex wich matches with mul(X,Y), with both X and Y being 1-3 numbers
const matches = input.match(regex); 
let accumulator = 0;
if (matches) {
    for (const elem of matches) {
        accumulator += applyMult(elem);
    }
}

fs.writeFileSync('output.txt', String(accumulator));

function applyMult(elem) {
    let parsedString = elem.slice(3).replaceAll('(', '').replaceAll(')', '').split(','); //format mult(X,Y) to [X,Y] wich is easier to process
    return parsedString[0] * parsedString[1];
}
