const express = require('express')
const bodyParser = require('body-parser')
const mountRoutes = require('./routes')
const passport = require('passport')


const port = process.env.PORT

const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
mountRoutes(app)


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})