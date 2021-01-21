const route = require('express').Router()
const auth = require('../controllers/auth')

route.post('/signup', auth.createUser)

module.exports = route
