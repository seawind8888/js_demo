var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');

client.on("error", function(error) {
    console.log('error',error);
});

client.select('15', function(error){
    if(error) {
        console.log('selectErr',error);
    } else {
        // set
        client.set('str_key_0', '1', function(error, res) {
            if(error) {
                console.log('seterr',error);
            } else {
                console.log('setok', res);
            }

            // 关闭链接
            client.end();
        });
    }
});