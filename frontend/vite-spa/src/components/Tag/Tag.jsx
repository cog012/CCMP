import React, { useState } from 'react'
import { mongoTagList, mongoTagUpload } from '../../services/mongo'


export default function Tag({ user }) {
    const [taglist, setTaglist] = useState([])
    const [tagName, setTagName] = useState([])
    const [response, setResponse] = useState([])
    async function handleList(event) {
        event.preventDefault()
        const newTagList = await mongoTagList()
        setTaglist(newTagList)
    }
    function handleTagName(event) {
        event.preventDefault()
        setTagName(event.target.value)
    }
    function checkDuplicate(tag) {
        return tag.tagName == tagName
    }
    async function handleUpload(event) {
        event.preventDefault()
        const isDuplicate = taglist.some(checkDuplicate)
        if (isDuplicate == false) {
            setResponse("Uploading to mongo")
            const newTagId = await mongoTagUpload({ user: user, tagName: tagName })
            const newTag = { _id: newTagId, tagName: tagName }
            setTaglist(taglist.concat(newTag))
            setResponse("Tag Upload successful")
        } else {
            setResponse("Tag Duplicate")
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
                            </tr>
                        </thead>
                        <tbody>
                            {taglist.map(tag => (
                                <tr key={tag._id}>
                                    <td>{tag._id}</td>
                                    <td>{tag.tagName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleList}>Show Tags</button>
                    <label>Add new Tag:</label>
                    <input onChange={handleTagName} />
                    <button onClick={handleUpload}>Upload tag</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div>
    )
}