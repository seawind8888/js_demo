var redis   = require('redis');
var client  = redis.createClient('6379', '172.30.10.78');

client.on("error", function(error) {
    console.log('error',error);
});

client.select('15', function(error){
    if(error) {
        console.log('selectErr',error);
    } else {
        // set
        client.get('website_resource_154232323dasd', function(error, res) {
            if(error) {
                console.log('seterr',error);
            } else {
                console.log('[key]', res);
            }

            // 关闭链接
            client.end();
        });
    }
});

// async function getRedisKey () {
//     try {
//         await client.select('1')
//         let key = await client.get('str_key_0')
//         console.log('key', key)
//     } catch (error) {
        
//     }
// }
// getRedisKey()