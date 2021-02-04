const route = require('express').Router()
const details = require('../controllers/produkDetails')

route.post('/createSize', details.createSize)
route.patch('/editSize/:id', details.editSize)
route.get('/sizeDetails/:id', details.getSize)
route.delete('/deleteSize/:id', details.deleteSize)
route.post('/createDetailSize/:sizeId', details.createSizeDetail)
route.patch('/updateSizeDetail/:id', details.updateSizeDetail)
route.get('/sizeDetail/:id', details.getSizeDetail)
route.delete('/sizeDetail/:id', details.deleteSizeDetail)
route.post('/color', details.createColor)
route.patch('/color/:id', details.updateColor)
route.get('/color/:id', details.getColor)
route.delete('/color/:id', details.deleteColor)
route.post('/colorDetail/:id', details.createColorDetail)
route.patch('/colorDetail/:id', details.updateColorDetail)

module.exports = route
