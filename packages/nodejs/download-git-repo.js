const download = require('download-git-repo');

download('gitlab:mygitlab.com:flipxfx/download-git-repo-fixture#my-branch', 'template/tmp', function (err) {
    console.log(err ? 'Error' : 'Success')
  })