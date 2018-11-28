const glob = require('glob')


glob("nodejs/*.js", function(err, files){
    console.log(files);
});