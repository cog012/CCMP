import React, { useState } from "react"
import { mongoObjectList } from "../../services/mongo"


export default function List({ category }) {
    const [objectCategory, setObjectCategory] = useState(category)
    const [objectList, setObjectList] = useState([])
    function handleCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }
    async function handleList(event) {
        event.preventDefault()
        const newList = await mongoObjectList({ objectCategory: objectCategory })
        console.log(newList)
        setObjectList(newList)
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
                            </tr>
                        </thead>
                        <tbody>
                            {objectList.map(object => (
                                <tr key={object._id}>
                                    <td>{object._id}</td>
                                    <td>{object.objectName}</td>
                                    <td>{object.objectDescription}</td>
                                    <td>{object.objectTag.tagName}</td>
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
        </div>
    )
}