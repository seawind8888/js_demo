const {
    spawn
} = require('child_process')

ls.kill()

let ls = spawn('node', ['process.js'])

ls.stdout.on('data', (data) => {
    finish = true
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    finish = false
    console.log(`子进程退出码：${code}`);
});

setTimeout(() => {
    ls.kill()   
},10000)