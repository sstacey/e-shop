exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orders')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { user_id: 1, total: 9.99 },
        { user_id: 1, total: 15.99 },
        { user_id: 1, total: 49.99 },
        { user_id: 2, total: 109.99 },
        { user_id: 2, total: 89.99 },
      ])
    })
}
