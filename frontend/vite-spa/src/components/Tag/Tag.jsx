import React, { useState } from 'react'
import { mongoTagList, mongoTagCreate } from '../../services/mongo'


export default function Tag({ user }) {
    const [taglist, setTaglist] = useState([])
    const [newTagName, setNewTagName] = useState([])
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
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Tags List</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Tag Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taglist.map(tag => (
                                <tr key={tag._id}>
                                    <td>{tag.tagName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleTagList}>Show Tags</button>
                    <label>Add new Tag:</label>
                    <input onChange={handleTagNew} />
                    <button onClick={handleTagCreate}>Upload tag</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div>
    )
}