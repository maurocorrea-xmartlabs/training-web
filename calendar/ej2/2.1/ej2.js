'use strict'
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = parseData(input);
console.log(input);

let counter = 0;

for (const report of input) {
    const isSafe = checkIfSafe(parseLine(report)); // checking each report to see if it's safe
    if (isSafe) {                                  // if it is, we add 1 to the counter
        counter++;
    }
}

console.log(counter);
fs.writeFileSync('output.txt', String(counter));
return counter;

function checkIfSafe(report) {
    let increasing = false;
    let decreasing = false;
    let prevElem;

    for (const elem of report) {
        if (prevElem != undefined) {
            const diff = prevElem - elem;
            // diff must be between 1 and 3
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                return false;
            }
            // diff > 0 means decreasing
            if (diff > 0 && increasing) {
                return false;
            }
            // diff < 0 means increasing
            if (diff < 0 && decreasing) {
                return false;
            }
            // define if it should be increasing or decreasing on the first difference
            if (!increasing && !decreasing) {
                if (diff > 0) {
                    decreasing = true;
                } else {
                    increasing = true;
                }
            }
        }
        prevElem = elem;
    }
    return true;
}

function parseData(input) {
    return input.split('\n');
}

function parseLine(line) {
    return line.split(' ').map(Number);
}