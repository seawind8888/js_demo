
var copydir = require('node-copydir')

copydir('./nodejs/eee', './nodejs/aaa',(e) => {console.log(e)})