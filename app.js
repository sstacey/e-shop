const express = require('express')
const mountRoutes = require('./routes')

const app = express()
mountRoutes(app)
const port = process.env.PORT



app.get('/', async (req, res) => {
    res.end('Hello, Mate!')
    
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})