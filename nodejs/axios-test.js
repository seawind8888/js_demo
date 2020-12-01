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
        // const data = [{
        //     appKey,
        //     bs: "10.1.55",
        //     device: "phone",
        //     engine: "",
        //     id: "02d02c735be843c6af1114f7dae29088",
        //     os: "iOS 6.0.1",
        //     msgType: 'pvuv',
        //     page: "/modules/lottery/index",
        //     pageWh: 568,
        //     tenant: "104350109",
        //     time: 1604987550505,
        //     title: "九宫格",
        //     ua: "iPhone 5",
        //     uid: "0f75d094f36b46d69619b7d1849b323e",
        //     uname: "seawind8888"
        // }]
        const data = {
            msgType: 'pvuv',
            os: 'iOS 6.0.1',
            uname: 'seawind8888',
            pageWh: 568,
            ua: 'iPhone 5',
            title: '连续签到',
            uid: 'e2ad23f2d2504c24af536ae83ec9982a',
            bs: '10.1.55',
            engine: '',
            appKey: '5cc60c2239cf482e8b9d34bae7c45771',
            id: 'fae8d7e8882f42348b5d6325106689b1',
            time: 1606209594716,
            page: '/modules/sign/index',
            device: 'phone',
            tenant: '106878997'
        }
        res = await axios({
            method: 'post',
            url: 'https://qa-ual.shuyun.com/web-client/v1/up',
            headers: {
                appcode: 'KwYxDYAYQJhhmAnCAZgFgBwwKYYEaIAm8aeAhtgOwhrCWUCMQA',
  client: 'IwNgDCBMYJwKzwOwxEA',
  authorization: 'KwYxDYAYQJhhmAnCAZgFgBwwKYYEaIAm8aeAhtgOwhrCWUCMDU4MkiwHli4QA' 
            },
            data: LZString.compressToEncodedURIComponent(JSON.stringify(data))
        })
        console.log('[res]', res)
    } catch (error) {
        console.log('[error]', error)
    }


}
fetchData()
