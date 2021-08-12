exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cart_items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_items').insert([
        { id: 1, cart_id: 1, product_id: 1, quantity: 1, price: 9.99 },
        { id: 2, cart_id: 1, product_id: 2, quantity: 1, price: 9.99 },
        { id: 3, cart_id: 1, product_id: 3, quantity: 1, price: 9.99 },
        { id: 4, cart_id: 2, product_id: 1, quantity: 1, price: 9.99 },
        { id: 5, cart_id: 2, product_id: 2, quantity: 1, price: 9.99 },
        { id: 6, cart_id: 3, product_id: 1, quantity: 1, price: 9.99 },
      ])
    })
}
