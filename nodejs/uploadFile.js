const path = require('path')
const fs = require('fs')
const request = require('request')
// fs.createReadStream(path.resolve('test.zip')).pipe(request.post('http://172.30.30.186:8080/media/bcmWebVersion/uploadWebsiteResources',(error, response, body) => {
//     if(error ) {
//         console.error(error) 
//         return;
//     } 
//         console.log(response + body) // 打印google首页
// }))
// 'http://172.30.30.186:8080/media/bcmWebVersion/uploadWebsiteResources'
var redis = require('redis');
var client = redis.createClient('6379', '172.30.10.78');
let r = request.post('http://172.30.11.49:38080/media/bcmWebVersion/uploadWebsiteResources', (error, response, body) => {
    if (error) {
        console.error(error)
        return;
    }
    let key = JSON.parse(body).data.key
    // console.log(response + body) // 打印google首页
    console.log('body', JSON.parse(body))
    console.log('key', key)
   
    

    client.on("error", function (error) {
        console.log('error', error);
    });

    client.select('15', function (error) {
        if (error) {
            console.log('selectErr', error);
        } else {
            // set
            client.get(key, function (error, res) {
                if (error) {
                    console.log('seterr', error);
                } else {
                    console.log('[key]', res);
                    console.log(JSON.parse(res) == 'end')
                    
                }
                
                // 关闭链接
                client.end();
            });
        }
    });
});
let form = r.form();
form.append('my_field', 'my_value')
form.append('my_buffer', new Buffer([1, 2, 3]))
form.append('file', fs.createReadStream(path.join(__dirname, '../testa.zip')))