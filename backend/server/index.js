const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
// const { formidable } = require('formidable')
// const { PassThrough } = require('stream')

// const { listAllObjects, getUrl, getObject, uploadObject, putObject, deleteObject, } = require('./sdk/s3')


const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 3500
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all("*", function (req, res) {
    //Enable CORS(cross-origin-resource-sharing) FOR FRONTEND_URL
    res.header('Access-Control-Allow-Origin', FRONTEND_URL)
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    res.header('Access-Control-Allow-Headers', '*')
    req.next()
})

app.use('/', (req, res, next) => {
    console.log(`[${req.url}] called`)
    console.log(`body ${req.body}`)
    next()
})

app.use('/s3', require('./routes/s3'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// app.get('/list', (req, res) => {
//     listAllObjects().then(data => {
//         res.json(data)
//         // let data = JSON.stringify(r)
//         // res.writeHead(200, {
//         //     'Content-type': 'application/json'
//         // })
//         // res.write(data)
//         // res.end()
//     })
// })

// app.get('/getObject', async (req, res) => {
//     if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
//     getObject({
//         objectKey: req.query.objectKey
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

// app.post('/uploadObject', (req, res) => {
//     // if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })

//     function fileWriteStreamHandler(file) {
//         const pass = new PassThrough()
//         uploadObject({
//             objectKey: file.originalFilename,
//             objectBody: pass
//         }).then(data => {
//             console.log(data)
//             res.send(`${file.originalFilename} uploaded`)
//         })
//         return pass
//     }

//     const form = formidable({
//         fileWriteStreamHandler: fileWriteStreamHandler
//     })
//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             res.status(500).json({
//                 message: err.message || 'Unexpected error occured'
//             })
//             return
//         }

//     })

// })

// app.post('/putObject', (req, res) => {
//     // if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
//     // const form = formidable({})
//     // form.parse(req, (err, fields, files) => {
//     //     if (err) {
//     //         next(err)
//     //         return
//     //     }
//     //     const objectKey = fields.objectKey
//     //     const objectBody = files.objectBody[0]._writeStream.WriteStream
//     //     console.log(objectBody)
//     //     putObject({
//     //         objectKey: objectKey,
//     //         objectBody: objectBody
//     //     }).then(data => {
//     //         console.log(data)
//     //     })
//     // })
// })

// app.post('/deleteObject', (req, res) => {
//     //somehow if the target object doesnt exist it still return as deleted
//     if (!req.query.objectKey) return res.status(400).json({ message: 'objectKey is required' })
//     deleteObject({
//         objectKey: req.query.objectKey
//     }).then(data => {
//         console.log(data)
//         res.send(`${req.query.objectKey} deleted`)
//     }).catch(err => {
//         res.status(500).json({
//             message: err.message || 'Unexpected error occured'
//         })
//     })
// })



//server only listen to localhost for security concern now
app.listen(SERVER_PORT, 'localhost', () => {
    console.log(`CCMP server listening on port ${SERVER_PORT}`)
})

