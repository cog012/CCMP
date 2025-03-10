import React, { useState } from 'react'
import { s3Get } from '../../services/s3'

export default function Get({ category }) {
    const [objectKey, setObjectKey] = useState([])
    const [objectStreamUrl, setObjectStreamUrl] = useState([])
    function handleKey(event) {
        event.preventDefault()
        setObjectKey(event.target.value)
    }
    function handleStream(event) {
        event.preventDefault()
        const streamUrl = s3Get({ objectKey: objectKey })
        setObjectStreamUrl(streamUrl)
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Get Object</legend>
                    <label>Input Object ID:</label>
                    <input type="text" onChange={handleKey} />
                    <button onClick={handleStream}>Get Stream</button>
                    <iframe src={objectStreamUrl} height="900" width="100%" allow="fullscreen"></iframe>
                </fieldset>
            </form>
        </div>
    )
}