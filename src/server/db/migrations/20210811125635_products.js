exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('name', 100).notNullable()
    table.text('description').notNullable()
    table.float('price').notNullable
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
