import React, { useState } from "react"
import { listUser, suspendUser } from "../../services/mongo"

export default function UserList({ user, adminToken }) {
    const [userList, setUserList] = useState([])
    const [targetUserId, setTargetUserId] = useState([])
    const [response, setResponse] = useState([])
    async function handleUserList(event) {
        event.preventDefault()
        const newUserList = await listUser({ user: user, adminToken: adminToken })
        setUserList(newUserList)
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
        const targetIndex = userList.findIndex(checkIndex)
        var targetUser = userList[targetIndex]
        const isModified = await suspendUser({ user: user, adminToken: adminToken, targetUserId: targetUserId })
        if (isModified == true) {
            targetUser.isSuspend = true
            const newUserList = userList.toSpliced(targetIndex, targetUser)
            setUserList(newUserList)
            setResponse("User Suspend Successful")
        }
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Users List</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Email</th>
                                <th>isSuspend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isSuspend ? "true" : "false"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleUserList}>Show Users</button>
                    <label>Input User ID:</label>
                    <input onChange={handleTargetUserId} />
                    <button onClick={handleTargetUserSuspend}>Suspend User</button>
                </fieldset>
                <h1>{response}</h1>
            </form>
        </div>
    )
}