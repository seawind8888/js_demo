const chokidar = require('chokidar');
const fs = require('fs-extra');

// One-liner for current directory
const watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

const log = console.log.bind(console);

watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });

fs.mkdirSync('/Users/wangharvest/Documents/js_demo/nodejs/123', err => {

})

