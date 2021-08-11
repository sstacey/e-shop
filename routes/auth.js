const express = require('express')
const { session } = require('passport')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.status(201).json({
      message: 'Signup Successful',
      user: req.user,
    })
  }
)

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(info.message)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { id: user.id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

module.exports = router
