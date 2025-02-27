const { S3 } = require('@aws-sdk/client-s3')
const s3Client = new S3({
    //region is fixed for verification purposes but the payload always sent to the specified custom endpoint
    forcePathStyle: false,
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET
    }
})

var object_list

listAllObjects()

// async function s3Connect() {
//     //connect to S3 on startup and display all objects
//     const params = { Bucket: process.env.S3_BUCKET }
//     s3Client.listObjectsV2(params, function (err, data) {
//         if (err) {
//             console.error('[S3] FATAL ERROR:', err)
//         } else {
//             console.log("CCMP S3 BUCKET connected")
//             console.log(data)
//         }
//     })
// }


async function listAllObjects() {
    //list all objects in S3_BUCKET


    // const params = {
    //     Bucket: process.env.S3_BUCKET
    // }
    // s3Client.listObjectsV2(params, function (err, data) {
    //     if (err) {
    //         console.log("Error", err)
    //     } else {
    //         console.log("Success")
    //         resolve(data)
    //     }
    // })
}

function uploadObject({ objectKey, objectBody }) {
    //upload object to S3 using given objectKey and objectBody
    // const uploadParams = {
    //     Bucket: process.env.S3_BUCKET,
    //     Key: objectKey,
    //     Body: objectBody
    // }
    // s3Client.putObject(uploadParams, function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     }
    //     if (data) {
    //         console.log("Upload Success", data.Location)
    //     }
    // })
}

function deleteObject({ objectKey }) {
    //delete object from S3 using given objectKey
    // const deleteParams = {
    //     Bucket: process.env.S3_BUCKET,
    //     Key: objectKey
    // }
    // s3Client.deleteObject(deleteParams, function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     }
    //     if (data) {
    //         console.log("Delete Success")
    //     }
    // })
}

function getObject({ objectKey }) {
    //retrive object from S3 using given objectKey
    const getParams = {
        Bucket: process.env.S3_BUCKET,
        Key: objectKey
    }
    s3Client.getObject(getParams, function (err, data) {
        if (err) {
            console.log("Error", err)
        }
        if (data) {
            console.log("Get Success")
        }
    })
}



module.exports = { s3Client, uploadObject, deleteObject, getObject }
