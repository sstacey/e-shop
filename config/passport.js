const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const db = require('../db')


passport.use( new Strategy(async (username, password, cb) => {
  try {
      const { row } = await db.query('SELECT id, email, password FROM users where email = $1', [username])
      const user = row[0]
  } catch (e) {
      return cb(e)
  }

  if (!user) { return cb(null, false, { message: 'Incorrect username or password'})}

  const valid = await bcrypt.compare(password, user.password)

  if (valid) {
    return cb(null, {
      id: user.id,
      email: user.email
    })
  } else {
    return cb(null, false, { message: 'Incorrect username or password' })
  }


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


