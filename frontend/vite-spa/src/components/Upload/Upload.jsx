import React, { useState } from 'react'

import { mongoUpload } from "../../services/mongo"
import { s3Upload } from "../../services/s3"

export default function Upload({ user }) {
    const [objectName, setObjectName] = useState([])
    const [objectCategory, setObjectCategory] = useState([])
    const [objectDescription, setObjectDescription] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    const [response, setResponse] = useState([])
    function handleCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }
    function handleName(event) {
        event.preventDefault()
        setObjectName(event.target.value)
    }
    function handleDescription(event) {
        event.preventDefault()
        setObjectDescription(event.target.value)
    }
    function handleSelect(event) {
        event.preventDefault()
        setSelectedObject(event.target.files[0])
    }
    async function handleUpload(event) {
        event.preventDefault()
        setResponse("Uploading to S3")
        const newObjectId = await mongoUpload({ user: user, objectCategory: objectCategory, objectName: objectName, objectDescription: objectDescription })
        s3Upload({ objectKey: newObjectId, objectBody: selectedObject })
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
                    <select onChange={handleCategory}>
                        <option value="videos">videos</option>
                        <option value="audios">audios</option>
                        <option value="images">images</option>
                        <option value="files">files</option>
                    </select>
                    <label>Input Object name:</label>
                    <input type="text" onChange={handleName} />
                    <label>Add Object description:</label>
                    <textarea onChange={handleDescription}></textarea>
                    <input type="file" onChange={handleSelect} />
                    <button onClick={handleUpload}>Upload</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div>
    )
}