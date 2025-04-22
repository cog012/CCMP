import React, { useState } from "react"
import { } from "../../services/mongo"

export default function Library({ user, setUser }) {

    const [alert, setAlert] = useState([])



    return (
        <div>
            <h1>内容库</h1>
            <form>
                <fieldset>
                    <legend>上传编辑</legend>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>上传记录</legend>
                </fieldset>
            </form>
            <h1>{alert}</h1>
        </div>
    )
}