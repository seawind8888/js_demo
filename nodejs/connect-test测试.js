var connect = require('connect');
var http = require('http');

var app = connect();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// respond to all requests
// app.use(function(req, res){
//   res.end('Hello from Connect!\n');
// });

app.use('/foo', function fooMiddleware(req, res, next) {
    // req.url starts with "/foo"
    console.log(11)
    res.end(JSON.stringify({
        message: 'foo'
    }));
    next();
  });
  app.use('/bar', function barMiddleware(req, res, next) {
    // req.url starts with "/bar"
    res.end({
        message: 'bar'
    });
    next();
  });

//create node.js http server and listen on port
http.createServer(app).listen(3010);
