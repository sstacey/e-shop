const Router = require('express-promise-router')

const knex = require('../src/server/db/knex')

const router = new Router()

router.param('id', async (req, res, next) => {
  const product = await knex('products').where('id', req.params.id)
  if (product[0]) {
    req.product = product[0]
    next()
  } else {
    res.status(404).send()
  }
})

router.get('/', async (req, res) => {
  const products = await knex.select().from('products')
  res.json(products)
})

router.get('/:id', async (req, res) => {
  res.send(req.product)
})

router.post('/', async (req, res) => {
  const { name, description, price } = req.body
  try {
    const newProduct = await knex('products')
      .insert({ name, description, price })
      .returning(['id', 'name', 'description', 'price'])
    res.status(201).send(newProduct[0])
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.put('/:id', async (req, res) => {
  const updates = req.body
  try {
    const updatedProduct = await knex('products')
      .where('id', req.product.id)
      .update(updates)
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await knex('products').where('id', req.params.id).del()
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router
