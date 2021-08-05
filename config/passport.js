const passport = require('passport-local')
const { LocalStrategy } = require('passport-local')

const db = require('../db')

passport.use(new LocalStrategy((username, password, done) => {
    try {
        const { row } = await db.query('SELECT id FROM users WHERE email=$1', [username])
        const user = row[0]
    } catch (e) {
        return done(e)
    }

    if (!user) {return done (null, false)}

    bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
            done(null, {id: user.id, username: user.email})
        } else {
            done(null, false)
        }
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const { rows } = await db.query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)])
    const user = rows[0]
    done(null, user)
})