const http = require('http')
http.createServer((req, res) => {
    res.end("hello world\n");
}).listen(8000);