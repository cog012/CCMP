const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

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

export async function mongoUpload({ user, objectName, objectCategory, objectDescription }) {
    const res = await axios.post(SERVER_URL + '/mongo/upload', {}, { params: { user: user, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription } })
    return res.data.newObjectId
}

export async function mongoList({ objectCategory }) {
    const res = await axios.get(SERVER_URL + '/mongo/list', { params: { objectCategory: objectCategory } })
}