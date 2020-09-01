

function test() {
    console.log('111')
    throw new Error('error')
    console.log('222')
}

test()