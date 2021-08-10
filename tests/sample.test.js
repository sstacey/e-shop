const request = require('supertest')
const app = require('../app')

describe('Auth Endpoints', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/signup').send({
      email: 'testuser1@example.com',
      password: 'password',
    })
    expect(res.statusCode).toEqual(201)
  })
})
