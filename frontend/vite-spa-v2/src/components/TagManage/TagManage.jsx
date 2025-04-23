import React, { useState } from 'react'
import { tagListAdmin, tagSuspend, tagUnSuspend } from '../../services/mongo'


export default function TagManage({ user, admin }) {
    const [list, setList] = useState([])
    const [targetTagId, setTargetTagId] = useState([])
    const [alert, setAlert] = useState([])

    async function handleTagList(event) {
        event.preventDefault()
        const newTagList = await tagListAdmin({ user: user, admin: admin })
        setList(newTagList)
    }

    function handleTargetTagId(event) {
        event.preventDefault()
        setTargetTagId(event.target.value)
    }

    function checkIndex(tag) {
        return tag._id == targetTagId
    }

    async function handleTargetTagSuspend(event) {
        event.preventDefault()
        setAlert("标签封禁中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await tagSuspend({ user: user, admin: admin, targetTagId: targetTagId })
        if (isModified == true) {
            target.isSuspend = true
            const newTagList = list.toSpliced(targetIndex, target)
            setList(newTagList)
            setAlert("标签封禁成功")
        }
    }

    async function handleTargetTagUnSuspend(event) {
        event.preventDefault()
        setAlert("标签解封中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await tagUnSuspend({ user: user, admin: admin, targetTagId: targetTagId })
        if (isModified == true) {
            target.isSuspend = false
            const newTagList = list.toSpliced(targetIndex, target)
            setList(newTagList)
            setAlert("标签解封成功")
        }
    }

    return (
        <div>
            <form>
                <fieldset>
                    <legend>标签列表</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>标签ID</th>
                                <th>标签名称</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(tag => (
                                <tr key={tag._id}>
                                    <td>{tag._id}</td>
                                    <td>{tag.tagName}</td>
                                    <td>{tag.isSuspend ? "封禁中" : "正常"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleTagList}>获取标签列表</button>
                    <label>输入标签ID:</label>
                    <input onChange={handleTargetTagId} />
                    <button onClick={handleTargetTagSuspend}>封禁标签</button>
                    <button onClick={handleTargetTagUnSuspend}>解封标签</button>
                    <h2>{alert}</h2>
                </fieldset>
            </form>
        </div>
    )
}