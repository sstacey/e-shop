const express = require('express')
const bodyParser = require('body-parser')
const mountRoutes = require('./routes')


const port = process.env.PORT

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mountRoutes(app)


app.get('/', async (req, res) => {
    res.end('Hello, Mate!')
    
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})