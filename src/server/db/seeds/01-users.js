const bcrypt = require('bcrypt')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function () {
      // Inserts seed entries
      const hashedPassword = await bcrypt.hash('password', 10)
      return knex('users').insert([
        { id: 1, email: 'shaun@gmail.com', password: hashedPassword },
        { id: 2, email: 'testuser1@gmail.com', password: hashedPassword },
        { id: 3, email: 'testuser2@gmail.com', password: hashedPassword },
      ])
    })
}
