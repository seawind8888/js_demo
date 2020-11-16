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

app.use('/datain', function (req, res, next) {
  console.log('req.query.code', req.query.code)
  try {
    res.send({
      code: 200,
      message: 'successd',
      data: req.query.code,
    });
  } catch (error) {
    res.send({
      code: 0,
      message: 'error',
      data: error,
    });
  }
});

app.listen(8998, () => {
  console.log(`成功监听端口：8998`)
});