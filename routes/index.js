const users = require('./user')
const products = require('./products')
const orders = require('./orders')
const cart = require('./cart')

module.exports = app => {
    app.use('/users', users)
    app.use('/products', products)
    app.use('/orders', orders)
    app.use('/cart', cart)
}