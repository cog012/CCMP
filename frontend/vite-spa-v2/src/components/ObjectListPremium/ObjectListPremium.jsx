import React, { useState, useEffect } from "react"
import { objectListPremium } from "../../services/mongo"


export default function ObjectListPremium({ user, premium, defCategory }) {
    const [list, setList] = useState([])
    const [objectCategory, setObjectCategory] = useState(defCategory)

    useEffect(() => {
        fetchList()
    }, [])

    async function fetchList() {
        const newList = await objectListPremium({ user: user, premium: premium, category: objectCategory })
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

    return (
        <div>
            <form>
                <fieldset>
                    <legend>媒体文件列表(VIP)</legend>
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
                                    <td>{object.isPremium ? "true" : "false"}</td>
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
                </fieldset>
            </form>
        </div >
    )
}