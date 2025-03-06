import React, { useState } from "react"

import { uploadObject } from "../../services/test"

export default function Upload({ user }) {
    const [selectedObject, setSelectedObject] = useState(null)
    const [objectName, setObjectName] = useState([])
    const [objectCategory, setObjectCategory] = useState([])
    const [objectDescription, setObjectDescription] = useState([])
    function handleSelect(event) {
        event.preventDefault()
        setSelectedObject(event.target.files[0])
    }
    function handleName(event) {
        event.preventDefault()
        setObjectName(event.target.value)
    }
    function handleCategory(event) {
        event.preventDefault()
        console.log(event)
        setObjectCategory(event.target.value)
    }
    function handleDescription(event) {
        event.preventDefault()
        setObjectDescription(event.target.value)
    }
    function handleUpload(event) {
        event.preventDefault()
        uploadObject({ user: user, objectBody: selectedObject, objectName: objectName, objectCategory: objectCategory, objectDescription: objectDescription })
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Upload Objects</legend>
                    <input type="file" onChange={handleSelect} />
                    <label>Input Object name:</label>
                    <input type="text" onChange={handleName} />
                    <label>Select Object category:</label>
                    <select onChange={handleCategory}>
                        <option value="videos">videos</option>
                        <option value="audios">audios</option>
                        <option value="images">images</option>
                        <option value="files">files</option>
                    </select>
                    <label>Add Object description:</label>
                    <textarea onChange={handleDescription}></textarea>
                    <button onClick={handleUpload}>Upload</button>
                </fieldset>
            </form>
        </div>
    )
}