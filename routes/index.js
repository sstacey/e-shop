const users = require('./user')
const products = require('./products')

module.exports = app => {
    app.use('/users', users)
    app.use('/products', products)
}