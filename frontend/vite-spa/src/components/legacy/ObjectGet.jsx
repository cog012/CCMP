const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';
import { React, useState } from 'react';

export default function Test() {
    const [specifiedKey, setSpecifiedKey] = useState([])

    var object

    function specifyKey(event) {
        setSpecifiedKey(event.target.value)
        console.log(specifiedKey)
    }
    function getObject() {
        //Get media list from SERVER_URL/list after mount
        return new Promise((resolve, reject) => {
            axios.get(SERVER_URL + '/s3/get', { params: { objectKey: specifiedKey } })
                .then(res => {
                    resolve(res)
                }).catch(reject)
        })
    }
    return (
        <div>
            <form>
                <label>
                    Input objectKey to Get:
                    <input type="text" name="key" onChange={specifyKey} />
                </label>
                <button onClick={getObject}>Get</button>
                <iframe src={object}></iframe>
            </form>
        </div>
    )
}
