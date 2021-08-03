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

router.get('/:id/items', async (req, res) => {
    res.send()
})




module.exports = router

