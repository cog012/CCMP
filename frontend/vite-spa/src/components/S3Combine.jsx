const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios'
import { React, useState } from 'react'

export default function S3Combine() {
    const [objectList, setObjectList] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    const [specifiedKey, setSpecifiedKey] = useState([])

    function getObjectList() {
        //Get object list from SERVER
        axios.get(SERVER_URL + '/s3/list')
            .then(res => {
                const objects = res.data.Contents
                setObjectList(objects)
            })
    }
    function selectObject(event) {
        setSelectedObject(event.target.files[0])
    }
    function specifyKey(event) {
        setSpecifiedKey(event.target.value)
        console.log(specifiedKey)
    }
    function uploadObject() {
        const formData = new FormData()
        formData.append("objectBody", selectedObject)
        const objectName = selectedObject.name
        formData.append("objectKey", objectName)
        console.log("uploading " + objectName)

        axios.post(SERVER_URL + '/s3/upload', formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    function deleteObject() {
        console.log("deleting " + specifiedKey)
        axios.post(SERVER_URL + '/s3/delete', {}, { params: { objectKey: objectKey } })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    function getObject() {

    }

    return (
        <div>
            <button onClick={getObjectList}>Get Object Lists</button>
            <ul>
                {objectList.map(object => (<li key={object.Key}>{object.Key}</li>))}
            </ul>
            <form>
                <label>
                    Input objectKey to delete:
                    <input type="text" name="key" onChange={specifyKey} />
                </label>
                <button onClick={deleteObject}>Delete</button>
                <button onClick={getObject}>Get</button>
                <label>
                    <input type="file" onChange={selectObject} />
                </label>
                <button onClick={uploadObject}>Upload</button>
            </form>
        </div>
    )
}