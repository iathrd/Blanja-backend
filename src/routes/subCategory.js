const route = require('express').Router()
const subCategory = require('../controllers/subCategory')

route.post('/createSubCategory/:categoryId', subCategory.createSubCategory)
route.patch('/updateSubCategory/:id', subCategory.updateSubCategory)
route.get('/detail/:id', subCategory.getSubCategory)
route.get('/listSubCategory', subCategory.listSubCategory)

module.exports = route
