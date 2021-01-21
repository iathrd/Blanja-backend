const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// helpers
const { APP_PORT } = process.env
const { verifyAccessToken } = require('./helpers/jwt_init')

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use('/assets/uploads/img', express.static('assets/uploads/img'))

// routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const adressRoute = require('./routes/adress')

// routesMiddleware
app.use('/auth', authRoute)
app.use('/user', verifyAccessToken, userRoute)
app.use('/adress', verifyAccessToken, adressRoute)

// Error handler http request
app.use(async (req, res, next) => {
  next(new Error('Not Found'))
})
// custom error
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    succes: false,
    status: err.status || 500,
    message: err.message
  })
})

app.listen(APP_PORT, () => {
  console.log(`App listen on port ${APP_PORT}`)
})
