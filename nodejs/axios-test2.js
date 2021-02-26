const axios = require('axios')

async function test() {
    const res = await axios({
        method: 'post',
        url: 'https://qa-ual.shuyun.com/download-security/v1/security/verify',
        headers: {
            'x-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6InFpdXNoaTYiLCJ1c2VySWQiOjEwODQ4NDM4LCJ1c2VyVHlwZSI6ImJ1aWxkLWluIiwidXNlck5hbWUiOiJaWCIsImV4dCI6MTYxMTMyNjU0MTM4MCwiaWF0IjoxNjExMjgzMzQxMzgwfQ.7Ls9CqYUqXEapKPIzP13tT-JD1H5PoukmoSZ4OQ8zxk'
        },
    })
    console.log('[res]',res)
}

test()