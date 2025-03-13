import React, { useState, useEffect } from "react"
import { mongoObjectListAdmin, mongoObjectSuspend } from "../../services/mongo"


export default function ObjectListAdmin({ user, adminToken }) {
    const [objectList, setObjectList] = useState([])
    const [objectId, setObjectId] = useState([])
    const [response, setResponse] = useState([])
    useEffect(() => {
        handleList(event)
    }, [])
    async function handleList(event) {
        event.preventDefault()
        const newObjectList = await mongoObjectListAdmin({ user: user, adminToken: adminToken })
        setObjectList(newObjectList)
    }
    function handleObjectId(event) {
        event.preventDefault()
        setObjectId(event.target.value)
    }
    function checkIndex(object) {
        return object._id == objectId
    }
    async function handleSuspend(event) {
        event.preventDefault()
        const targetIndex = objectList.findIndex(checkIndex)
        var targetObject = objectList[targetIndex]
        const isModified = await mongoObjectSuspend({ user: user, adminToken: adminToken, objectId: objectId })
        if (isModified == true) {
            targetObject.isSuspend = true
            const newObjectList = objectList.toSpliced(targetIndex, targetObject)
            setObjectList(newObjectList)
            setResponse("Object Suspend Successful")
        }
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Object List</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Object ID</th>
                                <th>Object Name</th>
                                <th>Object Description</th>
                                <th>Object Tag</th>
                                <th>isValid</th>
                                <th>UploaderId</th>
                                <th>isSuspend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objectList.map(object => (
                                <tr key={object._id}>
                                    <td>{object._id}</td>
                                    <td>{object.objectName}</td>
                                    <td>{object.objectDescription}</td>
                                    <td>{object.objectTag.tagName}</td>
                                    <td>{object.isValid ? "true" : "false"}</td>
                                    <td>{object.uploaderId}</td>
                                    <td>{object.isSuspend ? "true" : "false"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <label>Input Object ID:</label>
                    <input onChange={handleObjectId}></input>
                    <button onClick={handleSuspend}>Suspend</button>
                    <h1>{response}</h1>
                </fieldset>
            </form>
        </div >
    )
}