import React, { useState } from 'react'
import { mongoTagList, mongoTagCreate, mongoTagSuspend } from '../../services/mongo'


export default function TagList({ user, adminToken }) {
    const [taglist, setTaglist] = useState([])
    const [newTagName, setNewTagName] = useState([])
    const [tagId, setTagId] = useState([])
    const [response, setResponse] = useState([])
    async function handleTagList(event) {
        event.preventDefault()
        const newTagList = await mongoTagList()
        setTaglist(newTagList)
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
        if (isDuplicate == false) {
            setResponse("Uploading to mongo")
            const newTagId = await mongoTagCreate({ tagName: newTagName })
            const newTag = { _id: newTagId, tagName: newTagName }
            setTaglist(taglist.concat(newTag))
            setResponse("Tag Upload successful")
        } else {
            setResponse("Tag Duplicate")
        }
    }
    function handleTagId(event) {
        event.preventDefault()
        setTagId(event.target.value)
    }
    function checkIndex(tag) {
        return tag._id == tagId
    }
    async function handleTagSuspend(event) {
        event.preventDefault()
        const isModified = await mongoTagSuspend({ user: user, adminToken: adminToken, tagId: tagId })
        if (isModified == true) {
            const targetIndex = taglist.findIndex(checkIndex)
            const newTagList = taglist.toSpliced(targetIndex, 1)
            setTaglist(newTagList)
            setResponse("Tag Suspend Successful")
        }
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Tags List</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Tag ID</th>
                                <th>Tag Name</th>
                                <th>isSuspend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taglist.map(tag => (
                                <tr key={tag._id}>
                                    <td>{tag._id}</td>
                                    <td>{tag.tagName}</td>
                                    <td>{tag.isSuspend ? "true" : "false"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleTagList}>Show Tags</button>
                    <label>Input Tag Name:</label>
                    <input onChange={handleTagNew} />
                    <button onClick={handleTagCreate}>Upload tag</button>
                    <label>Input Tag ID:</label>
                    <input onChange={handleTagId} />
                    <button onClick={handleTagSuspend}>Suspend tag</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div>
    )
}