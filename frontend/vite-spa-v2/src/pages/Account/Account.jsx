import React, { useState } from "react"
import { userInfoGet, userAliasUpdate, userEmailUpdate, userPasswordUpdate } from "../../services/mongo"

export default function Account({ user, setUser }) {
    const [userInfo, setUserInfo] = useState([])
    const [newAlias, setNewAlias] = useState([])
    const [newEmail, setNewEmail] = useState([])
    const [confirmEmail, setConfirmEmail] = useState([])
    const [newPassword, setNewPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])
    const [alert, setAlert] = useState([])

    function handleLogOut(event) {
        event.preventDefault()
        localStorage.clear()
        window.location.reload(true)
    }

    async function handleInfoGet(event) {
        event.preventDefault()
        const newUserInfo = await userInfoGet({ user: user })
        setUserInfo(newUserInfo)
        setAlert("账号信息获取成功")
    }

    function handleNewAlias(event) {
        event.preventDefault()
        setNewAlias(event.target.value)
    }

    async function handleUpdateAlias(event) {
        event.preventDefault()
        const isModified = await userAliasUpdate({ user: user, newAlias: newAlias })
        if (isModified == true) {
            setAlert("昵称修改成功")
        }
    }

    function handleNewEmail(event) {
        event.preventDefault()
        setNewEmail(event.target.value)
    }
    function handleConfirmEmail(event) {
        event.preventDefault()
        setConfirmEmail(event.target.value)
    }
    async function handleChangeEmail(event) {
        event.preventDefault()
        setAlert("邮箱修改中")
        if (newEmail != confirmEmail) {
            setAlert("无效邮箱")
        } else {
            const isModified = await userEmailUpdate({ user: user, newEmail: newEmail })
            if (isModified == true) {
                setUser({ email: newEmail, password: user.password })
                setAlert("邮箱修改成功")
            } else {
                setAlert("邮箱修改失败")
            }
        }
    }
    function handleNewPassword(event) {
        event.preventDefault()
        setNewPassword(event.target.value)
    }
    function handleConfirmPassword(event) {
        event.preventDefault()
        setConfirmPassword(event.target.value)
    }
    async function handleChangePassword(event) {
        event.preventDefault()
        setAlert("密码修改中")
        if (newPassword != confirmPassword) {
            setAlert("无效密码")
        } else {
            const isModified = await userPasswordUpdate({ user: user, newPassword: newPassword })
            if (isModified == true) {
                setUser({ email: user.email, password: newPassword })
                setAlert("密码修改成功")
            } else {
                setAlert("密码修改失败")
            }
        }
    }

    return (
        <div>
            <h1>账号资料页面</h1>
            <p>当前登录账号:</p>
            <p>{user.email}<button onClick={handleLogOut}>登出</button></p>
            <form>
                <fieldset>
                    <legend>基本信息</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>邮箱</th>
                                <th>昵称</th>
                                <th>注册时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map(user => (
                                <tr key={user.email}>
                                    <td>{user.email}</td>
                                    <td>{user.alias}</td>
                                    <td>{user.regDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleInfoGet}>获取账号信息</button>
                    <label>
                        <p>输入新昵称:</p>
                        <input onChange={handleNewAlias}></input>
                        <button onClick={handleUpdateAlias}>修改昵称</button>
                    </label>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>修改邮箱</legend>
                    <label>
                        <p>输入新邮箱:</p>
                        <input type="email" onChange={handleNewEmail}></input>
                    </label>
                    <label>
                        <p>确认新邮箱:</p>
                        <input type="email" onChange={handleConfirmEmail}></input>
                    </label>
                    <div>
                        <button onClick={handleChangeEmail}>修改邮箱</button>
                    </div>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>修改密码</legend>
                    <label>
                        <p>输入新密码:</p>
                        <input type="password" onChange={handleNewPassword}></input>
                    </label>
                    <label>
                        <p>确认新密码:</p>
                        <input type="password" onChange={handleConfirmPassword}></input>
                    </label>
                    <div>
                        <button onClick={handleChangePassword}>修改密码</button>
                    </div>
                </fieldset>
            </form>
            <h2>{alert}</h2>
        </div>
    )
}