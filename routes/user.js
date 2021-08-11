const Router = require('express-promise-router')
const bcrypt = require('bcrypt')
const format = require('pg-format')

const db = require('../db') //CAN REMOVE SOON!
const knex = require('../src/server/db/knex')

const router = new Router()

router.param('id', async (req, res, next) => {
  const foundUser = await knex
    .select('id', 'email')
    .from('users')
    .where({ id: req.params.id })
  if (foundUser[0]) {
    req.user = foundUser[0]
    next()
  } else {
    res.status(404).send()
  }
})

router.get('/:id', async (req, res) => {
  res.send(req.user)
})

router.put('/:id', async (req, res) => {
  const updates = req.body
  if (updates.password) {
    const hashedPassword = await bcrypt.hash(updates.password, 10)
    updates.password = hashedPassword
  }
  try {
    for (let key in updates) {
      await db.query(
        format(
          'UPDATE users SET %I = %L WHERE id = %L',
          key,
          updates[key],
          req.user.id
        )
      )
    }
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router
