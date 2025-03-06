const express = require('express')
const router = new express.Router
const { mongoUpload } = require('../modules/mongo')



router.post('/upload', (req, res) => {
    if (!req.query.user || !req.query.objectName || !req.query.objectCategory || !req.query.objectDescription) return res.status(400).json({ message: 'user/objectName/objectCategory/objectDescription required' })
    const user = req.query.user
    const objectName = req.query.objectName
    const objectCategory = req.query.objectCategory
    const objectDescription = req.query.objectDescription
    mongoUpload({ user: user, objectName: objectName, objectCategory: objectCategory, objectDescription: objectDescription })
})



































module.exports = router