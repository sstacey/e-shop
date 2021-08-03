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
    try {
        const newitem = await db.query('INSERT INTO orders VALUES(DEFAULT, $1, $2) RETURNING *', [user_id, total])
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
        text: 'SELECT orders_item.product_id FROM orders_item INNER JOIN orders ON orders_item.order_id = orders.id WHERE orders.id = $1;',
        values: [req.order.id]
    }
    try {
        const { rows } = await db.query(query)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})






module.exports = router

