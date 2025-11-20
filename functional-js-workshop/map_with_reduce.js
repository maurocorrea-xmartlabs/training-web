'use strict'

module.exports = function arrayMap(arr, fn) {
    return arr.reduce((acc, currentVal) => {
        acc.push(fn(currentVal));
        return acc;
    }, [])
}
