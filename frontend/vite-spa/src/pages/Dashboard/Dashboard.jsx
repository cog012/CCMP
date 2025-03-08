import React, { useEffect, useState } from 'react'
import Upload from '../../components/Upload/Upload'
import { s3List, s3Upload, s3Get, s3Delete } from '../../services/s3'


export default function Dashboard({ user }) {
    const [objectList, setObjectList] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    const [specifiedKey, setSpecifiedKey] = useState([])

    useEffect(() => {
        let mounted = true
        s3List()
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
        s3Upload({ object: selectedObject })
    }
    function handleDelete(event) {
        event.preventDefault()
        s3Delete({ objectKey: specifiedKey })
    }
    function handleGet() {

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {objectList.map(object => (<li key={object.Key}>{object.Key}</li>))}
            </ul>
            <form>
                <label>
                    <input type="file" onChange={handleSelect} />
                </label>
                <button onClick={handleUpload}>Upload</button>
                <label>
                    Input objectKey to delete:
                    <input type="text" onChange={handleSpecifyKey} />
                </label>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleGet}>Get</button>
            </form>
            <Upload user={user} />
        </div>
    )
}
