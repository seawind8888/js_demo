var express = require('express');
var app = express();

app.use(function (req, res, next) {
  console.log('111')
  next()
  console.log('444')
});
app.use(function (req, res, next) {
  console.log('222')
  next()
});
app.use(function (req, res, next) {
  console.log('333')
});

app.listen(3110);