const express = require('express')
const { s3Connect, listObject, uploadObject, deleteObject } = require('../sdk/s3')
const router = new express.Router

router.get('/list', (req, res) => {
    s3Connect()
})

router.post('/upload', (req, res) => {
    // if (!req.query.objectKey || !req.query.objectBody) return res.status(400).json({ message: 'objectKey and objectBody is required' })
    // uploadObject({
    //     objectKey: req.query.objectKey,
    //     objectBody: req.query.objectBody,
    // })
})

router.post('/delete', (req, res) => {
    // if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
    // deleteObject({
    //     objectKey: req.query.objectKey
    // })
})

router.get('/get', (req, res) => {
    if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
    deleteObject({
        objectKey: req.query.objectKey
    })
})


module.exports = router