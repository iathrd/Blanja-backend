const route = require('express').Router()
const adress = require('../controllers/adress')

route.post('/createAdress', adress.createAdress)
route.patch('/updateAdress/:id', adress.updateAdress)

module.exports = route
