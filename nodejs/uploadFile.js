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


let r = request.post('http://172.30.30.186:8080/media/bcmWebVersion/uploadWebsiteResources', (error, response, body) => {
    if(error ) {
        console.error(error) 
        return;
    } 
        console.log(response + body) // 打印google首页
});
let form = r.form();
form.append('my_field', 'my_value')
form.append('my_buffer', new Buffer([1, 2, 3]))
form.append('file', fs.createReadStream('../testaa.zip'))


