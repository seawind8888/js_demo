const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3457
const exec = require('child_process').exec

let test = new Router()

test.get('/', async(ctx) => {
    ctx.body = {
        code : 0,
        msg : "Successful",
        data : ""
    }
    exec('pm2 start process.js')
    
})

let router = new Router()
router.use('/test', test.routes())
app.use(bodyParser())
app
  .use(router.routes())
app.listen(port, host)


console.log('start' + port)