'use strict'
const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');
input = parseData(input);
console.log(input);

let counter = 0;

for (const report of input) {
    const parsedLine = parseLine(report);
    console.log(parsedLine);
    let isSafe = checkSafeWithRemoval(parsedLine);
    if (isSafe) {
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

//check safe removing each element once
function checkSafeWithRemoval(report) {
    if (checkIfSafe(report)) return true;
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.filter((_, idx) => idx !== i);
        if (checkIfSafe(modifiedReport)) return true;
    }
    return false;
}

function parseData(input) {
    return input.split('\n');
}

function parseLine(line) {
    return line.split(' ').map(Number);
}