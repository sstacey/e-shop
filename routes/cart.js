const express = require('express')
const router = express.Router()

const db = require('../db')

router.param('id', async (req, res, next) => {
    const query = {
        text: `SELECT *
               FROM cart
               WHERE cart.id = $1`,
        values: [req.params.id]
    }
    try {
        const { rows } = await db.query(query)
        if (rows[0]) {
            req.cart = rows[0]
            next()
        } else {
            res.status(404).send()
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM cart ORDER BY id')
    res.send(rows)
})

router.get('/:id', async (req, res) => {
    const query = {
        text: `SELECT product.name, cart_items.quantity, cart_items.price
               FROM cart_items
               INNER JOIN product
               ON cart_items.product_id = product.id
               WHERE cart_items.cart_id = $1`,
        values: [req.cart.id]
    }
    try {
        const { rows } = await db.query(query)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/:id', async (req, res) => {
    const { product_id, quantity, price } = req.body
    const query = {
        text: `INSERT INTO cart_items
               VALUES(DEFAULT, $1, $2, $3, $4)
               RETURNING *`,
        values: [req.cart.id, product_id, quantity, price]
    }

    try {
        const { rows } = await db.query(query)
        res.status(201).send(rows[0])
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router