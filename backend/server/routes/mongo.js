const express = require('express')
const router = new express.Router
const { authenticateUser, checkExistUser, createUser, getUserId } = require('../sdk/mongo')

router.post('/login', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    const email = req.query.email
    const password = req.query.password
    authenticateUser({
        email: email,
        password: password
    }).then(isAuthenticated => {
        res.send({
            isAuthenticated: isAuthenticated
        })
    })
})

router.post('/validate', (req, res) => {
    if (!req.query.email) return res.status(400).json({ message: 'email required' })
    const email = req.query.email
    checkExistUser({
        email: email
    }).then(isUserExist => {
        res.send({
            isUserExist: isUserExist
        })
    })
})

router.post('/register', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    const email = req.query.email
    const password = req.query.password
    checkExistUser({
        email: email
    }).then(isUserExist => {
        if (isUserExist == false) {
            createUser({
                email: email,
                password: password
            }).then(isRegisterSuccess => {
                res.send({
                    isRegisterSuccess: isRegisterSuccess
                })
            })
        } else {
            res.send({
                isRegisterSuccess: false
            })
        }
    })
})

module.exports = router