'use strict';

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');

let rules = [];
let updates = [];

let currLine = 0;

//we push both the rules and updates to arrays
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

//we store the rules 'X|Y' as ruleMap[X] = [Y] so we can easily check all values that should come ONLY after X and not before
for (const rule of rules) {
    const [x, y] = rule.split('|').map(Number);
    if (!ruleMap[x]) ruleMap[x] = [];
    ruleMap[x].push(y);
}

//we parse the update strings into arrays of numbers, they're easier to manage in this way
for (let i = 0; i < updates.length; i++) {
    updates[i] = updates[i].split(',').map(Number);
}

const result = processUpdates(ruleMap, updates);
fs.writeFileSync('output.txt', String(result));

//this function process every update by checking the rules of the ruleMap
function processUpdates(ruleMap, updates) {
    let result = 0;
    for (let i = 0; i < updates.length; i++) { //we iterate over updates
        //we iterate over each element in the current update
        let valid = true;
        for (let j = 0; j < updates[i].length; j++) {
            const current = updates[i][j];
            const afterCurrent = ruleMap[current];
            const previousElements = updates[i].slice(0, j);
            //we iterate over every ruleMap element and check if it's in the previous elements of the update (shouldn't be)
            if (afterCurrent) {
                for (let k = 0; k < afterCurrent.length; k++) {
                    //if the previous elements include one that should only come after the current we sort it and start iterating again
                    if (previousElements.length !== 0 && previousElements.includes(afterCurrent[k])) {
                        const indexOfAfter = previousElements.indexOf(afterCurrent[k]);
                        array_move(updates[i], j, indexOfAfter);
                        j = 0;
                        valid = false;
                        break;
                    }
                }
            }
        }
        //add the middle value to the result ONLY if the update is invalid
        if (!valid) {
            var middleValue = updates[i][Math.floor(updates[i].length / 2)];
            result += middleValue;
        }
    }
    return result;
}


function array_move(arr, old_index, new_index) {
    if (new_index < 0) {
        const value = arr[old_index];
        arr.splice(old_index, 1);
        arr.unshift(value);
    } else {
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    }
}
