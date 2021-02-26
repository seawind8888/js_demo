var app = require('express')()
const { test, sendProcessMessage } = require('./parent')

app.use('/test', async function (req, res, next) {
    const data = await test()
    console.log('[data]', data)
    res.send({
        code: 200,
        message: 'successd'
    });
});

app.use('/test2', async function (req, res, next) {
    sendProcessMessage(11)
    res.send({
        code: 200,
        message: 'successd'
    });
});

app.listen(8113, () => {
    console.log(`成功监听端口：8112`)
});