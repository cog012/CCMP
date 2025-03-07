const express = require('express')
const router = new express.Router
// const { authenticateUser, checkExistUser, createUser, getUserId } = require('../sdk/mongo')
// const { listAllObjects, getObject, uploadObject, deleteObject, } = require('../sdk/s3')
// const { formidable } = require('formidable')
// const { PassThrough } = require('stream')


// router.get('/get', (req, res) => {
//     //execute getObject() function and stream the object to client when '/get' endpoint receives get request with specified objectKey
//     if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
//     const objectKey = req.query.objectKey
//     console.log(objectKey)
//     getObject({
//         objectKey: objectKey
//     }).then((data => {
//         //data.Body is a readable stream
//         const stream = data.Body
//         stream.pipe(res)
//     })).catch(err => {
//         res.status(500).json({
//             message: err.message || 'Unexpected error occured'
//         })
//     })
// })

































module.exports = router