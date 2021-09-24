const express = require('express')

const route = express.Router()

// Controllers
const globalController = require('./controllers/global')
const linksController = require('./controllers/links')

route.get('/', globalController.open)

route.post('/', linksController.createLink)

route.get('/r/:code', linksController.redirect)

module.exports = route
