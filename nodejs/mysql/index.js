const syncMysql = require('./syncMysql')

async function start () {
    const sql = `update d_smart_contract set block = 1 where contract = '213';update d_smart_contract set block = 2 where contract = 'weqw'`
    await syncMysql.query(sql)
}
start()