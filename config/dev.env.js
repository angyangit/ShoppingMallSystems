'use strict'
const {merge} = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://172.16.218.88:8080"'
    // BASE_API: '"http://localhost:8080"'
    BASE_API: '"http://121.4.128.217:8080"'
    // BASE_API: '"https://api.angyangit.xyz:8080"'
})
