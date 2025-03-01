const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export function getObjectList() {
    //send GET request to server and retrieve objectList
    // axios.get(SERVER_URL + '/s3/list')
    //     .then(res => {
    //         const objectList = res.data.Contents
    //         return objectList
    //     })
    return axios.get(SERVER_URL + '/s3/list')
        .then(res => res.data.Contents)
}

export function uploadObject({ object }) {
    //send POST request to server and pass the object
    console.log("uploading " + object.name)
    const formData = new FormData()
    formData.append('objectBody', object)
    axios.post(SERVER_URL + '/s3/upload', formData)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
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