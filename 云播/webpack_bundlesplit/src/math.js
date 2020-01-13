const _ = require('lodash')

const findMaxIndex = arr => {
    let x = _.max(arr)
    let r = Array.prototype.indexOf.call(arr, x)
    console.log(r);
}

module.exports = {
    findMaxIndex
}