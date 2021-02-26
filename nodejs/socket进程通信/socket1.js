var net = require('net');


var listenPort = 8010;//监听端口


var _socket = null
function createSocketServer() {
  return new Promise((resolve) => {
    const server = net
      .createServer(function (socket) {
        socket.setEncoding('binary');

        socket.on('data', function (data) {
          console.log('client send:' + data);
        });

        socket.on('error', function (exception) {
          console.log('socket error:' + exception);
          socket.end();
        });
        //客户端关闭事件
        socket.on('close', function (data) {
          console.log('client closed!');
          // socket.remoteAddress + ' ' + socket.remotePort);
        });
        resolve(socket);
      })
      .listen(listenPort);
    //服务器监听事件
    server.on('listening', function () {
      console.log('server listening:' + server.address().port);
    });
    //服务器错误事件
    server.on('error', function (exception) {
      console.log('server error:' + exception);
    });
  });
}

async function initSocket() {
  _socket = await createSocketServer();
}

async function getSocketInstance() {
  if(!_socket) {
    _socket = await createSocketServer();
  }
  return _socket 
}


module.exports = {
  initSocket,
  getSocketInstance
}
