'use strict';

const fs = require('fs');
const input = fs.readFileSync('input.txt');

const inputLines = input.split('\n');

let rules = [];
let updates = [];

let currLine = 0;

for (currLine; currLine < lines.length; currLine++) {
    if (lines[currLine].includes('|')) {
        rules.push(lines[currLine]);
    } else {
        break;
    }
}

for (currLine; currLine < lines.length; currLine++) {
    if (!lines[currLine].trim()) continue; //This helps avoiding empty lines wich may cause problems
    updates.push(lines[currLine]);
}

let ruleMap = {};

//guardamos rules así rulemap[5] = [1,2,3,4] ---> 5 debe ir después de 1,2,3,4.
for (const rule of rules) {
    const [x, y] = rule.split('|').map(Number);
    if (!ruleMap[x]) ruleMap[x] = [];
    ruleMap[x].push(y);
}

let parsedUpdates = []

for (let i = 0; i < updates.length; i++){
    updates[i] = updates[i].split(',');
}

const result = processUpdates(rulemap, updates);

function processUpdates(rulemap, updates){
    //la idea es ir chequeando si las updates respetan las rules (antes|después) chequeando que ningún después aparezca antes que un antes o viceversa
}