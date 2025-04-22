import React from 'react'
import { useState } from 'react'
import { userRegister, userValidate, userAuth } from '../../services/mongo'

import './Login.css'


export default function Login({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState("")

    function handleEmail(event) {
        event.preventDefault()
        setEmail(event.target.value)
    }

    function handlePassword(event) {
        event.preventDefault()
        setPassword(event.target.value)
    }

    async function handleRegister(event) {
        event.preventDefault()
        if (email.trim() === "" || password.trim() === "") {
            setAlert("邮箱或密码缺失")
        } else {
            const isRegisterSuccess = await userRegister({ email: email, password: password })
            if (isRegisterSuccess == true) {
                setAlert("注册成功")
            } else {
                setAlert("注册失败")
            }
        }
    }

    async function handleValidate(event) {
        event.preventDefault()
        if (email.trim() === "") {
            setAlert("邮箱缺失")
        } else {
            const isEmailAvailable = await userValidate({ email: email })
            if (isEmailAvailable == true) {
                setAlert("当前邮箱可用")
            } else {
                setAlert("当前邮箱已被注册")
            }
        }
    }

    async function handleLogin(event) {
        event.preventDefault()
        if (email.trim() === "" || password.trim() === "") {
            setAlert("邮箱或密码缺失")
        } else {
            const isAuthenticated = await userAuth({ email: email, password: password })
            if (isAuthenticated == true) {
                setUser({ email: email, password: password })
            } else {
                setAlert("登录失败")
            }
        }
    }

    return (
        <div className='login-wrapper'>
            <h1>请登录</h1>
            <form>
                <label>
                    <p>邮箱:</p>
                    <input type="email" onChange={handleEmail} />
                </label>
                <label>
                    <p>密码:</p>
                    <input type="password" onChange={handlePassword} />
                </label>
                <div>
                    <button onClick={handleLogin}>登录</button>
                    <button onClick={handleValidate}>验证</button>
                    <button onClick={handleRegister}>注册</button>
                </div>
            </form>
            <h2>{alert}</h2>
        </div>
    )
}