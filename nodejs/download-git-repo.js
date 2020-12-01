const download = require('download-git-repo');

// download('direct:http://gitlab.platdep.shuyun.com/fe/fe-b/cloud-taro-template.git', 'template/tmp', function (err) {
//     console.log(err ? 'Error' : 'Success')
//   })

download('direct:http://gitlab.platdep.shuyun.com/fe/fe-b/cloud-taro-template.git#dev', '/Users/wangharvest/Documents/shuyun/定制化模板/cloud-mini-app', { clone: true }, function (err) {
  console.log('[err]',err)
  // console.log(err ? 'Error' : 'Success')
})
