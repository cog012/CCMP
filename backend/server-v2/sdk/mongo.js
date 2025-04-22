const { MongoClient, ObjectId } = require('mongodb')
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)


const database = client.db('CCMP')
const usersCollection = database.collection('users')
const premiumCollection = database.collection('premium')
const adminCollection = database.collection('admin')
const objectsCollection = database.collection('objects')
const tagsCollection = database.collection('tags')


async function userRegister({ email, password }) {
    //create new user in userscollection using given email and password
    try {
        const regDate = new Date()
        const newUser = { email: email, password: password, alias: 'Anonymous', regDate: regDate, lastUpdate: regDate, isSuspend: false }
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
        console.log("userRegister executed")
    }

}

async function userValidate({ email }) {
    //check if valid account with target email already exist in usersCollection
    try {
        const filter = { email: email }
        const matchedUser = await usersCollection.countDocuments(filter)
        if (matchedUser == 0) {
            const isEmailAvailable = true
            return isEmailAvailable
        } else {
            const isEmailAvailable = false
            return isEmailAvailable
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userValidate executed")
    }
}

async function userAuth({ email, password }) {
    //authenticate the user 
    try {
        const filter = { email: email, password: password, isSuspend: false }
        const matchedUser = await usersCollection.countDocuments(filter)
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
        console.log("userLogin executed")
    }
}

async function userAuthPremium({ email, password, premiumToken }) {
    try {
        const filter = { email: email, password: password, isSuspend: false }
        const user = await usersCollection.findOne(filter)
        const userId = user._id
        const queryPremium = { userId: userId, premiumToken: premiumToken }
        const matchedPremium = await premiumCollection.countDocuments(queryPremium)
        if (matchedPremium == 0) {
            const isAuthenticated = false
            return isAuthenticated
        } else {
            const isAuthenticated = true
            return isAuthenticated
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userAuthPremium executed")
    }
}

async function userAuthAdmin({ email, password, adminToken }) {
    try {
        const filter = { email: email, password: password, isSuspend: false }
        const user = await usersCollection.findOne(filter)
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
        console.log("userAuthAdmin executed")
    }
}


async function userInfoGet({ email, password }) {
    //retrieve user basic information 
    try {
        const filter = { email: email, password: password, isSuspend: false }
        console.log(filter)
        const projection = { _id: 0, email: 1, alias: 1, regDate: 1 }
        const userInfo = await usersCollection.find(filter, { projection: projection })
        return userInfo.toArray()
    } catch (err) {
        console.log(err)
    } finally {

    }
}

async function userAliasUpdate({ email, password, newAlias }) {
    //update target user's alias
    try {
        const filter = { email: email, password: password, isSuspend: false }
        console.log(filter)
        const lastUpdate = new Date()
        const update = { $set: { alias: newAlias, lastUpdate: lastUpdate } }
        console.log(update)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 1) {
            console.log("modified successful")
            const isModified = true
            return isModified
        } else {
            const isModified = false
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userAliasUpdate executed")
    }
}

async function userEmailUpdate({ email, password, newEmail }) {
    //update target user's email
    try {
        const filter = { email: email, password: password, isSuspend: false }
        console.log(filter)
        const lastUpdate = new Date()
        const update = { $set: { email: newEmail, lastUpdate: lastUpdate } }
        console.log(update)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 1) {
            console.log("modified successful")
            const isModified = true
            return isModified
        } else {
            const isModified = false
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userEmailUpdate executed")
    }
}

async function userPasswordUpdate({ email, password, newPassword }) {
    //update target user's password
    try {
        const filter = { email: email, password: password, isSuspend: false }
        console.log(filter)
        const lastUpdate = new Date()
        const update = { $set: { password: newPassword, lastUpdate: lastUpdate } }
        console.log(update)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 1) {
            console.log("modified successful")
            const isModified = true
            return isModified
        } else {
            const isModified = false
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userPasswordUpdate executed")
    }
}

async function userList({ }) {
    try {

    } catch (err) {
        console.log(err)
    } finally {
        console.log("userList executed")
    }
}

async function userListAdmin({ }) {
    try {
        const filter = {}
        const projection = { _id: 1, email: 1, alias: 1, regDate: 1, lastUpdate: 1, isPremium: 1, isSuspend: 1 }
        const userList = await usersCollection.find(filter, { projection: projection })
        const userArray = userList.toArray()
        return userArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userListAdmin executed")
    }
}

async function userSuspend({ targetUserId }) {
    try {
        const filter = { _id: new ObjectId(targetUserId) }
        const lastUpdate = new Date()
        const update = { $set: { isSuspend: true, lastUpdate: lastUpdate } }
        console.log("suspending user:" + targetUserId)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userSuspend executed")
    }
}

async function userUnSuspend({ targetUserId }) {
    try {
        const filter = { _id: new ObjectId(targetUserId) }
        const lastUpdate = new Date()
        const update = { $set: { isSuspend: false, lastUpdate: lastUpdate } }
        console.log("suspending user:" + targetUserId)
        const data = await usersCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("userUnSuspend executed")
    }
}

async function objectUpload({ email, password, category, name, description, tagId }) {
    try {
        const uploader = await usersCollection.findOne({ email: email, password: password })
        const uploaderId = uploader._id
        const tag = await tagsCollection.findOne({ _id: new ObjectId(tagId) })
        const uploadDate = new Date()
        const newObject = { uploaderId: uploaderId, category: category, name: name, description: description, tag: tag, uploadDate: uploadDate, lastUpdate: uploadDate, isPremium: false, isSuspend: false }
        console.log(newObject)
        const data = await objectsCollection.insertOne(newObject)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectUpload executed")
    }
}

async function objectUploadPremium({ email, password, category, name, description, tagId }) {
    try {
        const uploader = await usersCollection.findOne({ email: email, password: password })
        const uploaderId = uploader._id
        const tag = await tagsCollection.findOne({ _id: new ObjectId(tagId) })
        const uploadDate = new Date()
        const newObject = { uploaderId: uploaderId, category: category, name: name, description: description, tag: tag, uploadDate: uploadDate, lastUpdate: uploadDate, isPremium: false, isSuspend: false }
        console.log(newObject)
        const data = await objectsCollection.insertOne(newObject)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectUploadPremium executed")
    }
}

async function objectSuspend({ targetObjectId }) {
    try {
        const filter = { _id: new ObjectId(targetObjectId) }
        const lastUpdate = new Date()
        const update = { $set: { isSuspend: true, lastUpdate: lastUpdate } }
        console.log("suspending object:" + targetObjectId)
        const data = await objectsCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectSuspend executed")
    }
}

async function objectUnSuspend({ targetObjectId }) {
    try {
        const filter = { _id: new ObjectId(targetObjectId) }
        const lastUpdate = new Date()
        const update = { $set: { isSuspend: false, lastUpdate: lastUpdate } }
        console.log("Unsuspending object:" + targetObjectId)
        const data = await objectsCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectUnSuspend executed")
    }
}

async function objectList({ category }) {
    try {
        var filter
        switch (category) {
            case 'all':
                filter = { isPremium: false, isSuspend: false }
                break
            case 'videos':
                filter = { category: 'videos', isPremium: false, isSuspend: false }
                break
            case 'audios':
                filter = { category: 'audios', isPremium: false, isSuspend: false }
                break
            case 'images':
                filter = { category: 'images', isPremium: false, isSuspend: false }
                break
            case 'files':
                filter = { category: 'files', isPremium: false, isSuspend: false }
                break
        }
        const projection = { _id: 1, category: 1, name: 1, description: 1, tag: 1, uploadDate: 1, lastUpdate: 1 }
        const objectList = await objectsCollection.find(filter, { projection: projection })
        const objectArray = objectList.toArray()
        return objectArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectList executed")
    }
}

async function objectListPremium({ category }) {
    try {
        var filter
        switch (category) {
            case 'all':
                filter = { isSuspend: false }
                break
            case 'videos':
                filter = { category: 'videos', isSuspend: false }
                break
            case 'audios':
                filter = { category: 'audios', isSuspend: false }
                break
            case 'images':
                filter = { category: 'images', isSuspend: false }
                break
            case 'files':
                filter = { category: 'files', isSuspend: false }
                break
        }
        const projection = { _id: 1, category: 1, name: 1, description: 1, tag: 1, uploadDate: 1, lastUpdate: 1, isPremium: 1 }
        const objectList = await objectsCollection.find(filter, { projection: projection })
        const objectArray = objectList.toArray()
        return objectArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectListPremium executed")
    }
}

async function objectListAdmin({ category }) {
    try {
        var filter
        switch (category) {
            case 'all':
                filter = {}
                break
            case 'videos':
                filter = { category: 'videos' }
                break
            case 'audios':
                filter = { category: 'audios' }
                break
            case 'images':
                filter = { category: 'images' }
                break
            case 'files':
                filter = { category: 'files' }
                break
        }
        const projection = { _id: 1, uploaderId: 1, category: 1, name: 1, description: 1, tag: 1, uploadDate: 1, lastUpdate: 1, isPremium: 1, isSuspend: 1 }
        const objectList = await objectsCollection.find(filter, { projection: projection })
        const objectArray = objectList.toArray()
        return objectArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("objectListAdmin executed")
    }
}

async function tagCreate({ tagName }) {
    try {
        const newTag = { tagName: tagName, isSuspend: false }
        const data = await tagsCollection.insertOne(newTag)
        console.log(data)
        return data.insertedId
    } catch (err) {
        console.log(err)
    } finally {
        console.log("tagCreate executed")
    }
}

async function tagSuspend({ targetTagId }) {
    try {
        const filter = { _id: new ObjectId(targetTagId) }
        const update = { $set: { isSuspend: true } }
        console.log("suspending tag:" + targetTagId)
        const data = await tagsCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("tagSuspend executed")
    }
}

async function tagUnSuspend({ targetTagId }) {
    try {
        const filter = { _id: new ObjectId(targetTagId) }
        const update = { $set: { isSuspend: false } }
        console.log("Unsuspending tag:" + targetTagId)
        const data = await tagsCollection.updateOne(filter, update)
        if (data.modifiedCount == 0) {
            const isModified = false
            return isModified
        } else {
            const isModified = true
            return isModified
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log("tagUnSuspend executed")
    }
}

async function tagList({ }) {
    try {
        const filter = { isSuspend: false }
        const projection = { _id: 1, tagName: 1 }
        const tagList = await tagsCollection.find(filter, { projection: projection })
        const tagArray = tagList.toArray()
        return tagArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("tagList executed")
    }
}

async function tagListAdmin({ }) {
    try {
        const filter = {}
        const projection = { _id: 1, tagName: 1, isSuspend: 1 }
        const tagList = await tagsCollection.find(filter, { projection: projection })
        const tagArray = tagList.toArray()
        return tagArray
    } catch (err) {
        console.log(err)
    } finally {
        console.log("tagListAdmin executed")
    }
}







module.exports = { userRegister, userValidate, userAuth, userAuthPremium, userAuthAdmin, userInfoGet, userAliasUpdate, userEmailUpdate, userPasswordUpdate, userList, userListAdmin, userSuspend, userUnSuspend, objectUpload, objectUploadPremium, objectSuspend, objectUnSuspend, objectList, objectListPremium, objectListAdmin, tagCreate, tagSuspend, tagUnSuspend, tagList, tagListAdmin }
