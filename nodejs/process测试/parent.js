const child = require('child_process');
const path = require('path');

let n = null
function createParentProcess() {
  return new Promise(resolve => {
    n = child.fork(path.join(__dirname, './process.js'));
    n.on('message', (m) => {
      resolve(m)
    });
  })
}

function sendProcessMessage(m) {
  n.send(m)
}

async function test() {
    console.log(11)
    const data = await createParentProcess()
    return data

}

// test()

module.exports = { test, sendProcessMessage };