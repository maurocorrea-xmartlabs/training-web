'use strict'

function repeat(operation, num) {
    setTimeout(() => { //metemos un timeout para que sea asincrónico y no bloquee la ejecución
        if (num <= 0) return
        operation()
        return repeat(operation, --num)
    }, 0);
}

module.exports = repeat
