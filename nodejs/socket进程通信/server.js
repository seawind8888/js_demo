var app = require('express')()
var net = require('net');
var listenPort = 8010;//监听端口
const { initSocket, getSocketInstance } = require('./socket1')
const { initClient } = require('./socket2')

async function init() {
  await initSocket()
}

init()

// app.all('*', (req, res, next) => {
//   const {
//     origin,
//     Origin,
//     referer,
//     Referer
//   } = req.headers;
//   const allowOrigin = origin || Origin || referer || Referer || '*';
//   res.header("Access-Control-Allow-Origin", allowOrigin);
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true); //可以带cookies
//   res.header("X-Powered-By", 'Express');
//   if (req.method == 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });



app.use('/test', async function (req, res, next) {
  
  res.send({
    code: 200,
    message: 'successd'
  });
});

app.use('/test2', async function (req, res, next) {
  const data = await initClient()
  console.log('[data]',data)

  res.send({
    code: 200,
    message: 'successd'
  });
  next()
  
 
 
});

app.use('/test3', async function (req, res, next) {
  const _socket = await getSocketInstance()
  _socket.write('y')
  // initClient()
  // const _socket =  await getSocketInstance()
  // _socket.write('321')
  
  res.send({
    code: 200,
    message: 'successd'
  });
  
});

app.listen(8112, () => {
  console.log(`成功监听端口：8112`)
});