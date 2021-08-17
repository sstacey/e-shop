exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id')
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
    table
      .integer('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE')
    table.integer('quantity').defaultTo(1)
    table.float('price').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('order_items')
}
