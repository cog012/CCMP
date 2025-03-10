import React, { useState, useEffect } from "react"
import { mongoObjectToggleValid, mongoObjectList } from "../../services/mongo"


export default function List({ category }) {
    const [objectCategory, setObjectCategory] = useState(category)
    const [objectList, setObjectList] = useState([])
    const [objectId, setObjectId] = useState([])

    useEffect(() => {
        handleList()
    }, [])

    function handleCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }
    async function handleList() {
        const newList = await mongoObjectList({ objectCategory: objectCategory })
        setObjectList(newList)
    }
    function checkIndex(object) {
        return object._id == objectId
    }
    async function handleValid(event) {
        event.preventDefault()
        setObjectId(event.target.value)
        const objectIndex = objectList.findIndex(checkIndex)
        var targetObject = objectList[objectIndex]
        const newValidity = targetObject.isValid ? false : true
        console.log(newValidity)
        const isModified = await mongoObjectToggleValid({ objectId: objectId, newValidity: newValidity })
        if (isModified == true) {
            targetObject.isValid = newValidity
            const newList = objectList.toSpliced(objectIndex, targetObject)
            setObjectList(newList)
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
                                <th>Validity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objectList.map(object => (
                                <tr key={object._id}>
                                    <td>{object._id}</td>
                                    <td>{object.objectName}</td>
                                    <td>{object.objectDescription}</td>
                                    <td>{object.objectTag.tagName}</td>
                                    <td><button value={object._id} onClick={handleValid}>{object.isValid ? "true" : "false"}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <label>Select Object category:</label>
                    <select onChange={handleCategory} defaultValue={category}>
                        <option value="all">all</option>
                        <option value="videos">videos</option>
                        <option value="audios">audios</option>
                        <option value="images">images</option>
                        <option value="files">files</option>
                    </select>
                    <button onClick={handleList}>List</button>
                </fieldset>
            </form>
        </div >
    )
}