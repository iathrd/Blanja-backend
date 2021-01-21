const route = require('express').Router()
const adress = require('../controllers/adress')

route.post('/createAdress', adress.createAdress)

module.exports = route
