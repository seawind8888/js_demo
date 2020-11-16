var childprocess = require('child_process');
var worker = childprocess.fork('./worker.js');

console.log('pid in master:', process.pid);

worker.on('message', function(msg) {
  console.log('1:', msg);
})
process.on('message', function(msg) {
  console.log('2:', msg);
})

worker.send('---');
process.emit('message', 'master ------');

// pid in master: 22229      // 主进程创建后打印其 pid
// 2: ------                 // 主进程收到给自己发的消息
// pid in worker: 22230      // 子进程创建后打印其 pid
// 3: ======                 // 子进程收到给自己发的消息 
// 1: ===                    // 主进程收到来自子进程的消息
// 3: ---                    // 子进程收到来自主进程的消息