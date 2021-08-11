const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const knex = require('../src/server/db/knex')

const db = require('../db')
const { ExtractJwt } = require('passport-jwt')

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      console.log(hashedPassword)
      try {
        const newUser = await knex('users').returning(['id', 'email']).insert({
          email,
          password: hashedPassword,
        })
        return done(null, newUser[0])
      } catch (e) {
        return done(e.message)
      }

      // const query = {
      //   text: 'INSERT INTO users VALUES (default, $1, $2) RETURNING id, email',
      //   values: [email, hashedPassword],
      // }
      // try {
      //   const { rows } = await db.query(query)
      //   return done(null, rows[0])
      // } catch (e) {
      //   done(e.message)
      // }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // const { rows } = await db.query(
        //   'SELECT * FROM users WHERE email = $1',
        //   [email]
        // )
        // const user = rows[0]
        const users = await knex('users').where('email', email)
        user = users[0]

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await bcrypt.compare(password, user.password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
