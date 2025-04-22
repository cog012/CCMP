import React, { useState } from 'react'
import { s3Get } from '../../services/s3'

export default function ObjectGet({ }) {
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
                    <legend>获取对象</legend>
                    <label>输入对象ID:</label>
                    <input type="text" onChange={handleKey} />
                    <button onClick={handleStream}>获取数据流</button>
                    <iframe src={objectStreamUrl} height="900" width="100%" allow="fullscreen"></iframe>
                </fieldset>
            </form>
        </div>
    )
}