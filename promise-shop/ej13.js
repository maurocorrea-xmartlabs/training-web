'use strict'

const { read } = require("q-io/http")

read('http://localhost:7000')
    .then(res => res.toString())
    .then(v => read('http://localhost:7001/' + v))
    .then(JSON.parse)
    .then(console.log)
