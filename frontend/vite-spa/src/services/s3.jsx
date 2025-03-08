const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export async function s3List() {
    //send GET request to server and retrieve objectList
    // axios.get(SERVER_URL + '/s3/list')
    //     .then(res => {
    //         const objectList = res.data.Contents
    //         return objectList
    //     })
    const res = await axios.get(SERVER_URL + '/s3/list');
    return res.data.Contents;
}

// export async function getObjectStream({ objectKey }) {
//     const res = await axios.get(SERVER_URL + '/s3/get', { params: { objectKey: objectKey } })
//     return res.toWebstream
// }

export function s3Get({ objectKey }) {
    const res = SERVER_URL + '/s3/get?objectKey=' + objectKey
    return res
}

export async function s3Upload({ objectKey, objectBody }) {
    //send POST request to server,pass the object and info parameters
    const formData = new FormData()
    formData.append('objectBody', objectBody)
    const res = await axios.post(SERVER_URL + '/s3/upload', formData, { params: { objectKey: objectKey } })
    return res.data.response
    // .then(res => {
    //     console.log(res.data);
    // })
}

export async function s3Delete({ objectKey }) {
    //somehow it works in traditional components but not in functional components
    //send POST request to server to delete object with matched objectKey
    console.log("deleting " + objectKey)
    axios.post(SERVER_URL + '/s3/delete', {}, { params: { objectKey: objectKey } })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}