const express = require('express')
const router = new express.Router
const { authenticateUser, checkExistUser, createUser, getUserId } = require('../sdk/mongo')
const { uploadObject } = require('../sdk/s3')
const { formidable } = require('formidable')
const { PassThrough } = require('stream')



router.post('/upload', (req, res) => {
    if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey required' })
    const objectKey = req.query.objectKey
    function fileWriteStreamHandler(file) {
        const pass = new PassThrough()
        uploadObject({
            objectKey: objectKey,
            objectBody: pass
        }).then(data => {
            console.log(data)
            res.send({ response: `S3 upload successful` })
        })
        return pass
    }

    //set maxFileSize limit for the formData 
    const formOptions = {
        fileWriteStreamHandler: fileWriteStreamHandler,
        maxFileSize: 2 * 1024 * 1024 * 1024
    }
    const form = formidable(formOptions)
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({
                message: err.message || 'Unexpected error occured'
            })
            return
        }
        console.log(fields)
    })
    // if (!req.query.user || !req.query.objectName || !req.query.objectCategory || !req.query.objectDescription) return res.status(400).json({ message: 'user/objectName/objectCategory/objectDescription required' })
    // const user = req.query.user
    // const objectName = req.query.objectName
    // const objectCategory = req.query.objectCategory
    // const objectDescription = req.query.objectDescription
    // console.log('commencing')
    // mongoUpload({ user: user, objectName: objectName, objectCategory: objectCategory, objectDescription: objectDescription })

})


































module.exports = router