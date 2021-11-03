const express = require('express')
const route = require('./route.js')
const path = require('path')
const mysql = require('mysql')
const con = require('./db/config')

const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))
server.set('views', path.join(__dirname, 'views'))
server.use(express.urlencoded({ extended: true }))

server.use(express.json())
server.use(route)

// Connect Database
con.connect(function (err) {
  if (err) throw err
  console.log('Database connected')
})

server.listen(3000, () => {
  console.log('Server started')
})
