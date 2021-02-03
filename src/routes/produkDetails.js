const route = require('express').Router()
const details = require('../controllers/produkDetails')

route.post('/createSize', details.createSize)

module.exports = route
