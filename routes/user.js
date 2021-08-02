const Router = require('express-promise-router')

const db = require('../db')

const router = new Router()

router.get('/', async (req, res) => {
    const { rows } = await db.query("SELECT * FROM users")
    res.json(rows)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.query('SELECT * FROM users where id = $1', [id])
    res.send(rows[0])
})

module.exports = router

