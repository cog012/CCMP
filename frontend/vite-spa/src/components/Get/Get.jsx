import React, { useState } from 'react'
import { getObjectStreamUrl } from '../../services/s3'

export default function Get() {
    const [objectKey, setObjectKey] = useState([])
    const [objectStreamUrl, setObjectStreamUrl] = useState([])
    function handleKey(event) {
        event.preventDefault()
        setObjectKey(event.target.value)
    }
    function handleStream(event) {
        event.preventDefault()
        const streamUrl = getObjectStreamUrl({ objectKey: objectKey })
        setObjectStreamUrl(streamUrl)
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Get Object</legend>
                    {/* <label>Select Object category:</label>
                    <select onChange={handleCategory}>
                        <option value="videos">videos</option>
                        <option value="audios">audios</option>
                        <option value="images">images</option>
                        <option value="files">files</option>
                    </select> */}
                    <label>Input objectKey:</label>
                    <input type="text" onChange={handleKey} />
                    {/* <label>Add Object description:</label>
                    <textarea onChange={handleDescription}></textarea>
                    <input type="file" onChange={handleSelect} /> */}
                    <button onClick={handleStream}>Get Stream</button>
                    <iframe src={objectStreamUrl} height="900" width="1600" allowFullScreen={true}></iframe>
                </fieldset>
            </form>
        </div>
    )
}