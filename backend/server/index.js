const dotenv = require('dotenv')
dotenv.config()
const express = require('express')

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 3500
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all("*", function (req, res) {
    //Enable CORS(cross-origin-resource-sharing) FOR FRONTEND_URL
    res.header('Access-Control-Allow-Origin', FRONTEND_URL)
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    res.header('Access-Control-Allow-Headers', '*')
    req.next()
})

app.use('/', (req, res, next) => {
    //Log whenever an endpoint receives HTTP requests
    console.log(`[${req.url}] called`)
    // console.log(`body ${req.body}`)
    next()
})

app.use('/s3', require('./routes/s3'))
app.use('/mongo', require('./routes/mongo'))
app.use('/test', require('./routes/test'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//server only listen to localhost for security concern now
app.listen(SERVER_PORT, () => {
    console.log(`CCMP server listening on port ${SERVER_PORT}`)
})

