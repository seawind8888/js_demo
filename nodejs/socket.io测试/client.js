var socket = require('socket.io-client')('http://localhost:3200');

socket.on('news', data => {
    console.log('[client]',data);
    socket.emit('news', 'Hi');
});