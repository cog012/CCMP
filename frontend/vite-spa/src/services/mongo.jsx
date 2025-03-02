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