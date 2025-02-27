const express = require('express')
const router = new express.Router

router.use('/users', require('./users'))

router.use('/spotify', require('./spotify'))

router.use('/s3', require('./s3'))

router.get('/about', (req, res) => {
    res.send('This is the about page');
})

router.post('/submit', (req, res) => {
    res.send('Got a POST request');
})


module.exports = router