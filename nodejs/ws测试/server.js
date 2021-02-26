const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002 });

let _ws = null

function initWSS() {
    console.log('[wss]')
    return new Promise(resolve => {
        wss.on('connection', function connection(ws) {
            console.log('[ws]', ws)
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });
        
            resolve(ws)
        
        
        });
    })
}


async function getWSSInstance() {
    if(!_ws) {
        _ws = await initWSS()
    }
    return _ws
}

module.exports = {
    getWSSInstance
}
