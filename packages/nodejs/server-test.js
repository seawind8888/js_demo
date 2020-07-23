const http = require('http')
http.createServer((req, res) => {
    res.end("hello world\n");
    console.log("hello world\n")
}).listen(3001);

console.log('Server running on port 3001.');