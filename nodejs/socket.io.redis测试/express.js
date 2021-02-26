var app = require('express')()


const io = require('socket.io')(3011);

const _socket = null

io.on('connection', socket => {
    // console.log(socket.id);

    // socket.emit('news', 'Hello');
    // socket.on('news', data => {
    //     console.log(data);
    // });
    _socket = 
});

app.use('/test', async function (req, res, next) {
  
    res.send({
      code: 200,
      message: 'successd'
    });
  });