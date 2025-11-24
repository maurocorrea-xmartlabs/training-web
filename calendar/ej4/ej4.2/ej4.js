'use strict';

const fs = require('fs');
let input = fs.readFileSync('input.txt')

let parsedInput = parseInput(String(input));
let counter = 0;

for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[0].length; j++) {
        if (parsedInput[i][j] === 'A' && isXMAS(parsedInput, i, j)) {
            counter++;
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

//check if the current letter is the center of a X-MAS
function isXMAS(matrix, i, j){
    const colLeft = j - 1;
    const colRight = j + 1;
    const rowUp = i - 1;
    const rowDown = i + 1;

    //check if not out of bounds
    if(colLeft < 0 || rowUp < 0 || colRight > matrix[i].length || rowDown > matrix.length){
        return false; 
    }

    //check if both diagonals \ and / are MAS or SAM (the only two possible words wich can form an X-MAS)
    const firstDiag = matrix[rowDown][colLeft] + matrix[i][j] + matrix[rowUp][colRight];
    const secondDiag = matrix[rowUp][colLeft] + matrix[i][j] + matrix[rowDown][colRight];

    if((firstDiag === 'MAS' || firstDiag === 'SAM') && (secondDiag === 'MAS' || secondDiag === 'SAM')){
        return true;
    }else{
        return false;
    }
}
