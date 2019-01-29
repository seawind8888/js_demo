const mysql = require('mysql')

const pool = mysql.createPool({
    host: '172.30.10.157',
    user: 'root',
    password: '12354',
    database: 'dapp',
    multipleStatements: true
})

let syncMysql = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}

async function selectDappData() {
    // let sql = 'select d.code,d.name,s.contract from d_dapp_base d left join d_smart_contract s on d.id=s.dapp_id'
    let sql = 'update d_smart_contract set block = 7093278 where contract = "0x946048A75Af11C300A274344887eC39452218B3d";update d_smart_contract set block = 7005018 where contract = "0xa1d2c7e6de2fa512f1fdf486ca17ab79b4dc5d01";update d_smart_contract set block = 7111825 where contract = "0x273f7F8E6489682Df756151F5525576E322d51A3";update d_smart_contract set block = 7107092 where contract = "0x4ae0ede482f825fb9cccce8f0fe089f0379eaa2a";update d_smart_contract set block = 7111840 where contract = "0x138a35ee20e40f019e7e7c00386ab2ef42d66d1e";update d_smart_contract set block = 6842024 where contract = "0x9a7956dff83d5e94e8b4e9c6bbd7a40a9c89ebf7";update d_smart_contract set block = 7051255 where contract = "0xa30cbce69f520bf2a34c5c15193b7f5afe427a26";update d_smart_contract set block = 7111813 where contract = "0xdceaf1652a131F32a821468Dc03A92df0edd86Ea";update d_smart_contract set block = 7111796 where contract = "0x46fc7b42f4522bfbd8b4565130aaed1e407d9957";update d_smart_contract set block = 6937130 where contract = "0x4B9F5347c489D9EE91787B7e9f678d354324878F";update d_smart_contract set block = 7111593 where contract = "0xc045c0bd4a26160a85039dbaf9c1ab4cd93249d3";update d_smart_contract set block = 6967419 where contract = "0x97D99Db7a938Ad4f6dD8D607dEB2083f1B36db0B";update d_smart_contract set block = 7111853 where contract = "0xEE6BD04C6164D7F0Fa1cb03277C855639D99A7F6"'
    let dataList = await syncMysql.query(sql)
    console.log(dataList)
    return dataList
}

// async function queryMysqlInfo() {
//     let dataList = await selectDappData()
//     console.log('dataList', dataList)
//     return dataList
// }

selectDappData()
// queryMysqlInfo()