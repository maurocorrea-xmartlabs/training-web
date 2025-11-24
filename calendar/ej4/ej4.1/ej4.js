'use strict';

const fs = require('fs');
let input = fs.readFileSync('input.txt')

let parsedInput = parseInput(String(input));
let counter = 0;

for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[0].length; j++) {
        if (parsedInput[i][j] === 'X') {
            counter += countXMASOccurrences(parsedInput, i, j);
        }
    }
}

fs.writeFileSync('output.txt', String(counter));

function parseInput(input) {
    let parsedInput = input.split('\n');
    for (let i = 0; i < parsedInput.length; i++) {
        parsedInput[i] = parsedInput[i].split('');
    }
    return parsedInput;
}

//check how many occurrences of XMAS we have on all the directions
function countXMASOccurrences(matrix, i, j) {
    return countXMASOccurrencesHorizontal(matrix, i, j) + countXMASOccurrencesVertical(matrix, i, j) + countXMASOccurrencesDiagonal(matrix, i, j);
}

//check how many occurrences of XMAS we have on the horizontal axis
function countXMASOccurrencesHorizontal(matrix, i, j) {
    const target = "MAS";
    let leftOccurrence = 1;
    let rightOccurrence = 1;

    for (let k = 1; k <= target.length; k++) {
        const colLeft = j - k;
        const colRight = j + k;

        if (colLeft < 0) leftOccurrence = 0;
        if (colRight >= matrix[0].length) rightOccurrence = 0;

        if (leftOccurrence && matrix[i][colLeft] !== target[k - 1]) {
            leftOccurrence = 0;
        }
        if (rightOccurrence && matrix[i][colRight] !== target[k - 1]) {
            rightOccurrence = 0;
        }
    }

    return leftOccurrence + rightOccurrence;
}

//check how many occurrences of XMAS we have on the vertical axis
function countXMASOccurrencesVertical(matrix, i, j) {
    const target = "MAS";
    let upOccurrence = 1;
    let downOccurrence = 1;

    for (let k = 1; k <= target.length; k++) {
        const rowDown = i + k;
        const rowUp = i - k;

        if (rowDown >= matrix.length) downOccurrence = 0;
        if (rowUp < 0) upOccurrence = 0;

        if (upOccurrence && matrix[rowUp][j] !== target[k - 1]) {
            upOccurrence = 0;
        }
        if (downOccurrence && matrix[rowDown][j] !== target[k - 1]) {
            downOccurrence = 0;
        }
    }

    return upOccurrence + downOccurrence;
}

//check how many occurrences of XMAS we have on both diagonals \ and /
function countXMASOccurrencesDiagonal(matrix, i, j) {
    const target = "MAS";

    let upLeftOccurrence = 1;
    let upRightOccurrence = 1;
    let downLeftOccurrence = 1;
    let downRightOccurrence = 1;

    for (let k = 1; k <= target.length; k++) {

        const rowUp = i - k;
        const rowDown = i + k;
        const colLeft = j - k;
        const colRight = j + k;

        if (rowUp < 0) {
            upLeftOccurrence = 0;
            upRightOccurrence = 0;
        }
        if (rowDown >= matrix.length) {
            downLeftOccurrence = 0;
            downRightOccurrence = 0;
        }
        if (colLeft < 0) {
            upLeftOccurrence = 0;
            downLeftOccurrence = 0;
        }
        if (colRight >= matrix[0].length) {
            upRightOccurrence = 0;
            downRightOccurrence = 0;
        }

        if (upLeftOccurrence && matrix[rowUp][colLeft] !== target[k - 1]) {
            upLeftOccurrence = 0;
        }
        if (upRightOccurrence && matrix[rowUp][colRight] !== target[k - 1]) {
            upRightOccurrence = 0;
        }
        if (downLeftOccurrence && matrix[rowDown][colLeft] !== target[k - 1]) {
            downLeftOccurrence = 0;
        }
        if (downRightOccurrence && matrix[rowDown][colRight] !== target[k - 1]) {
            downRightOccurrence = 0;
        }
    }

    return upLeftOccurrence + upRightOccurrence + downLeftOccurrence + downRightOccurrence;
}
