const dotenv = require('dotenv')
dotenv.config()
const express = require('express')

const s3Client = require('./sdk/s3')

const app = express()
const port = process.env.PORT || 4000


app.use('/api', (req, res, next) => {
    console.log(`[${req.url}] called`)
    console.log(`body ${req.body}`)
    next()
})

app.use('/api', require('./routes/central'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`CCMP api listening on port ${port}`)
})