
var copydir = require('sync-copydir')

copydir('./nodejs/eee', './nodejs/aaa',(e) => {console.log(e)})