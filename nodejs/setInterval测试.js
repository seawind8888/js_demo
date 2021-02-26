let timer = null
let val = 0


function _test() {
    return new Promise(resolve => {
        timer = setInterval(() => {
            val++
            if(val === 3) {
                resolve()
                clearInterval(timer)
            }
        },1000)
    })

}

async function test() {
    console.log(11)
    await _test()
    console.log(22)
}

test()

