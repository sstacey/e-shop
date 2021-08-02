const Router = require('express-promise-router')
const bcrypt = require('bcrypt')

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

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const query = {
            text: 'INSERT INTO users VALUES(DEFAULT, $1, $2);',
            values: [req.body.email, hashedPassword]
        }
        await db.query(query)
        res.status(201).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
    
})

module.exports = router

