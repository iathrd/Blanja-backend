const route = require('express').Router()
const auth = require('../controllers/auth')

route.post('/signup/:role', auth.createUser)
route.post('/login/:role', auth.login)

module.exports = route
