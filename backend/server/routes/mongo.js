const express = require('express')
const router = new express.Router

router.post('/login', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    res.send({
        isAuthenticated: true
    })
})

router.post('/register', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    res.send({
        isRegisterSuccess: true
    })
})

module.exports = router