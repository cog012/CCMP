import React from 'react'
import { useState } from 'react'
import { loginUser } from '../../services/mongo'


import './Login.css'


export default function Login({ setUser }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function handleLogin(event) {
        event.preventDefault()
        const isAuthenticated = await loginUser({ email: email, password: password })
        if (isAuthenticated == true)
            setUser({ email: email, password: password })
    }
    return (
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button onClick={handleLogin}>Submit</button>
                </div>
            </form>
        </div>
    )
}