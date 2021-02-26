const fs = require('fs-extra');
const path = require('path')

console.log(fs.accessSync(path.resolve('a')))