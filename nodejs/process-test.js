const {
    spawn
} = require('child_process')
const path = require('path')

function Bash () {
    let _bash = spawn('node', [path.resolve('process.js')])

    _bash.stdout.on('data', (data) => {
        finish = true
        console.log(`stdout: ${data}`);
    });

    _bash.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    _bash.on('close', (code) => {
        finish = false
        console.log(`子进程退出码：${code}`);
    });

    setTimeout(() => {
        // console.log('kill')
        // ls.kill()   
    },2000)
}
module.exports = Bash