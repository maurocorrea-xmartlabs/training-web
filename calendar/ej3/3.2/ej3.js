'use strict';

const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g; //regex wich matches with mul(X,Y), with both X and Y being 1-3 numbers
const matches = input.match(regex); 
console.log(matches);
let accumulator = 0;
if (matches) {
    let enabled = true;
    for (const elem of matches) {
        if (elem === 'do()'){
            enabled = true
        } else if (elem === "don't()"){
            enabled = false;
        } else if (enabled){
            accumulator += applyMult(elem);
        }
    }
}

fs.writeFileSync('output.txt', String(accumulator));

function applyMult(elem) {
    let parsedString = elem.slice(3).replaceAll('(', '').replaceAll(')', '').split(','); //format mult(X,Y) to [X,Y] wich is easier to multiply
    return parsedString[0] * parsedString[1];
}
