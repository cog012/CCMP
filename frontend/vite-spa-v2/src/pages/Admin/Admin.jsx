import React, { useState } from "react"
import TagManage from "../../components/TagManage/TagManage"
import UserManage from "../../components/UserManage/UserManage"
import ObjectManage from "../../components/ObjectManage/ObjectManage"
import ObjectGet from "../../components/ObjectGet/ObjectGet"

import { userAuthAdmin } from "../../services/mongo"

export default function Admin({ user, admin, setAdmin }) {
    const [newToken, setNewToken] = useState([])
    const [alert, setAlert] = useState([])

    function handleNewToken(event) {
        event.preventDefault()
        setNewToken(event.target.value)
    }

    async function handleLoginAdmin(event) {
        event.preventDefault()
        setAlert("管理员登录中")
        const isAuthenticated = await userAuthAdmin({ user: user, adminToken: newToken })
        if (isAuthenticated == true) {
            setAdmin({ adminToken: newToken })
        } else {
            setAlert("管理员登录失败")
        }
    }

    if (!admin) {
        return (
            <div>
                <h1>无访问权限，请输入管理员令牌</h1>
                <input type="password" onChange={handleNewToken}></input>
                <button onClick={handleLoginAdmin}>管理员登录</button>
                <h2>{alert}</h2>
            </div>
        )
    }
    return (
        <div>
            <h1>管理员页面</h1>
            <TagManage user={user} admin={admin} />
            <UserManage user={user} admin={admin} />
            <ObjectManage user={user} admin={admin} defCategory={'all'} />
            <ObjectGet />
        </div>
    )
}