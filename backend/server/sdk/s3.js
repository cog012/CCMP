const { S3 } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')

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


async function listAllObjects() {
    //list all objects in S3_BUCKET

    try {
        const params = {
            Bucket: process.env.S3_BUCKET
        }
        const data = await s3Client.listObjectsV2(params)
        return data
    } catch (err) {
        console.error(err)
    } finally {
        console.log("listAllObjects Executed")
    }

}

async function getUrl({ objectKey }) {
    //currently unavailable with DO Spaces CDN
    //get presignedUrl of an object from S3 using given objectKey

    // try {
    //     const params = {
    //         Bucket: process.env.S3_BUCKET,
    //         Key: objectKey
    //     }
    //     const url = await getSignedUrl(s3Client.getObject(params))
    //     return url
    //     // const data = await s3Client.getObject(params)
    //     // return data
    // } catch (err) {
    //     console.error(err)
    // } finally {
    //     console.log("getObject Executed")
    // }

}

async function getObject({ objectKey }) {
    //retrive object from S3 using given objectKey

    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: objectKey
        }
        const data = await s3Client.getObject(params)
        return data
    } catch (err) {
        console.error(err)
    } finally {
        console.log("getObject Executed")
    }

}


async function uploadObject({ objectKey, objectBody }) {
    //here Upload function from aws-sdk/lib-storage being used to support uploading of buffer/blobs/streams
    //upload object to S3 using given objectKey and objectBody(large files multipart upload)
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: objectKey,
            Body: objectBody
        }
        const s3Upload = new Upload({
            client: s3Client,
            params: params
        })
        // // upload progress indicator(future feature for large files maybe)
        // s3Upload.on('httpUploadProgress', (progress) => {
        //     console.log(progress)
        // })
        const data = await s3Upload.done()
        return data
    } catch (err) {
        console.error(err)
    } finally {
        console.log("uploadObject Executed")
    }


}


async function putObject({ objectKey, objectBody }) {
    //put object to S3 using given objectKey and objectBody(small files capped at 5GB)

    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: objectKey,
            Body: objectBody
        }
        const data = await s3Client.putObject(params)
        return data
    } catch (err) {
        console.error(err)
    } finally {
        console.log("putObject Executed")
    }


}


async function deleteObject({ objectKey }) {
    //delete object from S3 using given objectKey

    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: objectKey
        }
        const data = await s3Client.deleteObject(params)
        return data
    } catch (err) {
        console.error(err)
    } finally {
        console.log("deleteObject Executed")
    }

}




module.exports = { listAllObjects, getUrl, getObject, uploadObject, putObject, deleteObject }
