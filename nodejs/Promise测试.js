const prom = (a) => {
    return new Promise((resolve, reject) => {
        if (a === 1) { resolve(1) }
        else { reject(2) }
    })
}

const arr = [1, 2,1]

 function _test() {
    return new Promise(async (resolve, reject) => {
        const resp = []
        for (const item of arr) {
            const res = await prom(item)
            resp.push(res)
        }
        console.log(33)
        resolve(resp)
    }) 
   
}

async function test() {
    const resp = await _test()
}

test()