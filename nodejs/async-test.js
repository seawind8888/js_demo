const fs = require('fs-extra')
const path = require('path')
function foo () {
    console.log(111)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(123)
        },2000)
    })
}

async function test () {
    const res = await foo()
    console.log(res)
}

async function run () {
    try {
        await test()
    } catch (error) {}
    console.log(321)
}

run()

