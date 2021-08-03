const Router = require('express-promise-router')

const db = require('../db')

const router = new Router()

router.param('id', async (req, res, next) => {
    const query = {
        text: 'SELECT * FROM orders WHERE id = $1',
        values: [req.params.id]
    }

    const { rows } = await db.query(query)

    if (rows[0]) {
        req.order = rows[0]
        next()
    } else {
        res.status(404).send()
    }
})

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM orders ORDER BY id')
        res.send(rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/:id', async (req, res) => {
    res.send(req.order)
})

router.post('/', async (req, res) => {
    const { user_id, total } = req.body
    const query = {
        text:   `INSERT INTO orders 
                VALUES(DEFAULT, $1, $2) 
                RETURNING *;`,
        values: [user_id, total]
    }
    try {
        const newitem = await db.query(query)
        res.status(201).send(newitem.rows[0])
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM orders WHERE id = $1', [req.order.id])
        res.status(204).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// order items routes
router.get('/:id/items', async (req, res) => {
    const query = {
        text:  `SELECT product.name, orders_item.quantity, orders_item.price
                FROM orders_item 
                INNER JOIN orders 
                ON orders_item.order_id = orders.id
                INNER JOIN product
                ON orders_item.product_id = product.id
                WHERE orders.id = $1;`,
        values: [req.order.id]
    }
    try {
        const { rows } = await db.query(query)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/:id/items', async (req, res) => {
    const { product_id, order_id, quantity, price } = req.body
    const query = {
        text:  `INSERT INTO orders_item
                VALUES(DEFAULT, $1, $2, $3, $4)
                RETURNING *;`,
        values: [product_id, order_id, quantity, price]
    }
    try {
        const newItem = await db.query(query)
        res.send(newItem.rows[0])
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router

