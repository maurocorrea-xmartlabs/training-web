'use strict'

function countWords(inputWords){
    return inputWords.reduce((acc, currentValue) => {
        acc[currentValue] = acc[currentValue] ? acc[currentValue] + 1 : 1; 
        return acc;
    }, {});
}

module.exports = countWords;