var net = require('net');
var port = 8010;
var host = '127.0.0.1';



var client = new net.Socket();
client.setEncoding('binary');
//连接到服务端
client.connect(port, host, function () {
  //向端口写入数据到达服务端
});

client.on('error', function (error) {
  //错误出现之后关闭连接
  console.log('error:' + error);
  // client.destory();
});
client.on('close', function () {
  //正常关闭连接

});
client.on('drain', () => {
  console.log('drain');
})




function initClient() {
  return new Promise((resolve) => {
    client.on('data', function (data) {
      // console.log('[resolve]',resolve)
      resolve(data)
      // client.close()
      console.log('from server:' + data);
      // return data
      //得到服务端返回来的数据
    });

  })

}

module.exports = {
  initClient
}