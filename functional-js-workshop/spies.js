function Spy(target, method){
    const met = target[method];
    const spy = {count: 0};
    target[method] = function () {
        spy.count++;
        return met.apply(this, arguments);
    };

    return spy;
}

module.exports = Spy;