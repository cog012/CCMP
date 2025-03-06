const express = require('express')
const router = new express.Router
const { mongoUpload, authenticateUser, checkExistUser, createUser, getUserId } = require('../sdk/mongo')

router.post('/upload', (req, res) => {
    if (!req.query.user || !req.query.objectCategory || !req.query.objectName || !req.query.objectDescription) return res.status(400).json({ message: 'user/objectName/objectCategory/objectDescription required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const objectCategory = req.query.objectCategory
    const objectName = req.query.objectName
    const objectDescription = req.query.objectDescription
    mongoUpload({ email: email, password: password, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription })
        .then(newObjectId => {
            res.send({
                newObjectId: newObjectId
            })
        })
})

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