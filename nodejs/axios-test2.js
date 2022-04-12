const axios = require('axios')

async function test() {
    const res = await axios({
        method: 'get',
        url: 'https://alidw.minicrm.com/alidw-web-ccms/v1/index?callbackParam=3dbd546424e05209ae33c3a10ca2980673315b7fdabe02af3705b91a595696d06a22c52fedda928849c68e33bf8dc554a0e6ddfea29cfa81be0f1ca7624366f91ee6e1c93d50625b076cfcb414caaa7268ea8b2e37738bc2391ea9c46afc13d8280487301fb2e7e9018788a9b00c65af90c71cb6f39185609155f8f79b5dd8e8c02b8197313851d2fecd155b427a37655b8c02e102f8a81557911d061972c2c7cb89670817a5b3c3796f9102ad2193adf69e6338757b33c65cd2ea53ff140a4869abb549d9452a17b7400873e9497a5dafd27abf73d8c65d82a018e7d37663bd4578e94c2232433c02375ad8490903f7&from=ai-operation',
        headers: {
            'x-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6InFpdXNoaTYiLCJ1c2VySWQiOjEwODQ4NDM4LCJ1c2VyVHlwZSI6ImJ1aWxkLWluIiwidXNlck5hbWUiOiJaWCIsImV4dCI6MTYxMTMyNjU0MTM4MCwiaWF0IjoxNjExMjgzMzQxMzgwfQ.7Ls9CqYUqXEapKPIzP13tT-JD1H5PoukmoSZ4OQ8zxk'
        },
    })
    console.log('[res]',res.headers)
}

test()