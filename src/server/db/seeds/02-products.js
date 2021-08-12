exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1,
          name: 'Artic Hat',
          description: 'Evaporative Cooling Inner Liner Works Using Just Water',
          price: 19.99,
        },
        {
          id: 2,
          name: 'Snuggie',
          description: 'A blanket with arms! ',
          price: 59.99,
        },
        {
          id: 3,
          name: 'Slap-chop',
          description: 'Chop veggies like a ninja!',
          price: 20.99,
        },
      ])
    })
}
