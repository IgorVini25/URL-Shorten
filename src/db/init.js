const mysql = require('mysql')
const { connect } = require('./config')
const con = require('./config')

con.connect()
con.query('CREATE TABLE global (urlCode TEXT, redirect TEXT)', function (err) {
  if (err) throw err
  console.log('Table Created')
})
con.end()
