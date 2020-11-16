const axios = require('axios')
const LZString = require('lz-string')

const appKey = '6138c80482ba4165b01dd7476071c047'

async function fetchData(params) {
    const _now = Date.now() + ''
    const headers = {
        'appcode': LZString.compressToEncodedURIComponent(appKey),
        'client': LZString.compressToEncodedURIComponent(_now),
        'authorization': LZString.compressToEncodedURIComponent(appKey + _now)
    }
    // console.log('[headers]',headers)
    let res
    try {
        const data = [{
            appKey,
            bs: "10.1.55",
            device: "phone",
            engine: "",
            id: "02d02c735be843c6af1114f7dae29088",
            os: "iOS 6.0.1",
            msgType: 'pvuv',
            page: "/modules/lottery/index",
            pageWh: 568,
            tenant: "104350109",
            time: 1604987550505,
            title: "九宫格",
            ua: "iPhone 5",
            uid: "0f75d094f36b46d69619b7d1849b323e",
            uname: "seawind8888"
        }]
        res = await axios({
            method: 'post',
            url: 'https://qa-ual.shuyun.com/web-client/v1/up',
            headers,
            data: LZString.compressToEncodedURIComponent(JSON.stringify(data))
        })
        console.log('[res]', res)
    } catch (error) {
        console.log('[error]', error)
    }


}
fetchData()
