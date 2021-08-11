process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const knex



describe('Auth Endpoints', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/signup').send({
      email: 'testuser3@example.com',
      password: 'password',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('user')
  })
})
