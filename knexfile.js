// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONN_DEV,
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds',
    },
  },
  test: {
    client: 'postgresql',
    connection: process.env.PG_CONN_TEST,
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds',
    },
  },
}
