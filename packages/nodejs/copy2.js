const path = require('path')
const fs = require('fs')
// function copyFile(src, dist) {
//     fs.writeFileSync(dist, fs.readFileSync(src));
// }

function fileCopy (src, dst) {
    let paths = fs.readdirSync(src)
    if (!paths || path.length <= 0) return
    if(!fs.existsSync(dst)) fs.mkdirSync(dst)
    paths.forEach(function (path) {
        let _src = src + '/' + path
        let _dst = dst + '/' + path
        let _file = fs.statSync(_src)
        if (_file.isFile()) {
            fs.writeFileSync(_dst, fs.readFileSync(_src))
        } else {
            fs.mkdirSync(_dst)
            fileCopy(_src, _dst)
        }
    })
}
fileCopy(path.join(__dirname, 'aaa'), path.join(__dirname, 'eee'))
// copyFile(path.join(__dirname, './writeFile.js'), path.join(__dirname, '../writeFile.js'))