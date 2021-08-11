const enviorment = process.env.NODE_ENV
const config = require('../../../knexfile')[enviorment]
module.exports = require('knex')(config)
