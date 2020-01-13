const axios = require('axios')

const getData = url => {
    axios.get(url).then(d => {
        console.log(d.status)
        console.log(d.data.length)
    })
}

module.exports = {
    getData
}