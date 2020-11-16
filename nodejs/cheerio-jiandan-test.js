const cheerio = require('cheerio')
const request = require('request')
const http = require('http')
let _url = 'http://jandan.net/'

// request.get({
//     url: _url,
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
//     },
//     method: 'get'
// }, (err, res) => {
//     const $ = cheerio.load(res.body)
//     let items = $('.list-post')
//     let data = []
//     items.map(() => {
//         let _this = $(this)
//         let _name = _this.find('.time_s').find('a')
//         let _content = _this.find('.indexs').find('h2').find('a')
//         data.push({
//             name: _name,
//             content: _content
//         })
//     })
//     console.log(data)
// })

http.get(_url, (res) => {
    let html = ''
    // res.setEncoding('utf-8')

    res.on('data', (data) => {
        html += data
    })

    res.on('end', (err) => {
        const $ = cheerio.load(html)
        let items = $('.list-post')
        let data = []
        items.map((i,e) => {
            let _this = $(e)
            let _title = _this.find('.indexs h2 a').text()
            let _auther = _this.find('.time_s a').text()
            
            data.push({
                title: _title,
                auther: _auther,
               
            })
        })
        console.log(data)
    })
})