const { MongoClient, ObjectId } = require('mongodb')
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)

const database = client.db('CCMP')
const usersCollection = database.collection('users')
const audiosCollection = database.collection('audios')
const videosCollection = database.collection('videos')
const imagesCollection = database.collection('images')
const filesCollection = database.collection('files')
const tagsCollection = database.collection('tags')

async function mongoTagCreate({ tagName }) {
    try {
        const newTag = { tagName: tagName, isSuspend: false }
        const data = await tagsCollection.insertOne(newTag)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoTagCreate executed")
    }
}

async function mongoTagList() {
    try {
        const filter = { isSuspend: false }
        const projection = { _id: 1, tagName: 1 }
        const tagList = await tagsCollection.find(filter, { projection: projection })
        return tagList.toArray()
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoTagList executed")
    }
}

async function mongoObjectList({ objectCategory }) {
    try {
        var targetCollection
        switch (objectCategory) {
            case 'videos':
                targetCollection = videosCollection
                break
            case 'audios':
                targetCollection = audiosCollection
                break
            case 'images':
                targetCollection = imagesCollection
                break
            case 'files':
                targetCollection = filesCollection
                break
        }
        const filter = { isSuspend: false }
        const projection = { _id: 1, objectName: 1, objectDescription: 1, objectTag: 1, isValid: 1 }
        const objectList = await targetCollection.find(filter, { projection: projection })
        const objectArray = objectList.toArray()
        return objectArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectList executed")
    }
}

async function mongoObjectListAll() {
    try {
        const filter = { isSuspend: false }
        const projection = { _id: 1, objectName: 1, objectDescription: 1, objectTag: 1, isValid: 1 }
        const videosList = await videosCollection.find(filter, { projection: projection }).toArray()
        const audiosList = await audiosCollection.find(filter, { projection: projection }).toArray()
        const imagesList = await imagesCollection.find(filter, { projection: projection }).toArray()
        const filesList = await filesCollection.find(filter, { projection: projection }).toArray()
        const allObjectList = videosList.concat(audiosList, imagesList, filesList)
        return allObjectList
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectListAll executed")
    }
}

async function mongoObjectUpload({ email, password, objectCategory, objectName, objectDescription, tagId }) {
    try {
        var targetCollection
        switch (objectCategory) {
            case 'videos':
                targetCollection = videosCollection
                break
            case 'audios':
                targetCollection = audiosCollection
                break
            case 'images':
                targetCollection = imagesCollection
                break
            case 'files':
                targetCollection = filesCollection
                break
        }
        const uploader = await usersCollection.findOne({ email: email, password: password })
        const uploaderId = uploader._id
        const objectTag = await tagsCollection.findOne({ _id: new ObjectId(tagId) })
        const newObject = { uploaderId: uploaderId, objectName: objectName, objectDescription: objectDescription, objectTag: objectTag, isValid: true, isSuspend: false }
        console.log(newObject)
        const data = await targetCollection.insertOne(newObject)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectUpload executed")
    }
}

async function authenticateUser({ email, password }) {
    //authenticate the user with given email and password
    try {
        const query = { email: email, password: password }
        const matchedUser = await usersCollection.countDocuments(query)
        if (matchedUser == 0) {
            const isAuthenticated = false
            return isAuthenticated
        } else {
            const isAuthenticated = true
            return isAuthenticated
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("authenticateUser executed")
    }
}

async function createUser({ email, password }) {
    //create new user in users collection using given email and password
    try {
        const newUser = { email: email, password: password, ismod: false, issuspend: false }
        const data = await usersCollection.insertOne(newUser)
        if (data.acknowledged == true) {
            const isRegisterSuccess = true
            return isRegisterSuccess
        } else {
            const isRegisterSuccess = false
            return isRegisterSuccess
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("createUser executed")
    }

}

async function checkExistUser({ email }) {
    //check if user with specific email exists in userCollection
    try {
        const query = { email: email }
        const matchedUser = await usersCollection.countDocuments(query)
        if (matchedUser == 0) {
            const isUserExist = false
            return isUserExist
        } else {
            const isUserExist = true
            return isUserExist
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("checkExistUser executed")
    }
}



module.exports = { mongoTagCreate, mongoTagList, mongoObjectList, mongoObjectListAll, mongoObjectUpload, authenticateUser, checkExistUser, createUser }
