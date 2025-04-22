import React, { useState } from "react"
import ObjectListPremium from "../../components/ObjectListPremium/ObjectListPremium"
import ObjectUpload from "../../components/ObjectUpload/ObjectUpload"
import ObjectGet from "../../components/ObjectGet/ObjectGet"

import { userAuthPremium } from "../../services/mongo"

export default function Premium({ user, premium, setPremium }) {
    const [newToken, setNewToken] = useState([])
    const [alert, setAlert] = useState([])

    function handleNewToken(event) {
        event.preventDefault()
        setNewToken(event.target.value)
    }

    async function handleLoginPremium(event) {
        event.preventDefault()
        setAlert("VIP登录中")
        const isAuthenticated = await userAuthPremium({ user: user, premiumToken: newToken })
        if (isAuthenticated == true) {
            setPremium({ premiumToken: newToken })
        } else {
            setAlert("VIP登录失败")
        }
    }

    if (!premium) {
        return (
            <div>
                <h1>无访问权限，请输入VIP令牌</h1>
                <input type="password" onChange={handleNewToken}></input>
                <button onClick={handleLoginPremium}>VIP登录</button>
                <h2>{alert}</h2>
            </div>
        )
    }
    return (
        <div>
            <h1>VIP页面</h1>
            <ObjectListPremium user={user} premium={premium} defCategory={'all'} />
            <ObjectUpload user={user} defCategory={'all'} />
            <ObjectGet />
        </div>
    )
}