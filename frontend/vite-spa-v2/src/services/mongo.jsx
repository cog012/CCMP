const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export async function userRegister({ email, password }) {
    const res = await axios.post(SERVER_URL + '/mongo/userRegister', {}, { params: { email: email, password: password } });
    return res.data.isRegisterSuccess
}

export async function userValidate({ email }) {
    const res = await axios.post(SERVER_URL + '/mongo/userValidate', {}, { params: { email: email } });
    return res.data.isEmailAvailable
}

export async function userAuth({ email, password }) {
    const res = await axios.post(SERVER_URL + '/mongo/userAuth', {}, { params: { email: email, password: password } });
    return res.data.isAuthenticated
}

export async function userAuthPremium({ user, premiumToken }) {
    const res = await axios.post(SERVER_URL + '/mongo/userAuthPremium', {}, { params: { user: user, premiumToken: premiumToken } });
    return res.data.isAuthenticated
}

export async function userAuthAdmin({ user, adminToken }) {
    const res = await axios.post(SERVER_URL + '/mongo/userAuthAdmin', {}, { params: { user: user, adminToken: adminToken } });
    return res.data.isAuthenticated
}

export async function userInfoGet({ user }) {
    const res = await axios.post(SERVER_URL + '/mongo/userInfoGet', {}, { params: { user: user } })
    return res.data.userInfo
}

export async function userAliasUpdate({ user, newAlias }) {
    const res = await axios.post(SERVER_URL + '/mongo/userAliasUpdate', {}, { params: { user: user, newAlias } })
    return res.data.isModified
}

export async function userEmailUpdate({ user, newEmail }) {
    const res = await axios.post(SERVER_URL + '/mongo/userEmailUpdate', {}, { params: { user: user, newEmail: newEmail } })
    return res.data.isModified
}

export async function userPasswordUpdate({ user, newPassword }) {
    const res = await axios.post(SERVER_URL + '/mongo/userPasswordUpdate', {}, { params: { user: user, newPassword: newPassword } })
    return res.data.isModified
}

export async function userList({ user }) {
    const res = await axios.post(SERVER_URL + '/mongo/userList', {}, { params: { user: user } })
    return res.data.userArray
}

export async function userListAdmin({ user, admin }) {
    const res = await axios.post(SERVER_URL + '/mongo/userListAdmin', {}, { params: { user: user, admin: admin } })
    return res.data.userArray
}

export async function userSuspend({ user, admin, targetUserId }) {
    const res = await axios.post(SERVER_URL + '/mongo/userSuspend', {}, { params: { user: user, admin: admin, targetUserId: targetUserId } })
    return res.data.isModified
}

export async function userUnSuspend({ user, admin, targetUserId }) {
    const res = await axios.post(SERVER_URL + '/mongo/userUnSuspend', {}, { params: { user: user, admin: admin, targetUserId: targetUserId } })
    return res.data.isModified
}


export async function objectUpload({ user, category, name, description, tagId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectUpload', {}, { params: { user: user, category: category, name: name, description: description, tagId: tagId } })
    return res.data.newObjectId
}

export async function objectUploadPremium({ user, category, name, description, tagId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectUploadPremium', {}, { params: { user: user, category: category, name: name, description: description, tagId: tagId } })
    return res.data.newObjectId
}

export async function objectSetPremium({ user, admin, targetObjectId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectSetPremium', {}, { params: { user: user, admin: admin, targetObjectId: targetObjectId } })
    return res.data.isModified
}

export async function objectUnSetPremium({ user, admin, targetObjectId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectUnSetPremium', {}, { params: { user: user, admin: admin, targetObjectId: targetObjectId } })
    return res.data.isModified
}


export async function objectSuspend({ user, admin, targetObjectId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectSuspend', {}, { params: { user: user, admin: admin, targetObjectId: targetObjectId } })
    return res.data.isModified
}

export async function objectUnSuspend({ user, admin, targetObjectId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectUnSuspend', {}, { params: { user: user, admin: admin, targetObjectId: targetObjectId } })
    return res.data.isModified
}

export async function objectList({ category }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectList', {}, { params: { category: category } })
    return res.data.objectArray
}

export async function objectListPremium({ user, premium, category }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectListPremium', {}, { params: { user: user, premium: premium, category: category } })
    return res.data.objectArray
}

export async function objectListAdmin({ user, admin, category }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectListAdmin', {}, { params: { user: user, admin: admin, category: category } })
    return res.data.objectArray
}

export async function tagCreate({ tagName }) {
    const res = await axios.post(SERVER_URL + '/mongo/tagCreate', {}, { params: { tagName: tagName } })
    return res.data.newTagId
}

export async function tagSuspend({ user, admin, targetTagId }) {
    const res = await axios.post(SERVER_URL + '/mongo/tagSuspend', {}, { params: { user: user, admin: admin, targetTagId: targetTagId } })
    return res.data.isModified
}

export async function tagUnSuspend({ user, admin, targetTagId }) {
    const res = await axios.post(SERVER_URL + '/mongo/tagUnSuspend', {}, { params: { user: user, admin: admin, targetTagId: targetTagId } })
    return res.data.isModified
}

export async function tagList() {
    const res = await axios.get(SERVER_URL + '/mongo/tagList')
    return res.data.tagArray
}

export async function tagListAdmin({ user, admin }) {
    const res = await axios.post(SERVER_URL + '/mongo/tagListAdmin', {}, { params: { user: user, admin: admin } })
    return res.data.tagArray
}


