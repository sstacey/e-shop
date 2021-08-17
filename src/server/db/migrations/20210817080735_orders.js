exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.float('total').notNullable()
    table.timestamp('date_ordered').defaultTo(knex.fn.now())
    table.bool('shipped').defaultTo(false)
    table.timestamp('date_shipped')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orders')
}
