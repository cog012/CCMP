const express = require('express')
const router = new express.Router
const { mongoTagCreate, mongoTagList, mongoObjectList, mongoObjectListAll, mongoObjectToggleValid, mongoObjectUpload, changeCredential, authenticateUser, checkExistUser, createUser } = require('../sdk/mongo')
router.post('/tagCreate', (req, res) => {
    if (!req.query.tagName) return res.status(400).json({ message: 'tagName required' })
    const tagName = req.query.tagName
    mongoTagCreate({ tagName: tagName })
        .then(newTagId => {
            res.send({
                newTagId: newTagId
            })
        })
})

router.get('/tagList', (req, res) => {
    mongoTagList()
        .then(tagList => {
            res.send({
                tagList: tagList
            })
        })
})

router.get('/objectList', (req, res) => {
    if (!req.query.objectCategory) return res.status(400).json({ message: 'objectCategory required' })
    const objectCategory = req.query.objectCategory
    if (objectCategory == 'all') {
        mongoObjectListAll()
            .then(objectList => {
                res.send({
                    objectList: objectList
                })
            })
    } else {
        mongoObjectList({ objectCategory: objectCategory })
            .then(objectList => {
                res.send({
                    objectList: objectList
                })
            })
    }
})

router.get('/objectToggleValid', (req, res) => {
    //It's safe to allow users to mark objects as Valid/inValid so GET request are used
    if (!req.query.objectId || !req.query.newValidity) return res.status(400).json({ message: 'objectId/newValidity required' })
    const objectId = req.query.objectId
    const newValidity = req.query.newValidity
    mongoObjectToggleValid({ objectId: objectId, newValidity: newValidity })
        .then(isModified => {
            res.send({
                isModified: isModified
            })
        })
})

router.post('/objectUpload', (req, res) => {
    if (!req.query.user || !req.query.objectCategory || !req.query.objectName || !req.query.objectDescription || !req.query.tagId) return res.status(400).json({ message: 'user/objectCategory/objectName/objectDescription/tagId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const objectCategory = req.query.objectCategory
    const objectName = req.query.objectName
    const objectDescription = req.query.objectDescription
    const tagId = req.query.tagId
    mongoObjectUpload({ email: email, password: password, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription, tagId: tagId })
        .then(newObjectId => {
            res.send({
                newObjectId: newObjectId
            })
        })
})

router.post('/changeCredential', (req, res) => {
    if (!req.query.user || !req.query.newEmail || !req.query.newPassword) return res.status(400).json({ message: 'user/newEmail/newPassword required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const newEmail = req.query.newEmail
    const newPassword = req.query.newPassword
    changeCredential({ email: email, password: password, newEmail: newEmail, newPassword: newPassword })
        .then(isModified => {
            res.send({
                isModified: isModified
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