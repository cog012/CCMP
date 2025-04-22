import React, { useEffect, useState } from 'react'

import { objectUpload, objectUploadPremium, tagCreate, tagList } from '../../services/mongo'
import { s3Upload } from '../../services/s3'

export default function ObjectUpload({ user, defCategory }) {
    var defaultCategory
    if (defCategory == 'all') {
        defaultCategory = 'videos'
    } else {
        defaultCategory = defCategory
    }

    const [objectName, setObjectName] = useState(null)
    const [objectCategory, setObjectCategory] = useState(defaultCategory)
    const [objectDescription, setObjectDescription] = useState(null)
    const [taglist, setTaglist] = useState([])
    const [newTagName, setNewTagName] = useState([])
    const [tagId, setTagId] = useState("")
    const [isPremium, setIsPremium] = useState(false)
    const [objectBody, setobjectBody] = useState(null)
    const [alert, setAlert] = useState([])

    useEffect(() => {
        async function fetchTagList() {
            const newTagList = await tagList()
            setTaglist(newTagList)
        }
        fetchTagList();
    }, [])

    function handleObjectCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }

    function handleObjectName(event) {
        event.preventDefault()
        setObjectName(event.target.value)
    }

    function handleObjectDescription(event) {
        event.preventDefault()
        setObjectDescription(event.target.value)
    }

    function handleTagId(event) {
        event.preventDefault()
        setTagId(event.target.value)
    }

    function handleTagNew(event) {
        event.preventDefault()
        setNewTagName(event.target.value)
    }

    function checkTagDuplicate(tag) {
        return tag.tagName == newTagName
    }

    async function handleTagCreate(event) {
        event.preventDefault()
        const isDuplicate = taglist.some(checkTagDuplicate)
        if (isDuplicate == true) {
            setAlert("标签重复")
        } else {
            setAlert("标签创建中")
            const newTagId = await tagCreate({ tagName: newTagName })
            const newTag = { _id: newTagId, tagName: newTagName }
            setTaglist(taglist.concat(newTag))
            setAlert("标签创建成功")
        }
    }

    function handlePremium(event) {
        const newValue = event.target.checked
        setIsPremium(newValue)
    }

    function handleObjectBody(event) {
        event.preventDefault()
        setobjectBody(event.target.files[0])
    }

    function checkFieldMissing() {
        return !objectCategory || !objectName || !objectDescription || tagId === "" || !objectBody
    }

    async function handleObjectUpload(event) {
        event.preventDefault()
        setAlert("媒体文件创建中")
        const isFieldMissing = checkFieldMissing()
        if (isFieldMissing == true) {
            setAlert("媒体文件信息缺失")
        } else {
            var newObjectId
            if (isPremium == true) {
                newObjectId = await objectUploadPremium({ user: user, category: objectCategory, name: objectName, description: objectDescription, tagId: tagId })
            } else {
                newObjectId = await objectUpload({ user: user, category: objectCategory, name: objectName, description: objectDescription, tagId: tagId })
            }
            setAlert("媒体文件创建成功，正在上传")
            const isUploadSuccess = await s3Upload({ objectKey: newObjectId, objectBody: objectBody })
            if (isUploadSuccess == true) {
                setAlert("媒体文件上传成功")
            } else {
                setAlert("媒体文件上传失败")
            }
        }
    }

    return (
        <div>
            <form>
                <fieldset>
                    <legend>上传媒体文件</legend>
                    <label>选择类别:</label>
                    <select value={objectCategory} onChange={handleObjectCategory} >
                        <option value='videos'>视频</option>
                        <option value='audios'>音频</option>
                        <option value='images'>图片</option>
                        <option value='files'>文档</option>
                    </select>
                    <label>输入名称:</label>
                    <input type="text" onChange={handleObjectName} />
                    <label>添加描述:</label>
                    <textarea onChange={handleObjectDescription}></textarea>
                    <label>选择标签:</label>
                    <select value={tagId} onChange={handleTagId}>
                        <option value="" hidden disabled>请选择标签</option>
                        {taglist.map(tag => (
                            <option key={tag._id} value={tag._id}>{tag.tagName}</option>
                        ))}
                    </select>
                    <label>添加新标签:</label>
                    <input onChange={handleTagNew} />
                    <button onClick={handleTagCreate}>添加标签</button>
                    <label>
                        <input type="checkbox" checked={isPremium} onChange={handlePremium} />
                        设为VIP限定
                    </label>
                    <input type="file" onChange={handleObjectBody} />
                    <button onClick={handleObjectUpload}>上传</button>
                    <h2>{alert}</h2>
                </fieldset>
            </form>
        </div>
    )
}