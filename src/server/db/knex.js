const enviorment = process.env.NODE_ENV || 'development'
const config = require('../../../knexfile')[enviorment]
module.exports = require('knex')(config)
