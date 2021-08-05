const passport = require('passport')
const Strategy = require('passport-local')
const crypto = require('crypto')

const db = require('../db')

passport.use( new Strategy(async (username, password, cb) => {
    try {
        const { row } = await db.query('SELECT id, email, password FROM users where email = $1', [username])
        const user = row[0]
    } catch (e) {
        return cb(e)
    }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password'})}

    crypto.pbkdf2(passport, 'salt', 100000, 32, 'sha256', (err, hashedPassword) => {
        if (err) { return cb(err) }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password'})
        }
        return cb(null, {id: user.id, username: user.email})
    })

}))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.email });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });