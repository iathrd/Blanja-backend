const route = require('express').Router()
const adress = require('../controllers/adress')

route.post('/createAdress', adress.createAdress)
route.patch('/updateAdress/:id', adress.updateAdress)
route.get('/getAdress/:id', adress.getAdress)

module.exports = route
