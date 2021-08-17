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
    user.id = res.body.user.id
  })

  it('should log user in', async () => {
    const res = await request(app).post('/login').send(user)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
    user.token = res.body.token
  })
})

describe('User Endpoints', () => {
  it('GET /users/4 should return single user', async () => {
    const res = await request(app)
      .get(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })
})

describe('/products', () => {
  it('should respond with list of products', async () => {
    const res = await request(app)
      .get('/products')
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })

  it('should respond with product given id', async () => {
    const res = await request(app)
      .get('/products/1')
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })

  it('should add a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'Desc',
      price: 99.99,
    }
    const res = await request(app)
      .post('/products')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newProduct)
    expect(res.statusCode).toEqual(201)
  })

  it('should not add a new product missing name', async () => {
    const newProduct = {
      description: 'Desc',
      price: 99.99,
    }
    const res = await request(app)
      .post('/products')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newProduct)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('errors')
  })

  it('should not allow unauthenticed user to view proucts', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(401)
  })

  it('should update a product', async () => {
    const updatedProduct = {
      name: 'UPDATED PRODUCT NAME',
    }
    const res = await request(app)
      .put('/products/1')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(updatedProduct)
    expect(res.statusCode).toEqual(204)
  })

  it('should delete a product', async () => {
    const res = await request(app)
      .delete('/products/1')
      .set({ Authorization: `Bearer ${user.token}` })

    expect(res.statusCode).toBe(204)
  })
})

describe('/carts', () => {
  it('should return all carts', async () => {
    const res = await request(app)
      .get('/cart')
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })

  it('should return cart by id', async () => {
    const res = await request(app)
      .get('/cart/1')
      .set({ Authorization: `Bearer ${user.token}` })
    expect(res.statusCode).toEqual(200)
  })

  // it('should add new product to cart', async () => {
  //   const res = await request(app)
  //     .post('/cart/1')
  //     .set({ Authorization: `Bearer ${user.token}` })
  //     .send({
  //       product_id: 1,
  //       quantity: 1,
  //       price: 9.97,
  //     })
  //   expect(res.statusCode).toEqual(201)
  // })
})
