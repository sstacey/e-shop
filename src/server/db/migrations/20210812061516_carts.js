exports.up = function (knex) {
  return knex.schema.createTable('carts', (table) => {
    table.increments('id')
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('carts')
}
