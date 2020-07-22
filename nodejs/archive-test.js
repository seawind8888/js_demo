const path = require('path')
const fs = require('fs')
const archiver = require('archiver')
// var archiveFileName = __dirname + 'test.zip';
var output = fs.createWriteStream(path.join(__dirname, 'testa.zip'));
var archive = archiver('zip', {
    store: false // Sets the compression method to STORE. 
});

let callback = () => {console.log('callback')}
        
// listen for all archive data to be written 
output.on('close', function() {
    if(callback && callback())
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});
output.on('end', function () {
    console.log('Data has been drained');
});
// good practice to catch this error explicitly 
archive.on('error', function(err) {
    throw err;
});
// pipe archive data to the file 
archive.pipe(output);
// append files from a directory 
// archive.file(path.join(__dirname, './aaa/aaa.js'), {name: 'aaa.js'})
// archive.file(path.join(__dirname, './aaa/test.js'), {name: 'test.js'})
archive.glob('**/*', {
    cwd: path.join(__dirname, './aaa'),
    ignore: ['bbb/**']
})
// archive.directory(path.join(__dirname, 'aaa/'), '');

// finalize the archive (ie we are done appending files but streams have to finish yet) 
archive.finalize();
