const { MongoClient } = require('mongodb')
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)

const database = client.db('CCMP')
const usersCollection = database.collection('users')
const audiosCollection = database.collection('audios')
const videosCollection = database.collection('videos')
const imagesCollection = database.collection('images')
const filesCollection = database.collection('files')

async function loginUser({ email, password }) {
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
        console.log("findUser executed")
    }
}

async function validateUser({ email }) {
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
        console.log("findUser executed")
    }
}

async function createUser({ email, password }) {
    //create new user in users collection using given username and password
    try {
        const newUser = { email: email, password: password, ismod: false }
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

// async function deleteUser({ username, password }) {
//     //delete user in users collection using given username and password
//     console.log(`deleting user: [${username}] password: [${password}]`)

//     const deletedUser = { username: username, password: password }
//     const result = await collection.deleteOne(deletedUser)
//     if (result.deletedCount === 1) {
//         console.log(`user [${username}] deleted`)
//     }
// }

// async function createUser({ username, password }) {
//     console.log("new user creating: " + username + " password: " + password)

//     const database = client.db('CCMP')
//     const collection = database.collection('users')
//     const newbie = { username: username, password: password, isadmin: false }
//     const result = await collection.insertOne(newbie)
//     console.log(`new user [${username}] created with the _id: [${result.insertedId}]`)
// }

// async function run() {
//     try {
//         await client.connect()
//         console.log("USER-SDK online")

//         // const database = client.db('CCMP');
//         // const users = database.collection('users');

//         // const query = { isadmin: true };
//         // const admins = users.find(query);

//         // // admins.stream().on("data", doc => console.log(doc));



//         // for await (const admin of admins) {
//         //     console.log(admin);
//         // }
//     } finally {
//         await client.close()
//     }
// }

// run().catch(console.dir)

module.exports = { loginUser, validateUser, createUser }

// var MongoClient = require('mongodb').MongoClient;
// const url = CENTRAL_URL
// // const url = CENTRAL_URL + '/CCMP'
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("MongoDB connected");
//     db.close();
// })