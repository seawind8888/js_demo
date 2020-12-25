const fs = require('fs-extra')
const path = require('path')
const root = process.cwd()
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


console.log(fs.readdirSync(path.resolve('nodejs/a')))

