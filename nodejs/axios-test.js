const axios = require('axios')

async function fetchData(params) {
    let {data} = await axios.get('http://172.30.30.186:9080/v1/api/aggregateDapp',{
        params: {
            platform: '',
            code : '1547536226723'
        }
    })
    console.log(data)
}
fetchData()