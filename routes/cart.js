const express = require('express')
const router = express.Router()

const db = require('../db')
const knex = require('../src/server/db/knex')

router.param('id', async (req, res, next) => {
  //   const query = {
  //     text: `SELECT *
  //                FROM cart
  //                WHERE cart.id = $1`,
  //     values: [req.params.id],
  //   }
  try {
    const carts = await knex('carts').where('id', req.params.id)
    if (carts[0]) {
      req.cart = carts[0]
      next()
    } else {
      res.status(404).send()
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/', async (req, res) => {
  const carts = await knex.select().from('carts')
  res.send(carts)
})

router.get('/:id', async (req, res) => {
  const cart_items = await knex('carts')
    .join('cart_items', 'cart_items.cart_id', '=', 'carts.id')
    .join('products', 'cart_items.product_id', '=', 'products.id')
    .join('users', 'carts.user_id', '=', 'users.id')
    .select(
      'users.email',
      'products.name',
      'cart_items.quantity',
      'cart_items.price'
    )
  res.json({ cart_id: req.params.id, cart_items })
})

router.post('/:id', async (req, res) => {
  const { product_id, quantity, price } = req.body
  const query = {
    text: `INSERT INTO cart_items
               VALUES(DEFAULT, $1, $2, $3, $4)
               RETURNING *`,
    values: [req.cart.id, product_id, quantity, price],
  }

  try {
    const { rows } = await db.query(query)
    res.status(201).send(rows[0])
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.post('/:id/checkout', async (req, res) => {
  const processPayment = () => {
    return true
  }

  if (!processPayment()) {
    return res.status(500).send('Payment not approved')
  }

  const query = {
    text: `UPDATE cart SET ordered = true WHERE id = $1 RETURNING *`,
    values: [req.cart.id],
  }

  try {
    const { rows } = await db.query(query)
    res.send(rows[0])
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router
