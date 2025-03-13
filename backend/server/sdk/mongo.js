const { MongoClient, ObjectId } = require('mongodb')
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)

const database = client.db('CCMP')
const adminCollection = database.collection('admin')
const usersCollection = database.collection('users')
const audiosCollection = database.collection('audios')
const videosCollection = database.collection('videos')
const imagesCollection = database.collection('images')
const filesCollection = database.collection('files')
const tagsCollection = database.collection('tags')

async function mongoTagSuspend({ email, password, adminToken, tagId }) {
    try {
        const isAdmin = await authenticateAdmin({ email: email, password: password, adminToken: adminToken })
        if (isAdmin == true) {
            const filter = { _id: new ObjectId(tagId) }
            const update = { $set: { isSuspend: true } }
            const data = await tagsCollection.updateOne(filter, update)
            if (data.modifiedCount != 0) {
                console.log("Tag Suspended")
                const isModified = true
                return isModified
            }
        }
    } catch (err) {

    } finally {

    }
}

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
        const projection = { _id: 1, tagName: 1, isSuspend: 1 }
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
        const objectList = videosList.concat(audiosList, imagesList, filesList)
        return objectList
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectListAll executed")
    }
}

async function mongoObjectListAdmin({ email, password, adminToken }) {
    try {
        const isAdmin = await authenticateAdmin({ email: email, password: password, adminToken: adminToken })
        if (isAdmin == true) {
            const filter = {}
            const projection = { _id: 1, uploaderId: 1, objectName: 1, objectDescription: 1, objectTag: 1, isValid: 1, isSuspend: 1 }
            const videosList = await videosCollection.find(filter, { projection: projection }).toArray()
            const audiosList = await audiosCollection.find(filter, { projection: projection }).toArray()
            const imagesList = await imagesCollection.find(filter, { projection: projection }).toArray()
            const filesList = await filesCollection.find(filter, { projection: projection }).toArray()
            const objectList = videosList.concat(audiosList, imagesList, filesList)
            return objectList
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectListAdmin executed")
    }
}

async function mongoObjectToggleValid({ objectId, newValidity }) {
    try {
        const filter = { _id: new ObjectId(objectId) }
        const update = { $set: { isValid: newValidity } }
        const videosRSP = await videosCollection.updateOne(filter, update)
        const audiosRSP = await audiosCollection.updateOne(filter, update)
        const imagesRSP = await imagesCollection.updateOne(filter, update)
        const filesRSP = await filesCollection.updateOne(filter, update)

        if (videosRSP.modifiedCount != 0 || audiosRSP.modifiedCount != 0 || imagesRSP.modifiedCount != 0 || filesRSP.modifiedCount != 0) {
            console.log("modified successful")
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectToggleValid executed")
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

async function mongoObjectSuspend({ email, password, adminToken, objectId }) {
    try {
        const isAdmin = await authenticateAdmin({ email: email, password: password, adminToken: adminToken })
        if (isAdmin == true) {
            const filter = { _id: new ObjectId(objectId) }
            const update = { $set: { isSuspend: true } }
            const videosRSP = await videosCollection.updateOne(filter, update)
            const audiosRSP = await audiosCollection.updateOne(filter, update)
            const imagesRSP = await imagesCollection.updateOne(filter, update)
            const filesRSP = await filesCollection.updateOne(filter, update)
            if (videosRSP.modifiedCount != 0 || audiosRSP.modifiedCount != 0 || imagesRSP.modifiedCount != 0 || filesRSP.modifiedCount != 0) {
                console.log("Object Suspend successful")
                const isModified = true
                return isModified
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("mongoObjectSuspend executed")
    }
}

async function changeCredential({ email, password, newEmail, newPassword }) {
    try {
        const filter = { email: email, password: password }
        console.log(filter)
        const update = { $set: { email: newEmail, password: newPassword } }
        console.log(update)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 1) {
            console.log("modified successful")
            const isModified = true
            return isModified
        }

    } catch (err) {
        console.log(err)
    } finally {
        console.log("changeCredential executed")
    }
}

async function authenticateAdmin({ email, password, adminToken }) {
    try {
        const query = { email: email, password: password }
        const user = await usersCollection.findOne(query)
        const userId = user._id
        const queryAdmin = { userId: userId, adminToken: adminToken }
        const matchedAdmin = await adminCollection.countDocuments(queryAdmin)
        if (matchedAdmin == 0) {
            const isAuthenticated = false
            return isAuthenticated
        } else {
            const isAuthenticated = true
            return isAuthenticated
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("authenticateAdmin executed")
    }
}

async function authenticateUser({ email, password }) {
    //authenticate the user with given email and password
    try {
        const query = { email: email, password: password, isSuspend: false }
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
        const newUser = { email: email, password: password, isSuspend: false }
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

async function listUser({ email, password, adminToken }) {
    try {
        const isAdmin = await authenticateAdmin({ email: email, password: password, adminToken: adminToken })
        if (isAdmin == true) {
            const filter = {}
            const projection = { _id: 1, email: 1, isSuspend: 1 }
            const userList = await usersCollection.find(filter, { projection: projection })
            return userList.toArray()
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("listUser executed")
    }
}

async function suspendUser({ email, password, adminToken, targetUserId }) {
    try {
        const isAdmin = await authenticateAdmin({ email: email, password: password, adminToken: adminToken })
        if (isAdmin == true) {
            const filter = { _id: new ObjectId(targetUserId) }
            const update = { $set: { isSuspend: true } }
            const data = await usersCollection.updateOne(filter, update)
            if (data.modifiedCount != 0) {
                console.log("User Suspended")
                const isModified = true
                return isModified
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("suspendUser executed")
    }
}



module.exports = { mongoTagSuspend, mongoTagCreate, mongoTagList, mongoObjectList, mongoObjectListAll, mongoObjectListAdmin, mongoObjectToggleValid, mongoObjectUpload, mongoObjectSuspend, changeCredential, authenticateAdmin, authenticateUser, checkExistUser, createUser, listUser, suspendUser }
