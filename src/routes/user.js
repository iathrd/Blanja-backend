const route = require('express').Router()
const user = require('../controllers/user')
const { upload } = require('../helpers/uploadFile')

route.patch('/updateUser/:role/:id', upload.single('avatar'), user.updateUser)

module.exports = route
