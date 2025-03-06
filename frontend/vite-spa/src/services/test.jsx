const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export function uploadObject({ user, objectBody, objectName, objectCategory, objectDescription }) {
    //send POST request to server,pass the object and info parameters
    console.log("uploading " + objectName)
    const formData = new FormData()
    formData.append('objectBody', objectBody)
    axios.post(SERVER_URL + '/test/upload', formData, { params: { user: user, objectName: objectName, objectCategory: objectCategory, objectDescription: objectDescription } })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}