const express = require('express')
const bodyParser = require('body-parser')
const mountRoutes = require('./routes')
const passport = require('passport')

require('./auth/auth')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Passport.js
app.use(passport.initialize())
app.use(passport.session())

mountRoutes(app)

module.exports = app
