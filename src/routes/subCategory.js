const route = require('express').Router()
const subCategory = require('../controllers/subCategory')

route.post('/createSubCategory/:categoryId', subCategory.createSubCategory)

module.exports = route
