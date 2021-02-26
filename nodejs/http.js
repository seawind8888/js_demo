var http = require('http');

// http.createServer(function (request, response){
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write("Hello World");
//   response.end();
// }).listen(8182, '127.0.0.1');

http.get('http://127.0.0.1:3000/build', resp => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log('[data]',data)
    console.log(JSON.parse(data).explanation);
  });
})