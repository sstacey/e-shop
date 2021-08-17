const users = require('./user')
const products = require('./products')
const orders = require('./orders')
const cart = require('./cart')
const auth = require('./auth')
const passport = require('passport')

module.exports = (app) => {
  app.use('/', auth)
  app.use('/users', passport.authenticate('jwt', { session: false }), users)
  app.use(
    '/products',
    passport.authenticate('jwt', { session: false }),
    products
  )
  app.use('/orders', passport.authenticate('jwt', { session: false }), orders)
  app.use('/cart', passport.authenticate('jwt', { session: false }), cart)
}
