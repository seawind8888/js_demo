const mysql = require('mysql')

const pool = mysql.createPool({
    host: '172.30.10.157',
    user: 'root',
    password: '12354',
    database: 'dapp'
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
    let sql = 'select dapp_id from d_smart_contract'
    let dataList = await syncMysql.query(sql)
    console.log(dataList)
    return dataList
}

async function queryMysqlInfo() {
    let dataList = await selectDappData()
    console.log('dataList', dataList)
    return dataList
}

selectDappData()
// queryMysqlInfo()