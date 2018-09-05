const Koa = require('koa')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3456

app.listen(port, host)
console.log('')