const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export async function getObjectList() {
    //send GET request to server and retrieve objectList
    // axios.get(SERVER_URL + '/s3/list')
    //     .then(res => {
    //         const objectList = res.data.Contents
    //         return objectList
    //     })
    const res = await axios.get(SERVER_URL + '/s3/list');
    return res.data.Contents;
}

export async function uploadObject({ objectKey, objectBody }) {
    //send POST request to server,pass the object and info parameters
    const formData = new FormData()
    formData.append('objectBody', objectBody)
    const res = await axios.post(SERVER_URL + '/test/upload', formData, { params: { objectKey: objectKey } })
    return res.data.response
    // .then(res => {
    //     console.log(res.data);
    // })
}

export function deleteObject({ objectKey }) {
    //somehow it works in traditional components but not in functional components
    //send POST request to server to delete object with matched objectKey
    console.log("deleting " + objectKey)
    axios.post(SERVER_URL + '/s3/delete', {}, { params: { objectKey: objectKey } })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}