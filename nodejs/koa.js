const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || process.argv[2]
const execSync = require('child_process').execSync
const nodeBash = require('./process.js')

let test = new Router()

test.get('/', async(ctx) => {
    ctx.body = {
        code : 0,
        msg : "Successful",
        data : ""
    }
    // execSync('node process.js')
    // nodeBash()
    
})

let router = new Router()
router.use('/test', test.routes())
app.use(bodyParser())
app
  .use(router.routes())
app.listen(port, host)


console.log('start' + port)