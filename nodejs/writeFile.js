const fs = require('fs')
const path = require('path')

try {
    let paths = path.join(__dirname, '/aaa/test.js')
    let js = fs.readFileSync(paths, 'utf-8')
    fs.writeFileSync(paths, js.replace(/var aaa/g, "var aaa = '123'"), 'utf-8')
} catch (error) {
    
}
