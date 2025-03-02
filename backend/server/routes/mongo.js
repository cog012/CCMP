const express = require('express')
const router = new express.Router

router.post('/login', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    res.send({
        isAuthenticated: true
    })
})

module.exports = router