var app = require('express')()

app.all('*', (req, res, next) => {
  const {
      origin,
      Origin,
      referer,
      Referer
  } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});

app.use('/datain/:code', function (req, res, next) {
  res.send({
    status: '200',
    code: req.params.code,
    message: '调用成功',
  });
  next()
});

app.listen(8998, () => {
	console.log(`成功监听端口：8998`)
});