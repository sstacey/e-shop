exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cart_items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_items').insert([
        { cart_id: 1, product_id: 1, quantity: 1, price: 9.99 },
        { cart_id: 1, product_id: 2, quantity: 1, price: 9.99 },
        { cart_id: 1, product_id: 3, quantity: 1, price: 9.99 },
        { cart_id: 2, product_id: 1, quantity: 1, price: 9.99 },
        { cart_id: 2, product_id: 2, quantity: 1, price: 9.99 },
        { cart_id: 3, product_id: 1, quantity: 1, price: 9.99 },
      ])
    })
}
