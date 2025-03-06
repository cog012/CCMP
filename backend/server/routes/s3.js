const express = require('express')
const router = new express.Router
const { listAllObjects, getObject, uploadObject, deleteObject, } = require('../sdk/s3')
const { formidable } = require('formidable')
const { PassThrough } = require('stream')

router.get('/list', (req, res) => {
    //execute listAllObjects() function and return json data to client when '/list' endpoint receives get request
    listAllObjects().then(data => {
        res.json(data)
    })
})

router.get('/get', (req, res) => {
    //execute getObject() function and stream the object to client when '/get' endpoint receives get request with specified objectKey
    if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
    getObject({
        objectKey: req.query.objectKey
    }).then((data => {
        //data.Body is a readable stream
        const stream = data.Body
        stream.pipe(res)
    })).catch(err => {
        res.status(500).json({
            message: err.message || 'Unexpected error occured'
        })
    })
})

router.post('/upload', (req, res) => {
    //execute uploadObject() function and stream the object to s3 when '/upload' endpoint receives post request with object embeded in formData
    //formidable fileWriteStreamHandler() function overwrite the default behavior of writing parsed failes into local file system
    //Instead the parsed file got converted into PassThrough then streamed to S3(With out the 'return' fileWriteStreamHandler() won't work)
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
    //set maxFileSize limit for the formData,2GB for now
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

    })

})

router.post('/delete', (req, res) => {
    //execute deleteObject() function and remove the target object from s3 when '/delete' endpoint receives post request with specified objectKey
    //somehow if the target object doesnt exist it still executes and return as deleted
    if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
    deleteObject({
        objectKey: req.query.objectKey
    }).then(data => {
        console.log(data)
        res.send(`SERVER RESPONSE: ${req.query.objectKey} deleted`)
    }).catch(err => {
        res.status(500).json({
            message: err.message || 'Unexpected error occured'
        })
    })
})


module.exports = router