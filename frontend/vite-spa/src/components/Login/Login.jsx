import React from 'react'
import { useState } from 'react'
import { loginUser, registerUser } from '../../services/mongo'

import './Login.css'


export default function Login({ setUser }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [alert, setAlert] = useState()

    async function handleLogin(event) {
        event.preventDefault()
        if (!email || !password) {
            setAlert("Email and password required")
        }
        const isAuthenticated = await loginUser({ email: email, password: password })
        if (isAuthenticated == true) {
            setUser({ email: email, password: password })
        } else {
            setAlert("Login failed")
        }
    }
    async function handleRegister(event) {
        event.preventDefault()
        if (!email || !password) {
            setAlert("Email and password required")
        }
        const isRegisterSuccess = await registerUser({ email: email, password: password })
        if (isRegisterSuccess == true) {
            setAlert("Register success")
        } else {
            setAlert("Register failed")
        }
    }
    return (
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form>
                <label>
                    <p>Email:</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
            <h2>{alert}</h2>
        </div>
    )
}