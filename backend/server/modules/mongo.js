const { authenticateUser, checkExistUser, createUser, getUserId } = require('../sdk/mongo')

async function mongoUpload({ user, objectName, objectCategory, objectDescription }) {
    console.log('we')
    const email = user.email
    const password = user.password
    const isAuthenticated = await authenticateUser({ email: email, password: password })
    console.log('ew')
    console.log(isAuthenticated)
}






























module.exports = { mongoUpload }