const Router = require('express-promise-router')
const format = require('pg-format')

const db = require('../db')

const router = new Router()

router.param('id', async (req, res, next) => {
    const { id } = req.params
    const { rows } = await db.query('SELECT * FROM product where id = $1', [id])
    if (rows[0]) {
        req.product = rows[0]
        next()
    } else {
        res.status(404).send()
    }
})

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM product')
    res.json(rows)
})

router.get('/:id', async (req, res) => {
    res.send(req.product)
})

router.post('/', async (req, res) => {
    const { name, description, price} = req.body
    try {
        const newitem = await db.query('INSERT INTO product VALUES(DEFAULT, $1, $2, $3) RETURNING *', [name, description, price])
        res.status(201).send(newitem.rows[0])
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.put('/:id', async (req, res) => {
    const updates = req.body
    try {
        for (let key in updates) {
            await db.query(format('UPDATE product SET %I = %L WHERE id = %L',key, updates[key], req.product.id))
        }
        res.status(204).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM product WHERE id = $1', [req.product.id])
        res.status(204).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router