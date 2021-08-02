const Router = require('express-promise-router')

const db = require('../db')

const router = new Router()

router.get('/', async (req, res) => {
    res.send(await db.query('SELECT NOW()'))
})

module.exports = router

