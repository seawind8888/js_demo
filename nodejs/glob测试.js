var glob = require("glob")

// options is optional
glob("**/*.js", {}, function (er, files) {
  console.log('[files]',files)
})