import React, { useState } from "react"
import { mongoList } from "../../services/mongo"

export default function List() {
    const [objectCategory, setObjectCategory] = useState([])
    const [objectList, setObjectList] = useState([])
    function handleCategory(event) {
        event.preventDefault()
        setObjectCategory(event.target.value)
    }
    async function handleList(event) {
        event.preventDefault()
        const newList = await mongoList({ objectCategory: objectCategory })
    }
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Object List</legend>
                    <label>Select Object category:</label>
                    <select onChange={handleCategory}>
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