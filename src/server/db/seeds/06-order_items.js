exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('order_items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('order_items').insert([
        { product_id: 1, order_id: 1, quantity: 1, price: 1.99 },
        { product_id: 2, order_id: 1, quantity: 1, price: 1.99 },
        { product_id: 3, order_id: 2, quantity: 1, price: 1.99 },
        { product_id: 1, order_id: 2, quantity: 1, price: 1.99 },
      ])
    })
}
