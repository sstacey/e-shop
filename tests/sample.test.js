process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const knex = require('../src/server/db/knex')

beforeAll(async () => {
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
})

afterAll(async () => {
  await knex.migrate.rollback()
  await knex.destroy()
})

const user = {
  email: 'testuser4@example.com',
  password: 'password',
}

describe('Auth Endpoints', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/signup').send(user)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.email).toBe(user.email)
  })

  it('should log user in', async () => {
    const res = await request(app).post('/login').send(user)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
    user.token = res.body.token
  })
})

describe('User Endpoints', () => {
  it('GET /users/1 should return single user', async () => {
    const res = await request(app)
      .get('/users/1')
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })
})
