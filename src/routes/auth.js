const route = require('express').Router()
const auth = require('../controllers/auth')

route.post('/signup/:role', auth.createUser)

module.exports = route
