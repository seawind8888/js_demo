const mysql = require('mysql')
const pool = mysql.createPool({
  host: '172.30.10.157',
  user: 'root',
  password: '12354',
  database: 'dapp',
  multipleStatements: true
})

module.exports = {
  query: function (sql, values) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
}