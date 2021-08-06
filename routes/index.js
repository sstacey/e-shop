const users = require('./user')
const products = require('./products')
const orders = require('./orders')
const cart = require('./cart')
const auth = require('./auth')
const passport = require('passport')

module.exports = app => {
    app.use('/auth', auth)
    app.use('/users', users)
    app.use('/products', passport.authenticate('jwt', { session: false }), products)
    app.use('/orders', orders)
    app.use('/cart', cart)
}