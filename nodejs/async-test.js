const fs = require('fs-extra')
const path = require('path')
async function foo () {
    if(await fs.exists(path.resolve('img'))) { // 项目名重复
        return true
    } else {
        return false
    }
}

async function test () {
    const res = await foo()
    console.log(res)
}

test()