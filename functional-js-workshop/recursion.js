'use strict'

function getDependencies(tree, ret = [], isRoot = true) {
    // SOLUTION GOES HERE
    // Note: Feel free to add additional arguments
    // to this function for use with recursive calls.
    // Or not! There are many ways to recurse.
    if (!tree.dependencies) {
        return ret;
    }

    let deps = tree.dependencies;
    Object.keys(deps).forEach(name => {
        let data = deps[name];
        let dep = name + "@" + data.version;
        if (!ret.includes(dep)) {
            ret.push(dep);
        }
        getDependencies(data, ret, false);
    })
    if (isRoot) {
        return ret.sort();
    } else {
        return ret;
    }
}

module.exports = getDependencies;