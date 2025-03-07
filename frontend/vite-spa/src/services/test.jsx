const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

export function mongoGet({ user, objectName }) {

}

export function getObject({ objectKey }) {
    console.log("retriving object")
    axios.get(SERVER_URL + '/s3/get', {}, { params: { objectKey: objectKey } })
        .then(res => {
            console.log(res.data);
        })
}