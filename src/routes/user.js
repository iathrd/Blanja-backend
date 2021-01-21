const route = require('express').Router()
const user = require('../controllers/user')
const { upload } = require('../helpers/uploadFile')

route.patch('/updateUser/:role/:id', upload.single('avatar'), user.updateUser)
route.get('/getUser', user.getUser)
route.delete('/deleteUser', user.deleteUser)

module.exports = route
