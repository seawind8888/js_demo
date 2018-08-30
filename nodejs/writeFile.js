const path = require('path')
const fs = require('fs')
function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

copyFile(path.join(__dirname, './writeFile.js'), path.join(__dirname, '../writeFile.js'))