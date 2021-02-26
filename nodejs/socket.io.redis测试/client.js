const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('news', data => {
    console.log(data);
    socket.emit('news', 'Hi');
});