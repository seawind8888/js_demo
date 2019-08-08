const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket => {
 
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

server.listen(3001, function(){
    console.log('listening on *:3001');
  });``