const fs = require('fs-extra')
const path = require('path')

const extArr = ['.png', '.jpg', '.jpeg', '.gif'];

function readFiles(_path) {
    const files = fs.readdirSync(_path);
    files.forEach(item => {
        const stat = fs.statSync(path.join(_path, item));
        if (stat.isDirectory()) {
            readFiles(path.join(_path, item));
        } else {
            const extname = path.extname(item);
            if (extArr.includes(extname.toLowerCase())) {
                throw new Error(111)
            }
        }
    })
}

function test() {
    try {
        readFiles(path.resolve('./static/'))
        console.log('success')
    } catch (error) {
        console.log('error', error)
    }
}
test()