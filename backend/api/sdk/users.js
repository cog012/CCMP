const { MongoClient } = require('mongodb');
const SERVER_URL = process.env.SERVER_URL
const client = new MongoClient(SERVER_URL);

const database = client.db('CCMP')
const collection = database.collection('users')

async function createUser({ username, password }) {
    //create new user in users collection using given username and password
    console.log(`new user creating: [${username}] password: [${password}]`)

    const newUser = { username: username, password: password, isadmin: false }
    const result = await collection.insertOne(newUser)
    console.log(`new user [${username}] created with the _id: [${result.insertedId}]`)

}

async function deleteUser({ username, password }) {
    //delete user in users collection using given username and password
    console.log(`deleting user: [${username}] password: [${password}]`)

    const deletedUser = { username: username, password: password }
    const result = await collection.deleteOne(deletedUser)
    if (result.deletedCount === 1) {
        console.log(`user [${username}] deleted`)
    }
}

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

module.exports = { createUser, deleteUser }

// var MongoClient = require('mongodb').MongoClient;
// const url = CENTRAL_URL
// // const url = CENTRAL_URL + '/CCMP'
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("MongoDB connected");
//     db.close();
// })