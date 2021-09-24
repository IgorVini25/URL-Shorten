const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'your Username',
  password: 'your Password',
  database: 'db'
})

module.exports = con
