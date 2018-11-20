process.on('data', () => {
    console.log('Received SIGINT.  Press Control-D to exit.');
});