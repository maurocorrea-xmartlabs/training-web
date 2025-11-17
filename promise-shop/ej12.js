'use strict'

const { read } = require("q-io/http")

read('http://localhost:1337').then(JSON.parse).then(console.log);