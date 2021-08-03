const users = require('./user')
const products = require('./products')
const orders = require('./orders')

module.exports = app => {
    app.use('/users', users)
    app.use('/products', products)
    app.use('/orders', orders)
}