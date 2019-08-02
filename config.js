const mysql = require('mysql')
const co = require('co-mysql')
let conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_test'
})
let db = co(conn)
module.exports = db
