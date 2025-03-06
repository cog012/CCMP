import React, { useEffect, useState } from 'react'
import { getObjectList, uploadObject, deleteObject } from '../services/s3'


export default function Test() {
    const [objectList, setObjectList] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    const [specifiedKey, setSpecifiedKey] = useState([])

    useEffect(() => {
        let mounted = true
        getObjectList()
            .then(res => {
                if (mounted) {
                    setObjectList(res)
                }
            })
        return () => mounted = false
    }, [])

    function handleSelect(event) {
        event.preventDefault()
        console.log(event.target.files[0])
        setSelectedObject(event.target.files[0])
    }
    function handleSpecifyKey(event) {
        event.preventDefault()
        setSpecifiedKey(event.target.value)
    }
    function handleUpload(event) {
        event.preventDefault()
        uploadObject({ object: selectedObject })
    }
    function handleDelete(event) {
        event.preventDefault()
        deleteObject({ objectKey: specifiedKey })
    }
    function handleGet() {

    }

    return (
        <div>
            <h2>Test Page</h2>
            <ul>
                {objectList.map(object => (<li key={object.Key}>{object.Key}</li>))}
            </ul>
            <form>
                <label>
                    <input type="file" onChange={handleSelect} />
                </label>
                <button onClick={handleUpload}>Upload</button>
            </form>
            <form>
                <label>
                    Input objectKey to delete:
                    <input type="text" onChange={handleSpecifyKey} />
                </label>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleGet}>Get</button>
            </form>
        </div>
    )
}









// export default function Test() {
//     return (
//         <div>

//         </div>
//     )
// }