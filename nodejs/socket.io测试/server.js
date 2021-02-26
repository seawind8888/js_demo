const io = require('socket.io')(3200);

io.on('connection', socket => {
  console.log(socket.id);

  socket.emit('news', 'Hello');
  socket.on('news', data => {
      console.log('server',data);
  });
});