import React, { useState } from "react"
import { userListAdmin, userSuspend, userUnSuspend } from "../../services/mongo"

export default function UserManage({ user, admin }) {
    const [list, setList] = useState([])
    const [targetUserId, setTargetUserId] = useState([])
    const [alert, setAlert] = useState([])

    async function handleUserList(event) {
        event.preventDefault()
        const newUserList = await userListAdmin({ user: user, admin: admin })
        setList(newUserList)
    }

    function handleTargetUserId(event) {
        event.preventDefault()
        setTargetUserId(event.target.value)
    }

    function checkIndex(user) {
        return user._id == targetUserId
    }

    async function handleTargetUserSuspend(event) {
        event.preventDefault()
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await userSuspend({ user: user, admin: admin, targetUserId: targetUserId })
        if (isModified == true) {
            target.isSuspend = true
            const newUserList = list.toSpliced(targetIndex, target)
            setList(newUserList)
            setAlert("用户封禁成功")
        }
    }

    async function handleTargetUserUnSuspend(event) {
        event.preventDefault()
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await userUnSuspend({ user: user, admin: admin, targetUserId: targetUserId })
        if (isModified == true) {
            target.isSuspend = false
            const newUserList = list.toSpliced(targetIndex, target)
            setList(newUserList)
            setAlert("用户解封成功")
        }
    }

    return (
        <div>
            <form>
                <fieldset>
                    <legend>用户管理</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>邮箱</th>
                                <th>昵称</th>
                                <th>注册时间</th>
                                <th>最后更新</th>
                                <th>封禁状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.alias}</td>
                                    <td>{user.regDate}</td>
                                    <td>{user.lastUpdate}</td>
                                    <td>{user.isSuspend ? "true" : "false"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleUserList}>获取用户列表</button>
                    <label>输入用户ID:</label>
                    <input onChange={handleTargetUserId} />
                    <button onClick={handleTargetUserSuspend}>封禁用户</button>
                    <button onClick={handleTargetUserUnSuspend}>解封用户</button>
                </fieldset>
                <h2>{alert}</h2>
            </form>
        </div>
    )
}