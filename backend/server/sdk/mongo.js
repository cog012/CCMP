const { MongoClient } = require('mongodb')
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)

const database = client.db('CCMP')
const usersCollection = database.collection('users')
const audiosCollection = database.collection('audios')
const videosCollection = database.collection('videos')
const imagesCollection = database.collection('images')
const filesCollection = database.collection('files')

async function mongoList({ objectCategory }) {
    try {

    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoList executed")
    }
}

async function mongoUpload({ email, password, objectCategory, objectName, objectDescription }) {
    try {
        var targetCollection
        switch (objectCategory) {
            case 'audios':
                targetCollection = audiosCollection
                break
            case 'videos':
                targetCollection = videosCollection
                break
            case 'images':
                targetCollection = imagesCollection
                break
            case 'files':
                targetCollection = filesCollection
                break
        }
        const query = { email: email, password: password }
        const user = await usersCollection.findOne(query)
        const userId = user._id
        const newObject = { uploaderId: userId, objectName: objectName, objectDescription: objectDescription }
        const data = await targetCollection.insertOne(newObject)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoUpload executed")
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



module.exports = { mongoList, mongoUpload, authenticateUser, checkExistUser, createUser }
