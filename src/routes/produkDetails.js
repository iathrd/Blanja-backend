const route = require('express').Router()
const details = require('../controllers/produkDetails')

route.post('/createSize', details.createSize)
route.patch('/editSize/:id', details.editSize)
route.get('/sizeDetails/:id', details.getSize)

module.exports = route
