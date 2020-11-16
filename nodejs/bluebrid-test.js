const Promise = require('bluebird'),
    fs = require('fs'),
    path = require('path');
Promise.promisifyAll(fs);

async function start () {
    let file = await fs.readFileAsync(path.join(__dirname, 'buffer.js'), 'utf-8')
    console.log(file)
}

start()