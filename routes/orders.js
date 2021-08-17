const Router = require('express-promise-router')

// const db = require('../db')
const knex = require('../src/server/db/knex')

const router = new Router()

router.param('id', async (req, res, next) => {
  const orders = await knex('orders').where('id', req.params.id)

  if (orders[0]) {
    req.order = orders[0]
    next()
  } else {
    res.status(404).send()
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await knex().select().from('orders')
    res.json(orders)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/:id', async (req, res) => {
  res.send(req.order)
})

router.post('/', async (req, res) => {
  const { user_id, total } = req.body

  try {
    const newOrder = await knex('orders')
      .insert({ user_id, total })
      .returning('*')
    res.status(201).send(newOrder[0])
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await knex('orders').where('id', req.params.id).del()
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// order items routes
router.get('/:id/items', async (req, res) => {
  try {
    const order_items = await knex()
      .select('*')
      .from('order_items')
      .innerJoin('orders', 'orders.id', 'order_items.order_id')
      .innerJoin('products', 'products.id', 'order_items.product_id')
      .where('order_items.order_id', req.order.id)
    res.json({ order_items })
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.post('/:id/items', async (req, res) => {
  const { product_id, order_id, quantity, price } = req.body
  const query = {
    text: `INSERT INTO orders_item
                VALUES(DEFAULT, $1, $2, $3, $4)
                RETURNING *;`,
    values: [product_id, order_id, quantity, price],
  }
  try {
    const newItem = await knex('order_items')
      .insert({
        product_id,
        order_id,
        quantity,
        price,
      })
      .returning('*')
    res.send(newItem[0])
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router
