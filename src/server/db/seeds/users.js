exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'shaun@gmail.com', password: 'password' },
        { email: 'testuser1@gmail.com', password: 'password' },
        { email: 'testuser2@gmail.com', password: 'password' },
      ])
    })
}
