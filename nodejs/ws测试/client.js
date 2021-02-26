const WebSocket = require('ws');
const { getWSSInstance } = require('./server') 


function _ws() {
    // return new Promise(resolve => {
        const ws = new WebSocket('ws://localhost:3101/bar');

        ws.on('open', function open() {
            ws.send('something');
        });

        ws.on('message', function incoming(data) {
            console.log('[message]', data);
            // resolve(data)

        });
    // })


}
_ws()

// async function test() {
//     setTimeout(async () => {
//         await getWSSInstance().send('sth')
//     },2000)
    
//     console.log(111)
//     await _ws()
//     console.log(22)
// }

// test()


module.exports = _ws
