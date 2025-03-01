const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';
import { React, useState } from 'react';

export default function ObjectList() {
    const [objectList, setObjectList] = useState([])

    function getObjectList() {
        //Get media list from SERVER_URL/list after mount
        axios.get(SERVER_URL + '/s3/list')
            .then(res => {
                const objects = res.data.Contents
                setObjectList(objects)
            })
    }
    return (
        <div>
            <button onClick={getObjectList}>Get Object Lists</button>
            <ul>
                {objectList.map(object => (<li key={object.Key}>{object.Key}</li>))}
            </ul>
        </div>
    )
}