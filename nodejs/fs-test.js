const fs = require('fs-extra')
const path = require('path')
// const root = process.cwd()
// function createDir(_path) {
//     const pathList = _path.replace(root, '').split('/').filter(e => !!e)
//     pathList.reduce((p, c) => {
//         const __path = root + '/' + p
//         try {
//             fs.accessSync(__path)
//         } catch (error) {
//             console.log('[error]',error)
//             fs.mkdirSync(__path)
//         }
//         return p +'/' + c
//     })
// }

// createDir(path.resolve('nodejs/a/b/c'))
const files = fs.readdirSync(path.resolve('进程通信'))
files.forEach(element => {
    console.log('[element]',element)
});

// console.log(fs.readdirSync(path.resolve('nodejs/a')))

