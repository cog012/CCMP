const express = require('express')
const { createUser, deleteUser } = require('../sdk/users')
const router = new express.Router


router.post('/create', (req, res) => {
    if (!req.query.username || !req.query.password) return res.status(400).json({ message: 'username and password required' })

    createUser({
        username: req.query.username,
        password: req.query.password
    }).then(r => {
        res.json(r)
    }).catch(err => {
        res.status(500).json({
            message: err.message || 'Unexpected error occured'
        })
    })

})

router.get('/edit', (req, res) => {
    res.send('under developing')
})

router.post('/delete', (req, res) => {
    if (!req.query.username || !req.query.password) return res.status(400).json({ message: 'username and password required' })

    deleteUser({
        username: req.query.username,
        password: req.query.password
    })

    res.send('under developing')
})


module.exports = router