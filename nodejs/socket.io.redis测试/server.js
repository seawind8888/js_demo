const io = require('socket.io')(3011);

io.on('connection', socket => {
    console.log(socket.id);

    socket.emit('news', 'Hello');
    socket.on('news', data => {
        console.log(data);
    });
});