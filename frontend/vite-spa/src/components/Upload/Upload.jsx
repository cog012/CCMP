import React, { useEffect, useState } from 'react'

import { mongoTagList, mongoTagUpload, mongoObjectUpload } from "../../services/mongo"
import { s3Upload } from "../../services/s3"

export default function Upload({ user }) {
    const [objectName, setObjectName] = useState([])
    const [objectCategory, setObjectCategory] = useState([])
    const [objectDescription, setObjectDescription] = useState([])
    const [taglist, setTaglist] = useState([])
    const [newTagName, setNewTagName] = useState([])
    const [tagId, setTagId] = useState([])
    const [objectBody, setobjectBody] = useState(null)
    const [response, setResponse] = useState([])

    useEffect(() => {
        async function fetchTagList() {
            const newTagList = await mongoTagList()
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
    function handleTagCreate(event) {
        event.preventDefault()
        setNewTagName(event.target.value)
    }
    function checkTagDuplicate(tag) {
        return tag.tagName == newTagName
    }
    async function handleTagUpload(event) {
        event.preventDefault()
        const isDuplicate = taglist.some(checkTagDuplicate)
        if (isDuplicate == false) {
            setResponse("Uploading to mongo")
            const newTagId = await mongoTagUpload({ user: user, tagName: newTagName })
            const newTag = { _id: newTagId, tagName: newTagName }
            setTaglist(taglist.concat(newTag))
            setResponse("Tag Upload successful")
        } else {
            setResponse("Tag Duplicate")
        }
    }
    function handleObjectBody(event) {
        event.preventDefault()
        setobjectBody(event.target.files[0])
    }
    async function handleObjectUpload(event) {
        event.preventDefault()
        setResponse("Uploading to S3")
        const newObjectId = await mongoObjectUpload({ user: user, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription, tagId: tagId })
        s3Upload({ objectKey: newObjectId, objectBody: objectBody })
            .then(response => {
                setResponse(response)
            })
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Upload Object</legend>
                    <label>Select Object category:</label>
                    <select onChange={handleObjectCategory}>
                        <option value="videos">videos</option>
                        <option value="audios">audios</option>
                        <option value="images">images</option>
                        <option value="files">files</option>
                    </select>
                    <label>Input Object name:</label>
                    <input type="text" onChange={handleObjectName} />
                    <label>Add Object description:</label>
                    <textarea onChange={handleObjectDescription}></textarea>
                    <label>Select Object Tag:</label>
                    <select onChange={handleTagId}>
                        {taglist.map(tag => (
                            <option key={tag._id} value={tag._id}>{tag.tagName}</option>
                        ))}
                    </select>
                    <label>Add New Tag:</label>
                    <input onChange={handleTagCreate} />
                    <button onClick={handleTagUpload}>Add Tag</button>
                    <input type="file" onChange={handleObjectBody} />
                    <button onClick={handleObjectUpload}>Upload Object</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div>
    )
}