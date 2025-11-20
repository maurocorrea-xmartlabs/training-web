'use strict'

function getShortMessages(input){
    return input.map((msg) => msg.message).filter((msg) => msg.length<50);
}

module.exports = getShortMessages;