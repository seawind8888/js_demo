console.log('pid in worker:', process.pid);

process.on('message', function(msg) {
  console.log('3:', msg);
});

process.send('===');
process.emit('message', '======');