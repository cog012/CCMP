const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export async function changeCredential({ user, newEmail, newPassword }) {
    const res = await axios.post(SERVER_URL + '/mongo/changeCredential', {}, { params: { user: user, newEmail: newEmail, newPassword: newPassword } })
    return res.data.isModified
}
export async function loginUser({ email, password }) {
    const res = await axios.post(SERVER_URL + '/mongo/login', {}, { params: { email: email, password: password } });
    return res.data.isAuthenticated
}

export async function validateUser({ email }) {
    const res = await axios.post(SERVER_URL + '/mongo/validate', {}, { params: { email: email } });
    return res.data.isUserExist
}

export async function registerUser({ email, password }) {
    const res = await axios.post(SERVER_URL + '/mongo/register', {}, { params: { email: email, password: password } });
    return res.data.isRegisterSuccess
}

export async function mongoObjectUpload({ user, objectName, objectCategory, objectDescription, tagId }) {
    const res = await axios.post(SERVER_URL + '/mongo/objectUpload', {}, { params: { user: user, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription, tagId: tagId } })
    return res.data.newObjectId
}

export async function mongoObjectToggleValid({ objectId, newValidity }) {
    const res = await axios.get(SERVER_URL + '/mongo/objectToggleValid', { params: { objectId: objectId, newValidity: newValidity } })
    return res.data.isModified
}

export async function mongoObjectList({ objectCategory }) {
    const res = await axios.get(SERVER_URL + '/mongo/objectList', { params: { objectCategory: objectCategory } })
    return res.data.objectList
}

export async function mongoTagList() {
    const res = await axios.get(SERVER_URL + '/mongo/tagList')
    return res.data.tagList
}
export async function mongoTagCreate({ tagName }) {
    const res = await axios.post(SERVER_URL + '/mongo/tagCreate', {}, { params: { tagName: tagName } })
    return res.data.newTagId
}