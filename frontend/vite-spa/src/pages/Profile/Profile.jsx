import React, { useState } from "react"
import { changeCredential } from "../../services/mongo"

export default function Profile({ user, setUser, setAdmin }) {
    const [newEmail, setNewEmail] = useState(user.email)
    const [confirmEmail, setConfirmEmail] = useState([])
    const [newPassword, setNewPassword] = useState(user.password)
    const [confirmPassword, setConfirmPassword] = useState([])
    const [response, setResponse] = useState([])
    function handleLogOut(event) {
        event.preventDefault()
        localStorage.clear()
        window.location.reload(true)
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
        setResponse("Commecing Email Change")
        if (newEmail != confirmEmail) {
            setResponse("Email invalid")
        } else {
            const isModified = await changeCredential({ user: user, newEmail: newEmail, newPassword: user.password })
            if (isModified == true) {
                setUser({ email: newEmail, password: user.password })
                setResponse("Email Changed Successful")
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
        setResponse("Commecing Password Change")
        if (newPassword != confirmPassword) {
            setResponse("Password invalid")
        } else {
            const isModified = await changeCredential({ user: user, newEmail: user.email, newPassword: newPassword })
            if (isModified == true) {
                setUser({ email: user.email, password: newPassword })
                setResponse("Password Changed Successful")
            }
        }
    }
    return (
        <div>
            <h1>Profile</h1>
            <p>Current account:</p>
            <p>{user.email}</p>
            <button onClick={handleLogOut}>Log Out</button>
            <form>
                <fieldset>
                    <legend>Change Email</legend>
                    <label>
                        <p>Input New Email:</p>
                        <input type="email" onChange={handleNewEmail}></input>
                    </label>
                    <label>
                        <p>Confirm New Email:</p>
                        <input type="email" onChange={handleConfirmEmail}></input>
                    </label>
                    <div>
                        <button onClick={handleChangeEmail}>Change Email</button>
                    </div>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>Change Password</legend>
                    <label>
                        <p>Input New Password:</p>
                        <input type="password" onChange={handleNewPassword}></input>
                    </label>
                    <label>
                        <p>Confirm New Password:</p>
                        <input type="password" onChange={handleConfirmPassword}></input>
                    </label>
                    <div>
                        <button onClick={handleChangePassword}>Change Password</button>
                    </div>
                </fieldset>

            </form>
            <h1>{response}</h1>
        </div>
    )
}