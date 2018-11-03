const fs = require('fs')
const path = require('path')

let data = fs.readFileSync(path.join(__dirname, 'testWrite.js'), 'utf-8')
data.replace('var aaa', 'var aaa = 234')
// console.log(info)
// fs.writeFileSync(path.join(__dirname, 'testWrite.js'), info, 'utf-8')