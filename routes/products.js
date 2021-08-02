const Router = require('express-promise-router')

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
    const { rows } = await db.query("SELECT * FROM product")
    res.json(rows)
})

router.get('/:id', async (req, res) => {
    res.send(req.product)
})

router.post('/', async (req, res) => {
    const { name, description, price} = req.body
    try {
        const { rows } = await await db.query('INSERT INTO product VALUES(DEFAULT, $1, $2, $3)', [name, description, price])
        res.status(201).send({name, description, price})
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router