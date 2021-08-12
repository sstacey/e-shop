exports.up = function (knex) {
  return knex.schema.createTable('cart_items', (table) => {
    table.increments('id')
    table
      .integer('cart_id')
      .notNullable()
      .references('id')
      .inTable('carts')
      .onDelete('CASCADE')
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
    table.integer('quantity').notNullable().defaultTo(1)
    table.float('price').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('cart_items')
}
