import React, { useState, useEffect } from "react"
import { objectListAdmin, objectSetPremium, objectUnSetPremium, objectSuspend, objectUnSuspend } from "../../services/mongo"

export default function ObjectManage({ user, admin, defCategory }) {
    const [list, setList] = useState([])
    const [objectCategory, setObjectCategory] = useState(defCategory)
    const [targetObjectId, setTargetObjectId] = useState([])
    const [alert, setAlert] = useState([])

    useEffect(() => {
        fetchList()
    }, [])

    async function fetchList() {
        const newList = await objectListAdmin({ user: user, admin: admin, category: objectCategory })
        setList(newList)
    }

    async function handleList(event) {
        event.preventDefault()
        fetchList()
    }

    function handleCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }

    function handleTargetObjectId(event) {
        event.preventDefault()
        setTargetObjectId(event.target.value)
    }

    function checkIndex(object) {
        return object._id == targetObjectId
    }

    async function handleTargetObjectSetPremium(event) {
        event.preventDefault()
        setAlert("VIP限定状态切换中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await objectSetPremium({ user: user, admin: admin, targetObjectId: targetObjectId })
        if (isModified == true) {
            target.isPremium = true
            const newObjectList = list.toSpliced(targetIndex, target)
            setList(newObjectList)
            setAlert("媒体文件已切换成VIP限定")
        }
    }

    async function handleTargetObjectUnSetPremium(event) {
        event.preventDefault()
        setAlert("VIP限定状态切换中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await objectUnSetPremium({ user: user, admin: admin, targetObjectId: targetObjectId })
        if (isModified == true) {
            target.isPremium = false
            const newObjectList = list.toSpliced(targetIndex, target)
            setList(newObjectList)
            setAlert("媒体文件已取消VIP限定")
        }
    }

    async function handleTargetObjectSuspend(event) {
        event.preventDefault()
        setAlert("媒体文件封禁中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await objectSuspend({ user: user, admin: admin, targetObjectId: targetObjectId })
        if (isModified == true) {
            target.isSuspend = true
            const newObjectList = list.toSpliced(targetIndex, target)
            setList(newObjectList)
            setAlert("媒体文件封禁成功")
        }
    }

    async function handleTargetObjectUnSuspend(event) {
        event.preventDefault()
        setAlert("媒体文件解封中")
        const targetIndex = list.findIndex(checkIndex)
        var target = list[targetIndex]
        const isModified = await objectUnSuspend({ user: user, admin: admin, targetObjectId: targetObjectId })
        if (isModified == true) {
            target.isSuspend = false
            const newObjectList = list.toSpliced(targetIndex, target)
            setList(newObjectList)
            setAlert("媒体文件解封成功")
        }
    }

    return (
        <div>
            <form>
                <fieldset>
                    <legend>媒体文件管理</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>类别</th>
                                <th>名称</th>
                                <th>描述</th>
                                <th>标签</th>
                                <th>上传时间</th>
                                <th>最后更新</th>
                                <th>VIP限定</th>
                                <th>状态</th>
                                <th>上传者ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(object => (
                                <tr key={object._id}>
                                    <td>{object._id}</td>
                                    <td>{object.category}</td>
                                    <td>{object.name}</td>
                                    <td>{object.description}</td>
                                    <td>{object.tag.tagName}</td>
                                    <td>{object.uploadDate}</td>
                                    <td>{object.lastUpdate}</td>
                                    <td>{object.isPremium ? "是" : "否"}</td>
                                    <td>{object.isSuspend ? "封禁中" : "正常"}</td>
                                    <td>{object.uploaderId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <label>选择类别:</label>
                    <select value={objectCategory} onChange={handleCategory} >
                        <option value="all">所有</option>
                        <option value="videos">视频</option>
                        <option value="audios">音频</option>
                        <option value="images">图片</option>
                        <option value="files">文档</option>
                    </select>
                    <button onClick={handleList}>刷新列表</button>
                    <label>输入媒体文件ID:</label>
                    <input onChange={handleTargetObjectId} />
                    <button onClick={handleTargetObjectSuspend}>封禁媒体文件</button>
                    <button onClick={handleTargetObjectUnSuspend}>解封媒体文件</button>
                    <button onClick={handleTargetObjectSetPremium}>切换VIP限定</button>
                    <button onClick={handleTargetObjectUnSetPremium}>取消VIP限定</button>
                    <h2>{alert}</h2>
                </fieldset>
            </form>
        </div >
    )
}