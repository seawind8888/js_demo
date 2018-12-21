const fs = require('fs')
const path = require('path')

// let data = fs.readFileSync(path.join(__dirname, 'testWrite.js'), 'utf-8')
// data.replace('var aaa', 'var aaa = 234')
// let dir = path.join(__dirname + '/aaa')
// let paths = fs.readdirSync(dir)
// paths.forEach((file) => {
//     let stats = fs.statsSync(dir)
//     if(stats.isDirectory()) {
//         console.log(file, 'isDirectory')
//     } else {
//         console.log(file, 'isFile')
//     }
// })
try {
    fs.accessSync(path.resolve('nodejs/aaa'))
    console.log(111)
} catch (error) {
    console.log(error)
}

// console.log(info)
// fs.writeFileSync(path.join(__dirname, 'testWrite.js'), info, 'utf-8')