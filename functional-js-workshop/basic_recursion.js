'use stirct'

function reduce(arr, fn, initial, index = 0){
    if (index == arr.length) return initial;
    let newValue = fn(initial, arr[index], index, arr)
    return reduce(arr, fn, newValue, index + 1);
}

module.exports = reduce;